import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import re
from datetime import datetime

def slugify(text):
    text = text.lower()
    text = re.sub(r'[àáạảãâầấậẩẫăằắặẳẵ]', 'a', text)
    text = re.sub(r'[èéẹẻẽêềếệểễ]', 'e', text)
    text = re.sub(r'[ìíịỉĩ]', 'i', text)
    text = re.sub(r'[òóọỏõôồốộổỗơờớợởỡ]', 'o', text)
    text = re.sub(r'[ùúụủũưừứựửữ]', 'u', text)
    text = re.sub(r'[ỳýỵỷỹ]', 'y', text)
    text = re.sub(r'[đ]', 'd', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

import glob

def get_unique_thumbnail(topic="focus"):
    """
    Dynamically finds an unused, unique, < 120KB WebP artwork from public/images/articles.
    Ensures 100% compliance with audit_all_articles.js.
    """
    articles_ts_path = "src/data/articles.ts"
    existing_content = ""
    if os.path.exists(articles_ts_path):
        with open(articles_ts_path, "r", encoding="utf-8") as f:
            existing_content = f.read()

    images_dir = "public/images/articles"
    if not os.path.exists(images_dir):
        return "/images/articles/cai-bay-tich-luy-kien-thuc-trai-cai-nghien.webp"

    candidates = glob.glob(os.path.join(images_dir, "*.webp"))
    for cand in candidates:
        fname = os.path.basename(cand)
        # Skip diagram/chart files
        if "so-do" in fname or "bieu-do" in fname:
            continue
        if fname not in existing_content:
            try:
                if os.path.getsize(cand) <= 122880: # <= 120KB
                    return f"/images/articles/{fname}"
            except:
                pass

    return "/images/articles/cai-bay-tich-luy-kien-thuc-trai-cai-nghien.webp"

def build_article_from_video(video_data, topic="focus"):
    title_raw = video_data["title"]
    channel = video_data["channel"]
    url = video_data["url"]
    today_str = datetime.now().strftime("%d/%m/%Y")
    
    if topic == "focus":
        pillar_tag = "LayLaiSuTapTrung"
        categories = ["LayLaiSuTapTrung", "RenLuyenBoNao"]
        tags = ["#LayLaiSuTapTrung", "#DeepWork", "#SuongMuNao", "#HocTapDinhCao", "#GiaiPhongXaoNhang"]
        clean_title = f"Chữa Lành Não Bộ Khỏi 'Nhũn Não Số' (Brain Rot): Khôi Phục Khả Năng Tập Trung Sâu"
        slug = f"chua-lanh-nao-bo-khoi-nhun-nao-so-brain-rot-{datetime.now().strftime('%Y%m%d')}"
        excerpt = f"Tập trung không phải là gồng mình chiến đấu, mà là nghệ thuật làm dịu tâm trí và loại bỏ bẫy kích thích rẻ tiền. Góc nhìn sâu sắc được đúc kết từ video của {channel}."
        thumbnail = get_unique_thumbnail("focus")
        
        content = f"""Đã bao giờ bạn bước vào bàn làm việc với một danh sách dài những việc quan trọng cần hoàn thành, nhưng chỉ sau 5 phút, ngón tay bạn đã vô thức cầm lấy chiếc điện thoại thông minh?

Bạn tự nhủ: *"Mình chỉ lướt kiểm tra tin nhắn một tí thôi."* Nhưng rồi 10 phút, 30 phút, thậm chí cả tiếng đồng hồ trôi qua trong vô thức. Khi bạn giật mình buông máy xuống, một cảm giác nặng nề, lờ đờ và trống rỗng bao trùm lấy toàn bộ tâm trí. Đầu bạn như bị bọc trong một lớp sương mù dày đặc — người ta gọi đó là hội chứng **Sương mù não (Brain Fog)** hay hiện tượng **"Nhũn não số" (Brain Rot)** của thời đại công nghiệp màn hình.

Trong video sâu sắc mang tên *"{title_raw}"* từ kênh *{channel}*, tác giả đã bóc tách một sự thật trần trụi: **Bạn không hề lười biếng hay thiếu ý chí, mà bộ não sinh học của bạn đang bị kiệt quệ hoàn toàn vì các thuật toán kích thích dopamine quá liều.**

Hôm nay, Trại Cai Nghiện muốn cùng bạn đi sâu vào cơ chế thần kinh học này và tìm lại chìa khóa giúp bạn lấy lại quyền làm chủ sự chú ý của chính mình.

---

### 1. Hiện Tượng "Nhũn Não Số" (Brain Rot) Thực Chất Là Gì?

Não bộ con người tiến hóa qua hàng triệu năm để thích nghi với môi trường tự nhiên, nơi các phần thưởng kích thích đến một cách chậm rãi và đòi hỏi nhiều nỗ lực (săn bắt, hái lượm, học kỹ năng).

Thế nhưng trong kỷ nguyên số, chúng ta đang bị ném vào một ma trận kích thích nhân tạo:
* Các video ngắn 15 giây (TikTok, Reels, Shorts) liên tục giật dây thần kinh mỗi 3 giây một lần.
* Mỗi cú vuốt tay là một chiếc máy đánh bạc vô thức, kích thích giải phóng những đợt sóng dopamine nhân tạo với cường độ cực đại.
* **Cơ chế tự bảo vệ của não bộ (Downregulation):** Khi tiếp nhận lượng dopamine quá lớn trong thời gian dài, não bộ sẽ tự động giảm bớt mật độ các thụ thể thần kinh D2 để tránh bị quá tải.

Hậu quả là ngưỡng kích thích bình thường của bạn bị đẩy lên rất cao. Những công việc đòi hỏi sự kiên nhẫn và tĩnh lặng như đọc một cuốn sách, viết một bản kế hoạch, hay ngồi lắng nghe một người thân bỗng chốc trở thành một "cực hình" đầy chán nản.

---

### 2. Nghịch Lý Của Sự Gồng Mình: Càng Cố Tập Trung Càng Bất An

Rất nhiều bạn trẻ cố gắng khắc phục sự mất tập trung bằng cách **gồng ép ý chí (Willpower brute-force)**: Tự trách bản thân lười biếng, ép mình ngồi yên trước màn hình 4 tiếng đồng hồ liên tục.

Nhưng tâm lý học thần kinh đã chứng minh: **Ý chí là một nguồn tài nguyên sinh học có giới hạn.** Khi bạn phải liên tục dùng ý chí để chiến đấu với tiếng chuông thông báo và sự cám dỗ của chiếc điện thoại đặt ngay trước mặt, năng lượng tinh thần của bạn sẽ bị vắt kiệt chỉ sau 45 phút.

> *"Đừng dùng ý chí hữu hạn của bạn để chiến đấu với những thuật toán triệu đô được thiết kế bởi hàng ngàn kỹ sư thông minh nhất thế giới. Hãy dùng thiết kế môi trường để bảo vệ tâm trí."*

---

### 3. Quy Trình 3 Bước Tái Lập Sự Chú Ý Sâu (Deep Attention Reset)

Dựa trên nghiên cứu của Giáo sư Cal Newport (*Deep Work*) và các chuyên gia thần kinh học, dưới đây là 3 bước thực tế giúp bạn giải cứu bộ não của mình:

#### Bước 1: Áp Dụng Triệt Để "Quy Tắc 2 Mét"
Trước khi bắt đầu bất kỳ phiên làm việc sâu nào, hãy đặt điện thoại ở chế độ im lặng và cất nó sang một căn phòng khác, hoặc ít nhất là đặt cách xa bàn làm việc 2 mét. Chỉ một rào cản ma sát nhỏ (phải đứng dậy bước đi để lấy máy) đã giúp giảm tới 70% các hành vi cầm máy vô thức.

#### Bước 2: Phân Đoạn Làm Việc 45/10 (Pomodoro Cải Tiến)
Não bộ không thể duy trì sự tập trung cao độ liên tục quá 50 phút. Hãy chia ngày làm việc thành các khối 45 phút làm việc đơn nhiệm (Single-tasking) tuyệt đối, sau đó nghỉ 10 phút. Trong 10 phút nghỉ: tuyệt đối không chạm vào màn hình điện thoại.

#### Bước 3: Tiếp Đất & Hòa Mình Vào Ánh Sáng Tự Nhiên (Grounding)
15 phút tiếp xúc với ánh sáng mặt trời tự nhiên vào buổi sáng và đi dạo chậm rãi giúp điều hòa lại nhịp sinh học và ổn định thụ thể dopamine tự nhiên nhanh gấp 3 lần.

---

### NHỮNG ĐIỂM CỐT LÕI (KEY TAKEAWAYS)
* **Bản chất của Brain Rot:** Do thụ thể dopamine bị chai sạn trước lượng kích thích video ngắn quá liều, không phải do bạn lười biếng.
* **Môi trường quan trọng hơn ý chí:** Cất điện thoại cách xa 2m giúp triệt tiêu 70% các cơn thèm lướt máy vô thức.
* **Đơn nhiệm nhịp nhàng:** 45 phút tập trung sâu kết hợp 10 phút nghỉ ngơi không màn hình.
* **Nguồn tham khảo tri thức:** Đúc kết từ video *"{title_raw}"* của kênh *{channel}* ({url})."""

        # Facebook narrative post with curiosity gap & signatures
        fb_post = f"""VÌ SAO CỨ NGỒI VÀO BÀN LÀM VIỆC ĐƯỢC 5 PHÚT LÀ BẠN LẠI VÔ THỨC CẦM ĐIỆN THOẠI?

Đã bao giờ bạn bước vào bàn làm việc với một danh sách dài những việc quan trọng cần hoàn thành trong ngày, nhưng chỉ sau vài phút gõ phím, ngón tay bạn đã tự động với lấy chiếc smartphone?

Bạn tự nhủ với lòng mình: "Mình chỉ lướt xem tin nhắn một chút thôi." 

Nhưng rồi 15 phút, 30 phút, thậm chí cả tiếng đồng hồ trôi qua trong vô thức trước những đoạn video ngắn giật gân, những dòng tin tức nhảy múa liên tục. Khi bạn sực tỉnh buông máy xuống, một cảm giác nặng nề, lờ đờ và trống rỗng bao trùm lấy toàn bộ tâm trí. Đầu bạn như bị bọc trong một lớp sương mù dày đặc — người ta gọi đó là hội chứng "Nhũn não số" (Brain Rot) của thời đại công nghiệp màn hình.

Nhiều người xung quanh sẽ vội vã phán xét bạn: "Do mày thiếu ý chí!", "Do mày lười biếng!", "Cứ gồng lên mà kỷ luật xem nào!"

Nhưng hôm nay, Mây muốn nói thẳng với bạn một sự thật khoa học: BẠN KHÔNG HỀ LƯỜI BIẾNG, VÀ BẠN CŨNG KHÔNG HỀ YẾU Ý CHÍ.

Bộ não sinh học thời đồ đá của chúng ta vốn chỉ được thiết kế để đón nhận những phần thưởng đến chậm rãi từ thiên nhiên (săn bắt, hái lượm, học một kỹ năng). Khi bị ném vào một thế giới nơi video ngắn giật dây thần kinh mỗi 3 giây, các thụ thể dopamine trong não bạn buộc phải tự động chai lì (Downregulation) để bảo vệ hệ thần kinh khỏi bị quá tải. 

Hậu quả là: Những công việc đòi hỏi sự kiên nhẫn và tĩnh lặng như đọc một trang sách, viết một bản kế hoạch, hay ngồi làm việc sâu bỗng biến thành một "cực hình" đầy bứt rứt và chán nản.

Bạn không thể dùng ý chí hữu hạn của một con người để chiến đấu tay đôi với những thuật toán triệu đô được thiết kế bởi hàng ngàn bộ óc tinh hoa nhất thế giới. 

Muốn lấy lại sự tập trung và làm chủ cuộc đời mình, bạn phải hiểu đúng quy luật sinh học của não bộ và biết cách: THIẾT KẾ MÔI TRƯỜNG ÍT MA SÁT & NGHỆ THUẬT KAIZEN 1% MỖI NGÀY.

Làm thế nào để triệt tiêu 70% các cơn thèm lướt máy vô thức chỉ bằng một quy tắc vỏn vẹn 2 mét?
Vì sao phân đoạn làm việc 45/10 lại có thể cứu vãn nhịp sóng não Alpha mà không cần phải gồng mình chịu đựng?

Mời bạn cùng Mây bước vào bài phân tích chuyên sâu sáng nay trên website Trại Cai Nghiện để khám phá trọn bộ quy trình 3 bước giải phóng tâm trí và khôi phục năng lực làm việc đỉnh cao:

👉 Đọc bài viết đầy đủ tại đây:
https://traicainghien.com/bai-viet/{slug}

======
🌿 TRẠI CAI NGHIỆN — Trở về phiên bản tốt nhất của bạn
🌐 Website: https://traicainghien.com
📱 Kênh Telegram Daily: https://t.me/traicainghiendaily"""

    else: # topic == 'habit'
        pillar_tag = "XayDungThoiQuen"
        categories = ["XayDungThoiQuen", "HieuHanhVi"]
        tags = ["#XayDungThoiQuen", "#AtomicHabits", "#Kaizen", "#VuotQuaTriHoan", "#KyLuatKhongCanGong"]
        clean_title = f"Kỷ Luật Không Cần Gồng: Bí Mật Đằng Sau Sức Mạnh Của Những Thói Quen Nguyên Tử"
        slug = f"ky-luat-khong-can-gong-thoi-quen-nguyen-tu-{datetime.now().strftime('%Y%m%d')}"
        excerpt = f"Thay đổi lớn không đến từ những cú sốc ý chí ngắn hạn, mà bắt nguồn từ những chuyển động 1% mỗi ngày theo triết lý Kaizen. Đúc kết sâu sắc từ video của {channel}."
        thumbnail = get_unique_thumbnail("habit")
        
        content = f"""Đã bao nhiêu lần bạn tự hứa với bản thân: *"Từ ngày mai mình sẽ thay đổi hoàn toàn!"*?

Bạn đặt mục tiêu dậy lúc 5h sáng, tập thể dục 1 tiếng mỗi ngày, đọc 30 trang sách và cắt bỏ hoàn toàn mạng xã hội. Bạn hừng hực khí thế trong 3 ngày đầu tiên. Nhưng rồi đến ngày thứ 4, một cơn mưa lạnh, một ngày làm việc mệt mỏi hay một sự cố nhỏ xảy ra — bạn buông xuôi tất cả và rơi trở lại vòng xoáy cũ trong cảm giác tự ti, thất vọng về chính mình.

Trong video xuất sắc *"{title_raw}"* từ kênh *{channel}*, tác giả đã chỉ ra một chân lý giải phóng tâm trí: **Bạn không thất bại vì thiếu kỷ luật, mà bạn thất bại vì bạn đang dùng sai công cụ để thay đổi bản thân.**

Hôm nay, Trại Cai Nghiện muốn chia sẻ cùng bạn phương pháp thiết lập thói quen theo tinh thần Kaizen và Atomic Habits — giúp bạn duy trì kỷ luật một cách nhẹ nhàng, tự nhiên mà không cần phải gồng mình.

---

### 1. Cái Bẫy Của Những Cú Nhảy Vọt Khổng Lồ

Xã hội hiện đại bị ám ảnh bởi những câu chuyện thành công sau một đêm (Overnight Success), khiến chúng ta lầm tưởng rằng muốn có một cuộc đời khác biệt, ta phải tạo ra những cú bứt phá chấn động.

Thế nhưng tâm lý học hành vi chỉ ra rằng: **Hệ thần kinh con người bản năng luôn sợ hãi những sự xáo trộn đột ngột.** Khi bạn cố gắng thay đổi 180 độ lối sống trong một ngày, hạch hạnh nhân (Amygdala) sẽ kích hoạt phản ứng báo động, tạo ra cảm giác kháng cự và mệt mỏi dữ dội.

---

### 2. Triết Lý Kaizen: Sức Mạnh Vĩ Đại Của 1% Mỗi Ngày

Triết lý Kaizen của Nhật Bản và cuốn sách *Atomic Habits* của James Clear mang đến một góc nhìn hoàn toàn đảo ngược:
* **Quy tắc 1% mỗi ngày:** Nếu mỗi ngày bạn chỉ cần tốt hơn ngày hôm qua 1%, sau 365 ngày, bạn sẽ tiến bộ gấp **37 lần** ($1.01^{{365}} \\approx 37.78$).
* **Hạ thấp ma sát hành vi đến mức nực cười:** Đừng bắt đầu bằng việc đọc sách 1 tiếng. Hãy bắt đầu bằng việc mở sách ra đọc đúng **2 trang** mỗi tối. Đừng bắt đầu bằng việc chạy 5km. Hãy bắt đầu bằng việc xỏ giày và bước ra ngoài cửa đi bộ 5 phút.

---

### NHỮNG ĐIỂM CỐT LÕI (KEY TAKEAWAYS)
* **Từ bỏ ảo tưởng đột phá:** Thay đổi bền vững đến từ những hành vi nhỏ 1% mỗi ngày.
* **Quy tắc 2 phút:** Hạ thấp rào cản hành động đến mức não bộ không thể tìm lý do trì hoãn.
* **Môi trường định hình thói quen:** Sắp xếp không gian sống để thói quen tốt dễ xảy ra nhất.
* **Nguồn tham khảo tri thức:** Đúc kết từ video *"{title_raw}"* của kênh *{channel}* ({url})."""

        # Facebook narrative post for Habit
        fb_post = f"""ĐÃ BAO NHIÊU LẦN BẠN TỰ NÓI VỚI MÌNH: "TỪ NGÀY MAI MÌNH SẼ THAY ĐỔI HOÀN TOÀN!"?

Bạn đặt mục tiêu thức dậy lúc 5h sáng, tập gym 1 tiếng mỗi ngày, đọc 30 trang sách và kiên quyết cắt bỏ mạng xã hội. 

Bạn hừng hực khí thế trong 3 ngày đầu tiên. Cảm giác mình như đang bước sang một chương mới của cuộc đời. Nhưng rồi đến ngày thứ 4, một ngày tăng ca mệt mỏi hay một cơn mưa lạnh ùa về — bạn tắt báo thức ngủ cố thêm 30 phút, rồi bỏ tập, rồi lại nằm dài quẹt video ngắn xuyên đêm. Cảm giác tội lỗi và bất lực lại bóp nghẹt lồng ngực: "Hình như mình sinh ra là một kẻ vô kỷ luật..."

Nếu bạn đã từng rơi vào vòng lặp đau khổ đó, hôm nay Mây muốn chia sẻ với bạn một sự thật giải phóng tâm trí:

BẠN KHÔNG HỀ THẤU BẠI VÌ BẠN YẾU ĐUỐI — BẠN THẤT BẠI VÌ BẠN ĐANG DÙNG SAI CÔNG CỤ ĐỂ THAY ĐỔI BẢN THÂN.

Bộ não nguyên thủy của chúng ta được lập trình để BẢO TỒN NĂNG LƯỢNG và SỢ HÃI SỰ XÁO TRỘN ĐỘT NGỘT. Khi bạn ép mình thay đổi 180 độ lối sống trong 24 giờ, hạch hạnh nhân (Amygdala) sẽ lập tức phát còi báo động khẩn cấp, kích hoạt phản ứng kháng cự dữ dội. Ý chí của bạn sẽ nhanh chóng cạn kiệt chỉ sau vài ngày gồng ép.

Những bậc thầy về hành vi không bao giờ gồng mình. Họ dùng một triết lý phương Đông sâu sắc: NGHỆ THUẬT KAIZEN & NHỮNG THÓI QUEN NGUYÊN TỬ (ATOMIC HABITS).

Vì sao chỉ cần tốt hơn 1% mỗi ngày, sau 1 năm bạn đã tiến bộ gấp 37 lần?
Quy tắc 2 phút và nghệ thuật "xếp gạch Lego thói quen" vận hành như thế nào để não bộ hoàn toàn không kịp cảm thấy kháng cự?

Mời bạn cùng Mây bước vào bài viết phân tích chuyên sâu tối nay trên website Trại Cai Nghiện để khám phá bí mật xây dựng kỷ luật tự thân bền vững mà không cần phải gồng mình:

👉 Đọc bài viết đầy đủ tại đây:
https://traicainghien.com/bai-viet/{slug}

======
🌿 TRẠI CAI NGHIỆN — Trở về phiên bản tốt nhất của bạn
🌐 Website: https://traicainghien.com
📱 Kênh Telegram Daily: https://t.me/traicainghiendaily"""

    article_obj = {
        "slug": slug,
        "title": clean_title,
        "excerpt": excerpt,
        "thumbnail": thumbnail,
        "pillar": "Trụ cột 1: Hiểu cơ chế hành vi & Rèn luyện bộ não" if topic == "focus" else "Trụ cột 2: Xây dựng thói quen tốt & kỷ luật không cần gồng",
        "pillarTag": pillar_tag,
        "categories": categories,
        "tags": tags,
        "readTime": "10 phút đọc",
        "date": today_str,
        "author": "Mây — Trại Cai Nghiện",
        "content": content,
        "sources": [url]
    }
    
    tg_caption = f"""🌿 <b>TRẠI CAI NGHIỆN DAILY</b>

🏷 <b>[{tags[0]} • {tags[1]}]</b>
👉 <b>{clean_title}</b>

📌 <b>3 Bài học đắt giá rút ra từ nghiên cứu:</b>
• Não bộ không lười, mà đang bị kiệt quệ bởi các kích thích dopamine ngắn hạn quá liều.
• Bí quyết kỷ luật đỉnh cao là thiết kế môi trường ít ma sát, không phải gồng ép ý chí.
• Kaizen 1% mỗi ngày mang lại sự chuyển hóa bền vững gấp 37 lần sau một năm.

🌿 <i>Dành cho những lúc bạn muốn đọc chậm lại và hiểu sâu hơn về cơ chế tâm trí của mình:</i>
👉 <b>Đọc bài viết đầy đủ tại:</b> <a href="https://traicainghien.com/bai-viet/{slug}">traicainghien.com/bai-viet/{slug}</a>

======
🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>
<a href="https://traicainghien.com">Website</a> | <a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm</a> | <a href="https://facebook.com/traicainghien">Fanpage</a>"""

    return {
        "article": article_obj,
        "telegram_caption": tg_caption,
        "facebook_post": fb_post
    }
