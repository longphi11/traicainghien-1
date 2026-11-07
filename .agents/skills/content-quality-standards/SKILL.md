---
name: content-quality-standards
description: Bộ tiêu chuẩn thẩm định và quy trình kiểm duyệt chất lượng đa kênh toàn diện (Website Content, Media Video, Visual Design, Facebook Automation) trước khi cho phép sản phẩm go-live lên live. Do Mây và Agent 5 trực tiếp gác cổng.
---

# 🛡️ BỘ TIÊU CHUẨN KIỂM DUYỆT CHẤT LƯỢNG ĐA KÊNH TRƯỚC KHI GO-LIVE (QUALITY AUDIT PROTOCOL)

> **Cơ quan kiểm duyệt tối cao:** **Mây (Tổng Biên Tập)** & **Agent 5 (Kiểm Toán Trưởng - Content & Quality Auditor)**  
> **Nguyên tắc bất di bất dịch:** **KHÔNG CÓ TEM DUYỆT PASS 100% TỪ AGENT 5 & MÂY = TUYỆT ĐỐI CẤM GO-LIVE (KHÔNG PUSH GIT, KHÔNG ĐĂNG BÀI, KHÔNG UPLOAD MEDIA)**.

---

## 🏛️ SƠ ĐỒ QUY TRÌNH KIỂM DUYỆT BẮT BUỘC (4 CỔNG CHẶN)

```mermaid
flowchart TD
    PROD[1. Khối Sản Xuất: Agent 1, 2, 8] --> AUDIT[2. Cổng Kiểm Duyệt: Agent 5 & Mây]
    
    AUDIT --> CHECK{Đạt 100% Checklist?}
    
    CHECK -- FAIL (Có lỗi/thiếu sót) --> REVISE[Trả về Agent tương ứng sửa lại]
    REVISE --> AUDIT
    
    CHECK -- PASS (Đạt tem kiểm duyệt) --> DEPLOY[3. Khối Thực Thi Go-Live]
    
    DEPLOY --> D_WEB[Agent 4: Deploy Web Vercel & Google Indexing]
    DEPLOY --> D_FB[Agent 9: Bật luồng n8n Đăng Fanpage & Reels]
    DEPLOY --> D_SOC[Agent 2: Đăng TikTok / Shorts]
```

---

## 📋 4 BẢNG TIÊU CHUẨN KIỂM DUYỆT THEO TỪNG KÊNH CỤ THỂ

### CỔNG 1: BÀI VIẾT NỘI DUNG WEBSITE (AGENT 1 → AGENT 5 → AGENT 4)
*Trước khi Agent 4 đưa vào `src/data/articles.ts`, build tĩnh và push Git, Agent 5 phải rà soát qua 10 chốt chặn thép:*
- [ ] **1. Độ dài chuẩn:** Đạt tối thiểu **2.500 từ** (chuẩn mực 2.800 - 3.800 từ cho các bài chuyên sâu, đếm từ thực tế, không tính code hay cú pháp rác).
- [ ] **2. Tiêu đề chuẩn 2 dòng (Curiosity Hook):** Độ dài vàng **50 – 62 ký tự**. Vừa khít 2 dòng ở box card ngoài, tuyệt đối không bị cắt cụt ba chấm `...`.
- [ ] **2.1. Tiêu chuẩn bài viết về sách (Lệnh đặc biệt của Bố):** Tiêu đề BẮT BUỘC tuân thủ format `"Đọc [tên sách] - [tựa đề]"` (dùng dấu gạch nối ` - `, tuyệt đối không dùng dấu hai chấm `:`). Đồng thời bài viết về sách CHỈ ĐƯỢC PHÉP gắn duy nhất danh mục `SachHay` (`categories: ["SachHay"]`), thumbnail là bìa sách 3D trong không gian Zen, watermark `🌿 TRẠI CAI NGHIỆN`.
- [ ] **3. Vị trí khối "Những Điểm Chính":** Bắt buộc nằm ở **dưới cùng bài viết**, ngay sau *"Lời nhắn gửi từ Trại Cai Nghiện"*. Tuyệt đối không đặt ở đầu hay giữa bài.
- [ ] **4. CẤM TUYỆT ĐỐI HÌNH ẢNH DẠNG KÝ TỰ / TEXT ART / MERMAID / ASCII (LỆNH ĐẶC BIỆT CỦA BỐ):**
  - CẤM 100% các khối mã ````mermaid````, sơ đồ vẽ bằng ký tự chữ (`╭───╮`, `▲`, `│`, `└──►`, `┌`, `└`). Trên web và di động, chúng sẽ vỡ layout và biến thành văn bản rác mắt.
  - Mọi sơ đồ, biểu đồ, chu kỳ 4 giai đoạn, mô hình tâm lý học... **BẮT BUỘC PHẢI LÀ FILE ẢNH PICTURE THẬT SỰ (.webp)**, thiết kế chuẩn mỹ cảm Zen Minimalist, lưu tại `public/images/articles/` và nhúng bằng cú pháp `![Tên ảnh](/images/articles/ten-anh.webp)`.
- [ ] **5. CẤM TUYỆT ĐỐI KÝ TỰ LATEX & CÔNG THỨC RÁC MẮT:**
  - CẤM 100% cú pháp `$\rightarrow$`, `$$...$$`, `\mathbf`, `\text{...}`.
  - Tất cả mũi tên diễn đạt phải dùng ký tự unicode sạch `→`.
  - Công thức số học phải viết bằng số mũ tự nhiên (ví dụ: `1,01³⁶⁵ = 37,78`).
- [ ] **6. CẤM TUYỆT ĐỐI BẢNG BIỂU MARKDOWN THÔ (`| :--- |`):**
  - Không dùng cú pháp bảng kẻ `| :--- |` thô ráp. Bắt buộc chuyển hóa thành văn phong so sánh đối chiếu mộc mạc hoặc vẽ thành infographic picture.
- [ ] **7. Quy tắc 4 KHÔNG:** Không phán xét đạo đức/lười biếng; không dùng từ ngữ self-help sáo rỗng (*tần số rung động, chuyển hóa đỉnh cao*); không kết án vấp ngã; không lý thuyết suông.
- [ ] **8. Văn phong thực chiến:** Chuẩn *"Nói chuyện cà phê vỉa hè nhưng trí tuệ viện nghiên cứu"* (Street-Smart Academic). Dẫn chứng đời thực (ngón tay quẹt 2h sáng cay xè mắt, bát phở 30k, chiếc điện thoại úp mặt).
- [ ] **9. Móc câu giữ chân (Retention):** Giữ nhịp câu biến hóa, có câu hỏi lửng (Open Loops) giữa các phần.
- [ ] **10. SEO On-page:** Từ khóa xuất hiện tự nhiên trong Title, Slug, H1, H2; Meta Excerpt 140 - 160 ký tự; gắn đa danh mục (`categories: [...]`); có ít nhất 2 - 3 link nội bộ và nút CTA dẫn tới bài trắc nghiệm.
- [ ] **11. Thời gian đọc (readTime) tối đa 12 phút (LỆNH ĐẶC BIỆT CỦA BỐ):** Thuộc tính `readTime` hiển thị ở thẻ card và đầu bài viết chỉ được phép nằm trong khoảng 8 – 12 phút (tối đa không quá 12 phút). Tuyệt đối cấm để 14 – 18 phút làm độc giả bị ngợp và ngại bấm click đọc bài.

---

### CỔNG 2: THỊ GIÁC & HÌNH ẢNH VISUAL (AGENT 8 → AGENT 5)
*Trước khi bất kỳ hình ảnh nào được gắn vào bài viết web hoặc làm cover media:*
- [ ] **1. QUY CHUẨN ĐỘC TÔN: 100% ẢNH BÌA BẮT BUỘC PHẢI LÀ DẠNG TRANH VẼ TAY (LỆNH ĐẶC BIỆT CỦA BỐ):**
  - **CẤM TUYỆT ĐỐI 100% MỌI DẠNG ẢNH CHỤP & PHOTOREALISTIC:**
    - ❌ **CẤM ẢNH CHỤP THỰC TẾ (Photo stills):** Tuyệt đối không dùng ảnh chụp từ máy ảnh, ảnh stock chụp người thật hay cảnh thật.
    - ❌ **CẤM ẢNH PHOTOREALISTIC / 3D RENDER TĨNH VẬT THỰC TẾ:** Cấm hoàn toàn phong cách render 3D chân thực như ảnh chụp tĩnh vật (bàn gỗ, tách trà, chậu cây, cuốn sổ render bóng bẩy như chụp máy ảnh). Bất kể đồ vật hay con người đều bắt buộc phải được thể hiện bằng **bút pháp tranh vẽ tay màu nước thủy mặc**.
  - **BẮT BUỘC TRANH VẼ TAY NGHỆ THUẬT:** 100% hình ảnh là tranh vẽ màu nước thủy mặc mộc mạc, tĩnh lặng trên nền giấy washi sần be ấm (`#FAF7F2`), nhìn rõ nét cọ vẽ tay, vệt loang màu nước tự nhiên (*watercolor pigment bleeds*) và nét viền mực Sumi-e xước nhẹ kết hợp sắc xanh rêu rừng (`#3A5A40`) và đất nung (`#C27D53`). Người xem nhìn vào phải nhận ra NGAY LẬP TỨC đó là một tác phẩm hội họa nghệ thuật.
- [ ] **2. Cơ chế chống Cache trình duyệt & CDN (Cache-Busting URL):** Khi thay đổi/cập nhật hình ảnh, bắt buộc phải đổi tên file sang định danh mới (ví dụ: `-zen-`, `-v2.webp`) để trình duyệt và CDN không hiển thị lại ảnh cũ trong bộ nhớ đệm.
- [ ] **3. NGUYÊN TẮC ĐỘC BẢN THỊ GIÁC & CẤM TRÙNG LẶP Ý TƯỞNG (ZERO VISUAL DUPLICATION — LỆNH ĐẶC BIỆT CỦA BỐ):**
  - **CẤM TUYỆT ĐỐI TRÙNG LẶP HÌNH ẢNH HOẶC Ý TƯỞNG THỊ GIÁC:** Không bao giờ tái sử dụng thumbnail hoặc sơ đồ đã từng xuất hiện ở bất kỳ bài viết nào khác trên website. Mỗi bài viết là một thực thể độc lập, BẮT BUỘC phải có một tác phẩm tranh vẽ độc bản hoàn toàn mới.
  - **CẤM ĐỔI TÊN FILE ĐỂ TÁI SỬ DỤNG:** Tuyệt đối không lấy ảnh master cũ crop lại hoặc đổi tên file mới để lừa bộ lọc. Mọi hình ảnh phải mang ẩn dụ thị giác độc nhất.
  - **MỞ RỘNG BỐI CẢNH THỊ GIÁC (CẤM BÓ HẸP TRONG PHÒNG):** Không được lặp đi lặp lại bối cảnh bàn làm việc / góc phòng khép kín. Phải đa dạng hóa sang các không gian mở: thiên nhiên khoáng đạt, sườn núi mờ sương, lối mòn ven rừng thông, ban công đón bình minh, quán cà phê phố thị... mang lại cảm giác giải phóng tâm trí và tự do.
  - **Kiểm toán tự động khóa cứng:** Chạy `node scripts/audit_all_articles.js` tự động phát hiện và chặn đứng 100% các vi phạm trùng lặp ảnh trước khi build.
- [ ] **4. TÍNH BÁM SÁT TUYỆT ĐỐI NỘI DUNG BÀI VIẾT (CONTENT-VISUAL COHERENCE — LỆNH ĐẶC BIỆT CỦA BỐ):**
  - **CẤM TUYỆT ĐỐI ẢNH PHONG CẢNH CHUNG CHUNG, VÔ HỒN:** Không được dùng những hình ảnh phong cảnh trừu tượng, lạc đề không ăn nhập với nội dung bài viết.
  - **TỰ THÂN ĐỌC SÂU NỘI DUNG (TUYỆT ĐỐI KHÔNG CHỜ BỐ GỢI Ý):** Mây và Agent 8 bắt buộc phải tự động đọc toàn bộ bài viết, trích xuất đúng câu chuyện, ví dụ thực tế hoặc nhân vật hành vi cốt lõi để đưa vào tranh vẽ (Ví dụ: bài về *rèn luyện não bộ / học việc khó / Deliberate Practice* $\rightarrow$ hình ảnh **vận động viên tự thân khổ luyện trên đường dốc sương sớm**; bài về *Deep Work* $\rightarrow$ **người tập trung cao độ bên sổ tay và tách trà**; bài về *cai nghiện màn hình 2m* $\rightarrow$ **chiếc điện thoại úp mặt trên bàn cách xa giường**).
  - Hình ảnh phải kể được câu chuyện bài viết ngay từ cái nhìn đầu tiên mà không cần đọc chữ.
- [ ] **5. Dấu chìm nhận diện thương hiệu (Watermarks):**
  - Góc trên bên trái: Huy hiệu `🌿 TRẠI CAI NGHIỆN` (nền tối mờ, chữ trắng).
  - Góc dưới bên phải: Huy hiệu tên miền `traicainghien.com`.
- [ ] **6. Kỹ thuật SEO Hình Ảnh & Dung Lượng:** Tỷ lệ chuẩn **16:9** (`1200x675px`), định dạng **WebP**, dung lượng tối ưu **BẮT BUỘC DƯỚI 120KB**, tên file chứa từ khóa không dấu ngăn cách bằng gạch nối (`tu-khoa-zen-trai-cai-nghien.webp`), đầy đủ thẻ `alt`.
- [ ] **7. Quy chuẩn Chống Cắt Chữ Sơ Đồ Diễn Giải / Infographics (Anti-Clipping & Safe Typography - LỆNH ĐẶC BIỆT CỦA BỐ):**
  - CẤM TUYỆT ĐỐI các sơ đồ có chữ bị tràn khung, mất chữ đầu cuối (`QUY...ỐI`, `BƯỚC...`).
  - Tiêu đề infographic: Font tối đa 24px, căn giữa, lề an toàn 2 bên tối thiểu **150px**.
  - Thẻ nội dung (Cards): Header thẻ PHẢI tách 2 dòng (`BƯỚC X` ở trên, `TÊN BƯỚC` ở dưới), chiều cao thẻ header tối thiểu 65px. Chiều rộng chữ không được vượt quá 75% chiều rộng thẻ.
  - Mọi sơ đồ phải được kiểm tra bounding box qua `scripts/infographic_engine.py` và lưu ảnh PNG preview vào thư mục `brain` để kiểm tra trực quan trước khi đẩy lên live.
- [ ] **8. Quy chuẩn Đồng Bộ Thumbnail Bài Viết Về Sách (Mục Sách Hay) — LỆNH ĐẶC BIỆT CỦA BỐ:**
  - 100% bài viết về sách (`#SachHay` hoặc tiêu đề `"Đọc [Tên Sách] - ..."`) BẮT BUỘC phải dùng chung một format thiết kế ảnh bìa chuẩn như bài *Đọc 'Đi Tìm Lẽ Sống' - Chiếc Phao Cứu Sinh Giữa Nghịch Cảnh*:
  - **Bố cục chuẩn:** Mockup 3D bìa sách chính thức đứng thẳng nghiêng nhẹ góc 3/4 tự nhiên trên bàn gỗ Zen, cạnh khung cửa sổ mở hướng ra núi mây thủy mặc Sumi-e, tách trà gốm bốc khói mỏng và cuộn giấy thư pháp mở hờ.
  - **CẤM TUYỆT ĐỐI:** Cấm tranh phong cảnh chung chung, cấm hình vẽ nhà sư hay người ngồi thiền mà KHÔNG CÓ BÌA SÁCH cho bài review sách. Agent 5 quét và từ chối duyệt ngay nếu vi phạm.

---

### CỔNG 3: MEDIA & VIDEO NGẮN VIRAL (AGENT 2 $\rightarrow$ AGENT 5 $\rightarrow$ AGENT 9)
*Trước khi dựng video hoặc đưa kịch bản vào luồng render tự động n8n/CapCut:*
- [ ] **1. Hook 3 giây đầu tiên:** Đánh trúng trực diện nỗi đau hoặc nghịch lý bất an (mắt cay xè lúc nửa đêm, mở 20 tab đơ não, cảm giác tội lỗi sau khi lướt short video).
- [ ] **2. Tối ưu giọng đọc AI (TTS):** Lời thoại viết câu ngắn, ngắt nhịp thở rõ ràng, dùng từ ngữ mộc mạc, không dùng từ ngữ trúc trắc khiến máy đọc bị vấp.
- [ ] **3. Bản quyền âm nhạc (Tối quan trọng):** 100% nhạc nền là Lo-fi Ambient thuộc kho **No-Copyright Music** (miễn phí bản quyền thương mại). Tuyệt đối cấm nhạc thị trường dính bản quyền Meta/TikTok.
- [ ] **4. Cảnh quay B-roll:** Đúng phong cách Zen Faceless (bàn gỗ, phin cà phê nhỏ giọt, trang sách lật chậm, mưa rơi ngoài cửa sổ, góc tĩnh lặng). 100% footage từ Pexels/Pixabay miễn phí bản quyền thương mại.

---

### CỔNG 4: BÀI ĐĂNG FACEBOOK FANPAGE & REELS (AGENT 9 $\rightarrow$ AGENT 5)
*Trước khi kích hoạt luồng webhook n8n hoặc gọi Meta Graph API để publish lên Fanpage:*
- [ ] **1. Cấu trúc bài viết:** 2 dòng đầu có móc câu thị giác lôi cuốn; thân bài ngắt đoạn thoáng đãng 1-2 câu/dòng; dùng icon tối giản (🌿, ☕, 📖).
- [ ] **2. Quy tắc chống bóp tương tác (Anti-Suppression Rule):** **TUYỆT ĐỐI KHÔNG CHÈN LINK TRỰC TIẾP VÀO CAPTION BÀI ĐĂNG**. Link bài viết và link trắc nghiệm bắt buộc phải được đẩy tự động vào **Bình luận đầu tiên (First Comment)** sau khi post thành công.
- [ ] **3. Khung giờ vàng:** Đăng đúng khung giờ đã quy định (Quote Post: 07h00 - 08h00 sáng; Reels Video: 19h30 - 20h30 tối).
- [ ] **4. CTA nhẹ nhàng:** Không mang tính con buôn, chỉ dẫn dắt tự nhiên vào bài trắc nghiệm 25 câu để thấu hiểu bản thân.

---

## 🔒 CƠ CHẾ KHÓA CỨNG TỰ ĐỘNG HÓA TRƯỚC KHI BUILD (PRE-PUBLISH AUTOMATED GATE)

Để đảm bảo **không bao giờ có bài viết lỗi nào có thể lọt lên production**, hệ thống đã tích hợp trực tiếp script kiểm toán tự động vào lệnh build của toàn dự án (`package.json`):

```json
"scripts": {
  "build": "node scripts/audit_all_articles.js && next build"
}
```

### Script kiểm toán `scripts/audit_all_articles.js` tự động quét 100% kho bài viết trước mỗi lần build:
1. **Kiểm tra độ dài:** Đạt tối thiểu **2.500 từ**. Bài nào dưới 2.500 từ lập tức báo FAIL.
2. **Quét ký tự cấm:** Tự động phát hiện và chặn đứng:
   - Khối mã code ````mermaid````
   - Biểu đồ chữ ASCII (`╭───╮`, `▲`, `│`, `└──►`, `┌`, `└`)
   - Cú pháp bảng markdown thô (`| :--- |`)
   - Cú pháp toán LaTeX (`$$...$$`, `\mathbf`, `$\rightarrow$`)
3. **Quét vị trí Khối Điểm Chính:** Nếu khối `NHỮNG ĐIỂM CHÍNH` không nằm ở cuối cùng của bài viết => Lập tức báo FAIL.
4. **Quét file Thumbnail:**
   - File thumbnail phải tồn tại thực tế trên đĩa trong `public/images/articles/`.
   - Dung lượng file **bắt buộc <= 120KB**. Nếu vượt quá 120KB => Lập tức báo FAIL.

> ⛔ **Nguyên tắc cưỡng chế:** Nếu phát hiện dù chỉ 1 lỗi nhỏ trong bất kỳ bài viết nào, script kiểm toán sẽ thoát ngay lập tức với `process.exit(1)`. Lệnh `next build` bị hủy bỏ, ngăn chặn hoàn toàn việc deploy lên Vercel Production cho đến khi nhân sự sửa xong 100%!

---

## 📤 BIÊN BẢN PHÊ DUYỆT MẪU CỦA AGENT 5 (AUDIT REPORT)

Mỗi lần kiểm định, Agent 5 bắt buộc phải xuất biên bản theo định dạng sau trước khi cho phép xuất bản:

```markdown
### 🛡️ BIÊN BẢN KIỂM DUYỆT CHẤT LƯỢNG — AGENT 5 & MÂY
* **Sản phẩm kiểm tra:** [Tên bài viết / Video / Hình ảnh / Post Facebook]
* **Đơn vị thực hiện:** [Agent 1 / Agent 2 / Agent 8 / Agent 9]
* **Kênh dự kiến go-live:** [Website / Facebook Fanpage / Reels / TikTok]

| Tiêu Chuẩn Kiểm Định | Kết Quả | Ghi Chú Cụ Thể |
| :--- | :---: | :--- |
| Độ dài / Thời lượng | PASS / FAIL | [Chi tiết số từ / số giây] |
| Tiêu đề 2 dòng (Curiosity Hook) | PASS / FAIL | [Số ký tự, độ cuốn hút] |
| Vị trí Khối Điểm Chính | PASS / FAIL | [Đã ở cuối bài sau Lời nhắn gửi chưa?] |
| Phong cách Zen & 4 KHÔNG | PASS / FAIL | [Văn phong có bị giáo điều/từ trừu tượng?] |
| Visual & Watermark | PASS / FAIL | [Ảnh 16:9 WebP <120KB, dấu mờ ở góc] |
| Bản quyền âm thanh / Footage | PASS / FAIL | [100% No-Copyright] |
| SEO On-page / First Comment Link | PASS / FAIL | [Đạt chuẩn kỹ thuật] |

👉 **KẾT LUẬN CUỐI CÙNG:** [PASS 100% - CHO PHÉP GO-LIVE] HOẶC [FAIL - YÊU CẦU SỬA CÁC ĐIỂM: ...]
*Chữ ký phê duyệt:* Agent 5 (Kiểm toán trưởng) & Mây (Tổng biên tập)
```
