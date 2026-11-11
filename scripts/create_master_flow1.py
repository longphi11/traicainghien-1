import json

with open('scripts/daily_articles_feed.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

# Load current wWXJoMhbchKzrkqr workflow
with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    all_wfs = json.load(f)

flow_01 = None
for w in all_wfs:
    if w['id'] == 'wWXJoMhbchKzrkqr':
        flow_01 = w
        break

if not flow_01:
    raise Exception("Flow 01 wWXJoMhbchKzrkqr not found!")

# Build JavaScript code for Flow 01 with the 39 articles
articles_code = json.dumps(articles, ensure_ascii=False)

js_code = f"""// HỆ THỐNG PHÁT SÓNG BẢN TIN TRẠI CAI NGHIỆN DAILY
// CƠ CHẾ FIFO QUEUE CHỐNG TRÙNG LẶP TUYỆT ĐỐI (14 NGÀY XOAY TUA ĐỘC BẢN)
// 100% TRANH VẼ ZEN WATERCOLOR KHỚP CHUẨN TỪNG BÀI VIẾT

const curatedArticles = {articles_code};

const staticData = (typeof $getWorkflowStaticData === 'function' ? $getWorkflowStaticData('global') : {{}});
staticData.sentSlugs = staticData.sentSlugs || [];

// Lọc các bài viết CHƯA TỪNG PHÁT SÓNG trong chu kỳ
let available = curatedArticles.filter(a => !staticData.sentSlugs.includes(a.slug));

// Nếu đã phát sóng hết toàn bộ kho bài (sau 13-14 ngày), reset hàng đợi để xoay vòng
if (available.length === 0) {{
  staticData.sentSlugs = [];
  available = curatedArticles.slice();
}}

// Lấy bài viết đầu tiên theo thứ tự FIFO (không dùng random để chống trùng lặp tuyệt đối)
const selected = available[0];

// Ghi nhận slug đã phát sóng vào bộ nhớ
staticData.sentSlugs.push(selected.slug);
if (staticData.sentSlugs.length > 200) {{
  staticData.sentSlugs.shift();
}}

// Xác định khung giờ phát sóng theo giờ Việt Nam (UTC+7)
const now = new Date();
const hour = (now.getUTCHours() + 7) % 24;
let sessionName = 'BẢN TIN SÁNG 08:30';
if (hour >= 12 && hour < 18) sessionName = 'BẢN TIN CHIỀU 15:00';
else if (hour >= 18) sessionName = 'BẢN TIN TỐI 20:30';

let caption = `🌿 <b>TRẠI CAI NGHIỆN DAILY • ${{sessionName}}</b>\\n\\n`;
caption += `🏷 <b>[TÂM LÝ HỌC HÀNH VI & THÓI QUEN]</b>\\n`;
caption += `👉 <b>${{selected.title}}</b>\\n\\n`;
caption += `📌 <b>Điểm cốt lõi bạn cần nhớ:</b>\\n`;
for (let p of selected.points) {{
  caption += `• ${{p}}\\n`;
}}
caption += `\\n💡 <b>Hành động hôm nay (Key Action):</b>\\n${{selected.action}}\\n\\n`;
caption += `🌱 <i>"Sự chuyển hóa bền vững không đến từ những cú gồng mình ngắn hạn, mà bắt nguồn từ sự thấu hiểu và kiên định 1% mỗi ngày."</i>\\n\\n`;
caption += `👉 <i>Nếu bài viết này chạm đến bạn, hãy thả một cảm xúc nhẹ nhàng hoặc chia sẻ cho người bạn thương nhé!</i>\\n\\n`;
caption += `🌿 <b>Đọc toàn bộ bài phân tích chuyên sâu tại:</b>\\n`;
caption += `👉 <a href="${{selected.url}}">${{selected.url}}</a>\\n\\n`;
caption += `======\\n`;
caption += `🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>\\n`;
caption += `<a href="https://traicainghien.com">Website</a> | <a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm Dopamine</a> | <a href="https://www.facebook.com/traicainghienvn2026">Fanpage</a>`;

return [{{
  json: {{
    photo: selected.thumbnail,
    caption: caption,
    parse_mode: 'HTML'
  }}
}}];
"""

# Now update the nodes in flow_01:
# We simplify the flow:
# Trigger (8:30, 15:00, 20:30) -> Code (FIFO Curated Dispatcher) -> Telegram sendPhoto
nodes = [
    {
        "parameters": {
            "rule": {
                "interval": [
                    {
                        "field": "cronExpression",
                        "expression": "30 8,20 * * *"
                    },
                    {
                        "field": "cronExpression",
                        "expression": "0 15 * * *"
                    }
                ]
            }
        },
        "id": "schedule-trigger",
        "name": "Lịch 8h30 - 15h00 - 20h30",
        "type": "n8n-nodes-base.scheduleTrigger",
        "typeVersion": 1.2,
        "position": [200, 300]
    },
    {
        "parameters": {
            "jsCode": js_code
        },
        "id": "fifo-curated-dispatcher",
        "name": "Chọn Bài Viết & Tranh Zen (FIFO Chống Trùng)",
        "type": "n8n-nodes-base.code",
        "typeVersion": 2,
        "position": [420, 300]
    },
    {
        "parameters": {
            "method": "POST",
            "url": "https://api.telegram.org/bot9249970693:AAEm8Fm77TROqU81PRhfWThlSqguMMZcfYs/sendPhoto",
            "sendBody": True,
            "bodyParameters": {
                "parameters": [
                    {
                        "name": "chat_id",
                        "value": "-1004488309634"
                    },
                    {
                        "name": "photo",
                        "value": "={{ $json.photo }}"
                    },
                    {
                        "name": "caption",
                        "value": "={{ $json.caption }}"
                    },
                    {
                        "name": "parse_mode",
                        "value": "HTML"
                    }
                ]
            },
            "options": {}
        },
        "id": "telegram-send-photo",
        "name": "Gửi Telegram sendPhoto",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 4.2,
        "position": [640, 300]
    }
]

connections = {
    "Lịch 8h30 - 15h00 - 20h30": {
        "main": [
            [
                {
                    "node": "Chọn Bài Viết & Tranh Zen (FIFO Chống Trùng)",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    },
    "Chọn Bài Viết & Tranh Zen (FIFO Chống Trùng)": {
        "main": [
            [
                {
                    "node": "Gửi Telegram sendPhoto",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    }
}

updated_flow = {
    "id": "wWXJoMhbchKzrkqr",
    "name": "Trại Cai Nghiện Daily - Tự Động Hóa Tin Tức Tâm Lý",
    "active": True,
    "nodes": nodes,
    "connections": connections,
    "settings": {
        "executionOrder": "v1"
    }
}

with open('scripts/flow_01_master.json', 'w', encoding='utf-8') as f:
    json.dump(updated_flow, f, ensure_ascii=False, indent=2)

print("Created scripts/flow_01_master.json successfully!")
