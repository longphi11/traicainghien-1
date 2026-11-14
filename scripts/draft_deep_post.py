import re
import html
import json
import urllib.request

def count_words(text):
    clean = re.sub(r'<[^>]*>', ' ', text)
    clean = html.unescape(clean)
    words = clean.strip().split()
    return len(words)

# Draft the in-depth 500+ word post
photo_url = "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2026-11/k_michels-malaysia-10445550.jpg"

post_html = f"""<a href="{photo_url}">&#8205;</a>🌿 <b>TRẠI CAI NGHIỆN DAILY • PHÂN TÍCH CHUYÊN SÂU</b>
🧠 <b>[KHOA HỌC HÀNH VI &amp; TẬP TRUNG SÂU]</b>

👉 <b>ẢNH HƯỞNG NGẦM CỦA KHÔNG GIAN: VÌ SAO Ý CHÍ LUÔN THUA MÔI TRƯỜNG?</b>
<i>Nguồn nghiên cứu: Psychology Today (TS. Shahram Heshmat - ĐH Illinois)</i>

Đã bao nhiêu lần bạn tự hứa: <i>"Hôm nay mình sẽ ngồi vào bàn làm việc liền mạch 2 tiếng không xao nhãng"</i>? Nhưng chỉ sau 15 phút, bạn thấy mắt mình dán vào điện thoại, tay lướt video ngắn vô thức, và cảm giác tội lỗi lại bóp nghẹt tâm trí: <i>"Sao mình vô kỷ luật thế này?"</i>

Nếu bạn từng rơi vào vòng lặp dằn vặt đó, nghiên cứu mới nhất trên tạp chí <b>Psychology Today</b> từ Tiến sĩ Shahram Heshmat mang lại một sự thật giải phóng: <b>Bạn không hề yếu đuối — não bộ của bạn chỉ đang phản ứng tự nhiên trước một môi trường được thiết kế sai cách.</b>

Hiện tượng này gọi là <b>Hiệu ứng Không gian Ngầm (The Ambience Effect)</b>. Não bộ không ra quyết định trong chân không. Ánh sáng, trật tự thị giác và âm thanh nền liên tục tác động vào thùy trán (Prefrontal Cortex), âm thầm dẫn dắt 80% hành vi mà ý thức không hề hay biết.

---

📌 <b>3 CƠ CHẾ NÃO BỘ ĐẰNG SAU SỰ MẤT TẬP TRUNG:</b>

<b>1. "Rò rỉ nhận thức" do ô nhiễm thị giác (Visual Clutter):</b>
Oscar Wilde từng nói: <i>"Không vật thể nào xấu đến mức không trở nên cuốn hút dưới ánh sáng và bối cảnh phù hợp."</i> Não người nguyên thủy tiến hóa để liên tục quét các mối đe dọa hoặc cơ hội xung quanh. Khi bàn làm việc có quá nhiều đồ đạc, cốc nước cũ, dây sạc ngổn ngang và chiếc điện thoại nằm ngay trong tầm mắt — thùy trán phải tiêu tốn lượng glucose sinh học khổng lồ chỉ để ức chế xung muốn chạm vào chúng. Sự hao tổn ngầm này khiến "bình ắc-quy" ý chí cạn kiệt chỉ sau 30 phút, đẩy bạn tìm đến dopamine rẻ tiền để xoa dịu stress.

<b>2. Ánh sáng nhân tạo và bẫy kích thích sai thời điểm:</b>
Chất lượng trải nghiệm sống phụ thuộc mật thiết vào bầu không khí (Ambience). Ánh sáng trắng gắt vào buổi tối triệt tiêu melatonin tự nhiên, giữ hạch hạnh nhân (Amygdala) ở trạng thái báo động. Khi cơ thể mệt mỏi nhưng hệ thần kinh bị kích thích giả tạo, não sẽ tự động thèm khát những kích thích giật gân tốc độ cao như TikTok, Reels để bù đắp năng lượng thiếu hụt.

<b>3. Ma sát môi trường quyết định thói quen (Friction Principle):</b>
Những bậc thầy hành vi không bao giờ dùng ý chí thô kệch đấu với thuật toán. Họ dựa vào nguyên tắc: giảm ma sát cho việc tốt và tăng tối đa ma sát cho việc xấu. Một góc làm việc tối giản, thoáng đãng sẽ gửi tín hiệu an toàn đến hệ thần kinh, đưa bạn vào trạng thái dòng chảy (Flow State) tự nhiên mà không cần phải gồng mình.

---

💡 <b>BÀI TẬP THỰC HÀNH VI MÔ (KAIZEN 1%):</b>
• <b>Quy tắc Bán kính 2 mét:</b> Cất điện thoại vào ngăn kéo hoặc để ở bàn khác cách xa ít nhất 2m khi làm việc. Thay đổi nhỏ này giúp giảm 70% số lần cầm máy vô thức.
• <b>Làm sạch điểm nhìn 180 độ:</b> Dọn toàn bộ vật thể thừa trong tầm mắt trực diện. Để mắt chỉ nhìn thấy màn hình hoặc mảng tường trống.
• <b>Hít thở 60 giây trước khi mở máy:</b> Ngồi yên 1 phút, thở chậm để đưa dopamine nền về cân bằng.

🌿 <i>"Đừng dùng ý chí đấu với cám dỗ. Hãy để một không gian tĩnh tại bảo vệ tâm trí bạn."</i>

📖 <a href="https://www.psychologytoday.com/us/blog/science-of-choice/202611/ambience-the-silent-influencer">Đọc nghiên cứu gốc tại Psychology Today</a>

======
🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>
<a href="https://traicainghien.com">Website</a> | <a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm</a> | <a href="https://www.facebook.com/traicainghienvn2026">Fanpage</a>"""

words = count_words(post_html)
chars = len(post_html)
print(f"Tổng số từ: {words} từ (Yêu cầu của bố: ít nhất 500 từ)")
print(f"Tổng số ký tự: {chars} ký tự (Giới hạn Telegram: 4096 ký tự)")
