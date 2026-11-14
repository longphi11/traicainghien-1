import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = ROOT / "flow_01_repaired.json"

WORKFLOW_ID = "wWXJoMhbchKzrkqr"
WORKFLOW_NAME = "Trại Cai Nghiện Daily - Tự Động Hóa Tin Tức Tâm Lý"

BOT_TOKEN = "9249970693:AAFnHi-ZCx7N576orPkdMqapeRLWfHQLH6Q"
CHANNEL_ID = "-1004488309634"

DEDUP_CODE = r"""
const staticData = $getWorkflowStaticData('global');
staticData.sentLinks = Array.isArray(staticData.sentLinks) ? staticData.sentLinks : [];
staticData.skippedNoImageLinks = Array.isArray(staticData.skippedNoImageLinks) ? staticData.skippedNoImageLinks : [];

const sentLinks = new Set(staticData.sentLinks);
const skippedLinks = new Set(staticData.skippedNoImageLinks);

const allItems = $input.all();
const candidates = [];

for (const item of allItems) {
  const article = item.json;
  const link = String(article.link || article.guid || '').trim();
  if (link && !sentLinks.has(link) && !skippedLinks.has(link)) {
    candidates.push({
      json: {
        selectedLink: link,
        title: String(article.title || '').trim(),
        description: String(article.description || '').trim(),
        pubDate: String(article.pubDate || '').trim(),
        source: String(article.source || '').trim()
      }
    });
    if (candidates.length >= 15) break;
  }
}

return candidates;
""".strip()

FORMATTER_CODE = r"""
const staticData = $getWorkflowStaticData('global');
staticData.skippedNoImageLinks = Array.isArray(staticData.skippedNoImageLinks) ? staticData.skippedNoImageLinks : [];
const skippedLinks = new Set(staticData.skippedNoImageLinks);

function decodeEntities(value) {
  return String(value || '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function cleanText(value) {
  return decodeEntities(String(value || '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(value, maxLength) {
  const chars = Array.from(String(value || ''));
  return chars.length > maxLength ? `${chars.slice(0, maxLength - 1).join('')}…` : chars.join('');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readAttribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = tag.match(new RegExp(`\\b${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] || match[2] || match[3] || '') : '';
}

function readMeta(html, propertyName) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const property = readAttribute(tag, 'property') || readAttribute(tag, 'name');
    if (property.toLowerCase() === propertyName.toLowerCase()) {
      const content = readAttribute(tag, 'content');
      if (content) return decodeEntities(content);
    }
  }
  return '';
}

function extractOriginalImage(html, articleUrl) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const property = readAttribute(tag, 'property');
    if (property.toLowerCase() !== 'og:image') continue;
    const rawImage = decodeEntities(readAttribute(tag, 'content'));
    if (!rawImage) continue;
    try {
      const parsed = new URL(rawImage, articleUrl);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
    } catch (_) {}
  }
  return '';
}

function extractParagraphSummary(html) {
  const paragraphs = Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi))
    .map(match => cleanText(match[1]))
    .filter(text => text.length > 60 && !/subscribe|sign up|privacy policy|cookie|rights reserved/i.test(text));
  return paragraphs.slice(0, 3).join(' ');
}

const priorArticles = $('Lọc Bài Viết Chưa Từng Gửi (Deduplication)').all();
const responses = $input.all();

for (let index = 0; index < responses.length; index++) {
  const article = {
    ...(priorArticles[index]?.json || {}),
    ...(responses[index]?.json || {})
  };
  const link = String(article.selectedLink || article.link || '').trim();
  if (!link) continue;

  const html = String(article.data || article.body || '');
  const photo = extractOriginalImage(html, link);
  if (!photo) {
    if (!skippedLinks.has(link)) {
      staticData.skippedNoImageLinks.push(link);
      skippedLinks.add(link);
    }
    continue;
  }

  const rawTitle = cleanText(article.title || readMeta(html, 'og:title'));
  if (!rawTitle) continue;

  const summary = cleanText(article.description)
    || cleanText(readMeta(html, 'og:description'))
    || extractParagraphSummary(html);

  const parsedLink = new URL(link);
  const sourceHost = parsedLink.hostname.replace(/^www\./i, '');
  const safeTitle = escapeHtml(truncate(rawTitle, 120));
  const safeSummary = escapeHtml(truncate(summary, 280));

  // Cấu trúc bản tin 150 từ cô đọng, sắc bén
  const header = `🌿 <b>TRẠI CAI NGHIỆN DAILY</b>\n🧠 <b>[TÂM LÝ HỌC &amp; HÀNH VI]</b>\n\n`;
  const titleBlock = `👉 <b>${safeTitle}</b>\n\n`;
  const leadBlock = `Vừa ngồi vào bàn làm việc đã lướt video ngắn? Nghiên cứu quốc tế khẳng định: Bạn không hề lười hay thiếu kỷ luật, não bộ chỉ đang phản ứng trước môi trường quá nhiều kích thích.\n\n`;
  const insightBlock = `📌 <b>Điểm cốt lõi từ nghiên cứu:</b>\n${safeSummary}\n\n`;
  const actionBlock = `💡 <b>Kaizen 1%:</b> Để điện thoại cách xa bàn 2 mét giúp giảm ngay 70% số lần cầm máy vô thức.\n\n`;
  const quoteBlock = `🌱 <i>"Đừng dùng ý chí đấu với cám dỗ. Hãy để không gian tĩnh tại bảo vệ tâm trí bạn."</i>\n\n`;
  const footerBlock = `📖 <a href="${escapeHtml(link)}">Bài gốc tại ${escapeHtml(sourceHost)}</a> · 🌿 <a href="https://traicainghien.com">Trại Cai Nghiện</a>`;

  let caption = `${header}${titleBlock}${leadBlock}${insightBlock}${actionBlock}${quoteBlock}${footerBlock}`;

  // Smart truncation if over 1024
  while (caption.length > 1020 && safeSummary.length > 40) {
    const trimmedSummary = truncate(safeSummary, Array.from(safeSummary).length - 30);
    caption = `${header}${titleBlock}${leadBlock}📌 <b>Điểm cốt lõi từ nghiên cứu:</b>\n${escapeHtml(trimmedSummary)}\n\n${actionBlock}${quoteBlock}${footerBlock}`;
  }

  return [{
    json: {
      photo,
      caption,
      parse_mode: 'HTML',
      selectedLink: link,
      sourceTitle: rawTitle
    }
  }];
}

return [];
""".strip()

RECORD_SENT_CODE = r"""
const response = $input.first()?.json || {};
if (response.ok !== true) {
  throw new Error('Telegram did not confirm the post; sentLinks was not updated.');
}

const post = $('Soạn Bản Tin Từ Nguồn Gốc').first()?.json || {};
const link = String(post.selectedLink || '').trim();
if (!link) {
  throw new Error('Missing source link after Telegram accepted the post.');
}

const staticData = $getWorkflowStaticData('global');
staticData.sentLinks = Array.isArray(staticData.sentLinks) ? staticData.sentLinks : [];
if (!staticData.sentLinks.includes(link)) {
  staticData.sentLinks.push(link);
  if (staticData.sentLinks.length > 200) {
    staticData.sentLinks.shift();
  }
}

return $input.all();
""".strip()

def build_workflow():
    sources = [
        {"name": "RSS PT - Science of Choice", "url": "https://www.psychologytoday.com/us/blog/science-choice/feed"},
        {"name": "RSS PT - Athlete's Way", "url": "https://www.psychologytoday.com/us/blog/the-athletes-way/feed"},
        {"name": "RSS Behavioral Scientist", "url": "https://behavioralscientist.org/feed/"},
        {"name": "RSS Ness Labs", "url": "https://nesslabs.com/feed"},
        {"name": "RSS Greater Good UC Berkeley", "url": "https://greatergood.berkeley.edu/rss"},
        {"name": "RSS Farnam Street", "url": "https://fs.blog/feed/"}
    ]

    nodes = [
        {
            "parameters": {
                "rule": {
                    "interval": [
                        {"field": "cronExpression", "expression": "30 8 * * *"},
                        {"field": "cronExpression", "expression": "0 15 * * *"},
                        {"field": "cronExpression", "expression": "30 20 * * *"}
                    ]
                }
            },
            "id": "schedule-trigger-flow01",
            "name": "Lịch 8h30 - 15h00 - 20h30",
            "type": "n8n-nodes-base.scheduleTrigger",
            "typeVersion": 1.2,
            "position": [100, 300]
        }
    ]

    connections = {
        "Lịch 8h30 - 15h00 - 20h30": {"main": [[]]}
    }

    # Add RSS nodes
    rss_names = []
    base_x = 350
    base_y = 100
    for idx, src in enumerate(sources):
        node_name = src["name"]
        rss_names.append(node_name)
        nodes.append({
            "parameters": {"url": src["url"], "options": {}},
            "id": f"rss-node-{idx}",
            "name": node_name,
            "type": "n8n-nodes-base.rssFeedRead",
            "typeVersion": 1,
            "position": [base_x, base_y + (idx * 100)]
        })
        # Connect schedule to this RSS
        connections["Lịch 8h30 - 15h00 - 20h30"]["main"][0].append({
            "node": node_name,
            "type": "main",
            "index": 0
        })

    # Dedup Node
    dedup_name = "Lọc Bài Viết Chưa Từng Gửi (Deduplication)"
    nodes.append({
        "parameters": {"jsCode": DEDUP_CODE},
        "id": "dedup-node-flow01",
        "name": dedup_name,
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [620, 350]
    })

    # Connect all RSS to Dedup
    for r_name in rss_names:
        connections[r_name] = {
            "main": [[{"node": dedup_name, "type": "main", "index": 0}]]
        }

    # HTTP Request Node to fetch HTML
    http_name = "Tải HTML Bài Báo Gốc"
    nodes.append({
        "parameters": {
            "method": "GET",
            "url": "={{ $json.selectedLink }}",
            "options": {
                "response": {
                    "response": {
                        "responseFormat": "text"
                    }
                }
            }
        },
        "id": "http-fetch-html-flow01",
        "name": http_name,
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [840, 350]
    })
    connections[dedup_name] = {
        "main": [[{"node": http_name, "type": "main", "index": 0}]]
    }

    # Formatter Node (150 words)
    formatter_name = "Soạn Bản Tin Từ Nguồn Gốc"
    nodes.append({
        "parameters": {"jsCode": FORMATTER_CODE},
        "id": "formatter-node-flow01",
        "name": formatter_name,
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1060, 350]
    })
    connections[http_name] = {
        "main": [[{"node": formatter_name, "type": "main", "index": 0}]]
    }

    # Telegram sendPhoto Node
    telegram_name = "Gửi Telegram sendPhoto"
    nodes.append({
        "parameters": {
            "method": "POST",
            "url": f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto",
            "sendBody": True,
            "bodyParameters": {
                "parameters": [
                    {"name": "chat_id", "value": CHANNEL_ID},
                    {"name": "photo", "value": "={{ $json.photo }}"},
                    {"name": "caption", "value": "={{ $json.caption }}"},
                    {"name": "parse_mode", "value": "HTML"}
                ]
            },
            "options": {}
        },
        "id": "telegram-sendphoto-flow01",
        "name": telegram_name,
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [1280, 350]
    })
    connections[formatter_name] = {
        "main": [[{"node": telegram_name, "type": "main", "index": 0}]]
    }

    # Record Sent Node
    record_name = "Ghi Nhận Link Đã Gửi"
    nodes.append({
        "parameters": {"jsCode": RECORD_SENT_CODE},
        "id": "record-sent-flow01",
        "name": record_name,
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [1500, 350]
    })
    connections[telegram_name] = {
        "main": [[{"node": record_name, "type": "main", "index": 0}]]
    }

    workflow = {
        "id": WORKFLOW_ID,
        "name": WORKFLOW_NAME,
        "active": True,
        "nodes": nodes,
        "connections": connections,
        "settings": {
            "executionOrder": "v1",
            "timezone": "Asia/Ho_Chi_Minh",
            "saveManualExecutions": False,
            "saveDataErrorExecution": "all",
            "saveDataSuccessExecution": "all"
        }
    }

    payload = [workflow]
    OUTPUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated master n8n workflow file: {OUTPUT_FILE}")
    print(f"Total nodes: {len(nodes)} (including 6 multi-source RSS feeds)")
    print(f"Schedule: 08:30, 15:00, 20:30 (Asia/Ho_Chi_Minh)")
    print("Content: ~150 words native photo caption under 1000 chars.")

if __name__ == "__main__":
    build_workflow()
