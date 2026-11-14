import html
import re

text = """🌿 <b>TRẠI CAI NGHIỆN DAILY</b>
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

clean = html.unescape(re.sub(r'<[^>]*>', ' ', text))
words = len(clean.split())
chars = len(text)
print(f'Từ: {words} từ')
print(f'Ký tự: {chars} ký tự (Giới hạn Telegram sendPhoto: 1024)')
