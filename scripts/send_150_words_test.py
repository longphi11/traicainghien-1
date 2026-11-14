import urllib.request
import urllib.parse
import json
import re
import html
import sys

sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = "9249970693:AAFnHi-ZCx7N576orPkdMqapeRLWfHQLH6Q"
CHANNEL_ID = "-1004488309634" # @traicainghiendaily

photo_url = "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2026-11/k_michels-malaysia-10445550.jpg?itok=Vxqou15Q"

caption = """🌿 <b>TRẠI CAI NGHIỆN DAILY</b>
🧠 <b>[TÂM LÝ HỌC &amp; HÀNH VI]</b>

👉 <b>Vì Sao Ý Chí Luôn Thua Môi Trường?</b>

Vừa ngồi vào bàn 5 phút đã lướt video ngắn? Nghiên cứu từ <i>Psychology Today</i> khẳng định: Bạn không hề lười hay thiếu kỷ luật, não bộ chỉ đang phản ứng trước không gian bừa bộn.

📌 <b>3 Cơ chế cần nhớ:</b>
• <b>Rò rỉ nhận thức:</b> Bàn bừa bộn khiến thùy trán cạn năng lượng vì liên tục phải ức chế cám dỗ.
• <b>Ánh sáng gắt:</b> Đèn trắng buổi tối triệt tiêu melatonin, kích thích cơn thèm dopamine.
• <b>Ma sát thói quen:</b> Môi trường tối giản gửi tín hiệu an toàn, đưa não vào tập trung sâu.

💡 <b>Kaizen 1%:</b> Để điện thoại cách xa 2m giúp giảm 70% số lần cầm máy vô thức.

🌱 <i>"Đừng dùng ý chí đấu với cám dỗ. Hãy để không gian tĩnh tại bảo vệ bạn."</i>

📖 <a href="https://www.psychologytoday.com/us/blog/science-of-choice/202611/ambience-the-silent-influencer">Bài gốc</a> · 🌿 <a href="https://traicainghien.com">Trại Cai Nghiện</a>"""

clean = html.unescape(re.sub(r'<[^>]*>', ' ', caption))
words = len(clean.split())
chars = len(caption)

print(f"Tổng số từ: {words} từ (Khoảng 150 từ)")
print(f"Tổng số ký tự: {chars} ký tự (Giới hạn Telegram sendPhoto: 1024)")

send_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
payload = {
    'chat_id': CHANNEL_ID,
    'photo': photo_url,
    'caption': caption,
    'parse_mode': 'HTML'
}

req = urllib.request.Request(
    send_url,
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        if res.get('ok'):
            msg_id = res['result']['message_id']
            print(f"✅ GỬI THÀNH CÔNG BẢN TIN 150 TỪ KÈM ẢNH NATIVE LÊN TELEGRAM!")
            print(f"Message ID: {msg_id}")
            print(f"🔗 Link xem bài: https://t.me/traicainghiendaily/{msg_id}")
        else:
            print("Lỗi:", res)
except Exception as e:
    print("Exception:", e)
