import json
import os

with open('scripts/all_zen_photos.json', 'r', encoding='utf-8') as f:
    zen_photos = json.load(f)

with open('scripts/flow_01_current.json', 'r', encoding='utf-8') as f:
    wf = json.load(f)

target_node_name = "Bóc Tách Ảnh Tác Giả & Kiểm Tra Trùng"
nodes = wf[0]['nodes'] if isinstance(wf, list) else wf['nodes']

new_js_code = f"""// 100% TRANH ZEN WATERCOLOR ĐỘC BẢN CỦA TRẠI CAI NGHIỆN
// TUYỆT ĐỐI CẤM ẢNH STOCK, CẤM TRÙNG LẶP HÌNH ẢNH TRÊN TELEGRAM
const itemData = $('Lọc Bài Viết Chưa Từng Gửi (Deduplication)').first().json;

// Kho 64 bức tranh Zen Watercolor độc bản chuẩn quy cách
const allZenPhotos = {json.dumps(zen_photos, indent=2, ensure_ascii=False)};

// Quản lý lịch sử ảnh đã phát sóng (Strict Anti-Duplicate Mechanism)
const staticData = (typeof $getWorkflowStaticData === 'function' ? $getWorkflowStaticData('global') : {{}});
staticData.sentPhotos = staticData.sentPhotos || [];

// Lọc danh sách các tranh CHƯA TỪNG PHÁT SÓNG
let availablePhotos = allZenPhotos.filter(p => !staticData.sentPhotos.includes(p));

// Nếu đã phát sóng hết toàn bộ kho tranh, reset bộ nhớ để xoay vòng từ ảnh cũ nhất
if (availablePhotos.length === 0) {{
  staticData.sentPhotos = [];
  availablePhotos = allZenPhotos.slice();
}}

// Lấy bức tranh độc bản kế tiếp chưa từng gửi
const finalPhoto = availablePhotos[0];

// Ghi nhận tranh đã phát sóng vào bộ nhớ
staticData.sentPhotos.push(finalPhoto);
if (staticData.sentPhotos.length > 100) {{
  staticData.sentPhotos.shift();
}}

const now = new Date();
const hour = (now.getUTCHours() + 7) % 24;
let sessionName = 'BẢN TIN SÁNG 08:30';
if (hour >= 13 && hour < 18) sessionName = 'BẢN TIN CHIỀU 15:00';
else if (hour >= 18) sessionName = 'BẢN TIN TỐI 20:30';

const articlePool = [
  {{
    tag: "TẬP TRUNG SÂU & THÓI QUEN",
    title: itemData.title || "Tại sao nỗ lực gồng mình lại khiến bạn nhanh bỏ cuộc hơn?",
    points: [
      "Ý chí là tài nguyên sinh học có hạn, cạn dần sau mỗi lần bạn cưỡng lại cám dỗ.",
      "Kỷ luật bền vững đến từ việc thiết kế môi trường ít ma sát, không phải gồng mình.",
      "Quy tắc 2 mét: Để điện thoại cách xa 2m khi làm việc giúp giảm 70% số lần cầm máy vô thức."
    ],
    action: "Cất điện thoại sang phòng khác hoặc ngăn kéo trong 45 phút làm việc đầu tiên.",
    quote: "Đừng dùng ý chí đấu với thuật toán — hãy dùng môi trường để bảo vệ tâm trí.",
    leadCTA: "☕ Khi bạn muốn đọc chậm lại và hiểu sâu hơn về cách rèn luyện sự tập trung:"
  }},
  {{
    tag: "TÁI LẬP DOPAMINE & NÃO BỘ",
    title: itemData.title || "Giải phóng khỏi sương mù não sau chuỗi ngày lướt short video",
    points: [
      "Video ngắn liên tục kích thích dopamine cực điểm, khiến não rơi vào 'nhũn não số'.",
      "Chỉ cần 24 giờ giảm kích thích màn hình, thụ thể D2 bắt đầu quá trình phục hồi.",
      "Tiếp xúc ánh sáng mặt trời buổi sớm giúp đồng bộ nhịp sinh học và ổn định tâm trạng."
    ],
    action: "Bước ra ngoài hít thở không khí tự nhiên 5 phút trước khi bắt đầu công việc.",
    quote: "Sự bình yên thực sự không đến từ việc tiêu thụ thêm, mà từ sự tĩnh lặng của tâm trí.",
    leadCTA: "🌿 Dành cho những lúc bạn muốn lắng lại và tìm hiểu sâu hơn về cách làm dịu tâm trí:"
  }},
  {{
    tag: "KAIZEN & TRIẾT LÝ WABI-SABI",
    title: itemData.title || "Bẫy hoàn hảo: Kẻ thù số 1 của sự tiến bộ bền vững",
    points: [
      "Chủ nghĩa hoàn hảo thực chất là nỗi sợ bị phán xét ngụy trang dưới vỏ bọc tiêu chuẩn cao.",
      "Kaizen: Tốt hơn 1% mỗi ngày, sau 1 năm bạn đã tiến bộ gấp 37 lần.",
      "Kintsugi: Tái nghiện một lần không xóa bỏ sự nỗ lực của cả hành trình."
    ],
    action: "Làm một việc bạn đang trì hoãn trong 2 phút với tiêu chuẩn 'làm dở cũng được'.",
    quote: "Hành động chưa hoàn hảo còn giá trị hơn ngàn lần trì hoãn trong ảo tưởng hoàn mỹ.",
    leadCTA: "🌱 Những góc nhìn sâu sắc hơn để bạn thong thả nuôi dưỡng thói quen tốt mỗi ngày:"
  }}
];

const selected = articlePool[Math.floor(Math.random() * articlePool.length)];

let caption = `🌿 <b>TRẠI CAI NGHIỆN DAILY • ${{sessionName}}</b>\\n\\n`;
caption += `🏷 <b>[${{selected.tag}}]</b>\\n`;
caption += `👉 <b>${{selected.title}}</b>\\n\\n`;
caption += `📌 <b>Điểm cốt lõi bạn cần nhớ:</b>\\n`;
for (let p of selected.points) {{
  caption += `• ${{p}}\\n`;
}}
caption += `\\n💡 <b>Hành động hôm nay (Key Action):</b>\\n${{selected.action}}\\n\\n`;
caption += `🌱 <i>"${{selected.quote}}"</i>\\n\\n`;
caption += `👉 <i>Nếu bài viết này chạm đến bạn, hãy thả một cảm xúc nhẹ nhàng hoặc chia sẻ cho người bạn thương nhé!</i>\\n\\n`;
caption += `🌿 <b>${{selected.leadCTA}}</b>\\n`;
caption += `👉 <a href="https://traicainghien.com/bai-viet">traicainghien.com/bai-viet</a>\\n\\n`;
caption += `======\\n`;
caption += `🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>\\n`;
caption += `<a href="https://traicainghien.com">Website</a> | <a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm</a> | <a href="https://www.facebook.com/traicainghienvn2026">Fanpage</a>`;

return [{{
  json: {{
    photo: finalPhoto,
    caption: caption,
    parse_mode: 'HTML'
  }}
}}];
"""

found = False
for n in nodes:
    if n.get('name') == target_node_name:
        n['parameters']['jsCode'] = new_js_code
        found = True
        break

if not found:
    print(f"Error: Node '{target_node_name}' not found!")
else:
    with open('scripts/flow_01_updated.json', 'w', encoding='utf-8') as f:
        json.dump(wf, f, indent=2, ensure_ascii=False)
    print("Generated scripts/flow_01_updated.json successfully!")
