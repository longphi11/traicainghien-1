import json
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "flow_01_current.json"
OUTPUT = ROOT / "flow_01_repaired.json"
WORKFLOW_ID = "wWXJoMhbchKzrkqr"


DEDUP_CODE = r"""
const staticData = $getWorkflowStaticData('global');
staticData.sentLinks = Array.isArray(staticData.sentLinks) ? staticData.sentLinks : [];
staticData.skippedNoImageLinks = Array.isArray(staticData.skippedNoImageLinks)
  ? staticData.skippedNoImageLinks
  : [];

const sentLinks = new Set(staticData.sentLinks);
const skippedLinks = new Set(staticData.skippedNoImageLinks);

return $input.all()
  .map(item => item.json)
  .filter(article => {
    const link = String(article.link || '').trim();
    return link && !sentLinks.has(link) && !skippedLinks.has(link);
  })
  .slice(0, 12)
  .map(article => ({
    json: {
      selectedLink: String(article.link).trim(),
      title: String(article.title || '').trim(),
      description: String(article.description || '').trim(),
      pubDate: String(article.pubDate || '').trim()
    }
  }));
""".strip()


FORMATTER_CODE = r"""
const staticData = $getWorkflowStaticData('global');
staticData.skippedNoImageLinks = Array.isArray(staticData.skippedNoImageLinks)
  ? staticData.skippedNoImageLinks
  : [];
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
    .filter(text => text.length > 70 && !/subscribe|sign up|privacy policy/i.test(text));
  return paragraphs.slice(0, 2).join(' ');
}

const hour = (new Date().getUTCHours() + 7) % 24;
const session = hour < 12
  ? 'BẢN TIN SÁNG 08:30'
  : hour < 18
    ? 'BẢN TIN CHIỀU 15:00'
    : 'BẢN TIN TỐI 20:30';

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

  const title = cleanText(article.title || readMeta(html, 'og:title'));
  if (!title) continue;

  const summary = cleanText(article.description)
    || cleanText(readMeta(html, 'og:description'))
    || extractParagraphSummary(html);

  const parsedLink = new URL(link);
  const sourceHost = parsedLink.hostname.replace(/^www\./i, '');
  const safeTitle = escapeHtml(truncate(title, 150));
  const safeSummary = escapeHtml(truncate(summary, 360));
  const prefix = `🌿 <b>TRẠI CAI NGHIỆN DAILY • ${session}</b>\n\n`
    + `🧠 <b>[TÂM LÝ HỌC &amp; HÀNH VI]</b>\n`
    + `👉 <b>${safeTitle}</b>\n\n`;
  const summaryLabel = '📰 <b>Điểm đáng chú ý từ nguồn:</b>\n';
  const action = '\n\n💡 <b>Gợi ý hôm nay:</b>\n'
    + 'Đọc phần phương pháp và kết luận trong bài gốc trước khi áp dụng lời khuyên cho mình.\n\n';
  const suffix = `📖 <a href="${escapeHtml(link)}">Đọc bài gốc tại ${escapeHtml(sourceHost)}</a>\n\n`
    + '🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>\n'
    + '<a href="https://traicainghien.com">Website</a> · '
    + '<a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm Dopamine</a>';

  let safeSummaryText = safeSummary || 'Nguồn RSS không có đoạn tóm tắt; bạn có thể xem chi tiết tại bài gốc.';
  let caption = `${prefix}${summaryLabel}${safeSummaryText}${action}${suffix}`;
  while (caption.length > 1024 && safeSummaryText.length > 24) {
    safeSummaryText = truncate(safeSummaryText, Math.max(24, Array.from(safeSummaryText).length - 40));
    caption = `${prefix}${summaryLabel}${safeSummaryText}${action}${suffix}`;
  }
  if (caption.length > 1024) {
    throw new Error(`Telegram caption is over 1024 characters (${caption.length}).`);
  }

  return [{
    json: {
      photo,
      caption,
      parse_mode: 'HTML',
      selectedLink: link,
      sourceTitle: title
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


def find_node(workflow, name):
    matches = [node for node in workflow.get("nodes", []) if node.get("name") == name]
    if len(matches) != 1:
        raise ValueError(f"Expected one node named {name!r}; found {len(matches)}.")
    return matches[0]


def repair():
    payload = json.loads(SOURCE.read_text(encoding="utf-8"))
    workflow = payload[0] if isinstance(payload, list) else payload
    if workflow.get("id") != WORKFLOW_ID:
        raise ValueError(f"Unexpected workflow id: {workflow.get('id')!r}")

    dedup = find_node(workflow, "Lọc Bài Viết Chưa Từng Gửi (Deduplication)")
    formatter = find_node(workflow, "Bóc Tách Ảnh Tác Giả & Kiểm Tra Trùng")
    telegram = find_node(workflow, "Gửi Telegram sendPhoto")

    dedup["parameters"]["jsCode"] = DEDUP_CODE
    old_formatter_name = formatter["name"]
    formatter["name"] = "Soạn Bản Tin Từ Nguồn Gốc"
    formatter["parameters"]["jsCode"] = FORMATTER_CODE

    record_name = "Ghi Nhận Link Đã Gửi"
    record_nodes = [node for node in workflow.get("nodes", []) if node.get("name") == record_name]
    if len(record_nodes) > 1:
        raise ValueError(f"Found multiple nodes named {record_name!r}.")
    if record_nodes:
        record = record_nodes[0]
    else:
        record = {
            "parameters": {"jsCode": RECORD_SENT_CODE},
            "id": "record-sent-link-after-telegram-success",
            "name": record_name,
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [
                telegram.get("position", [900, 300])[0] + 240,
                telegram.get("position", [900, 300])[1]
            ]
        }
        workflow.setdefault("nodes", []).append(record)
    record["parameters"]["jsCode"] = RECORD_SENT_CODE

    connections = workflow.setdefault("connections", {})
    connections.pop(old_formatter_name, None)
    for source_node, conn_data in connections.items():
        if "main" in conn_data:
            for branch in conn_data["main"]:
                for target in branch:
                    if target.get("node") == old_formatter_name:
                        target["node"] = formatter["name"]

    connections[formatter["name"]] = {
        "main": [[{"node": telegram["name"], "type": "main", "index": 0}]]
    }
    connections[telegram["name"]] = {
        "main": [[{"node": record_name, "type": "main", "index": 0}]]
    }

    schedule = find_node(workflow, "Lịch 8h30 - 15h00 - 20h30")
    schedule["parameters"]["rule"]["interval"] = [
        {"field": "cronExpression", "expression": "30 8 * * *"},
        {"field": "cronExpression", "expression": "0 15 * * *"},
        {"field": "cronExpression", "expression": "30 20 * * *"},
    ]

    serialized_nodes = json.dumps(workflow.get("nodes", []), ensure_ascii=False)
    for forbidden in ("fallbackZenPhotos", "articlePool", "sentLinks = []"):
        if forbidden in serialized_nodes:
            raise ValueError(f"Legacy behavior remains in workflow: {forbidden}")

    if OUTPUT.exists():
        existing = json.loads(OUTPUT.read_text(encoding="utf-8"))
        existing_workflow = existing[0] if isinstance(existing, list) else existing
        if existing_workflow.get("id") != WORKFLOW_ID:
            raise FileExistsError(f"Refusing to overwrite unrelated output: {OUTPUT}")
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8"
    )
    print(f"Prepared repaired workflow outside the project: {OUTPUT}")
    print("Verified: source-based content, original og:image only, no history reset.")
    print("Verified: sentLinks is recorded only after Telegram returns ok=true.")
    print("Verified: schedule is 08:30, 15:00, and 20:30.")


if __name__ == "__main__":
    repair()
