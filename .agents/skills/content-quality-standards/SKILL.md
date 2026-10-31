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

### CỔNG 1: BÀI VIẾT NỘI DUNG WEBSITE (AGENT 1 $\rightarrow$ AGENT 5 $\rightarrow$ AGENT 4)
*Trước khi Agent 4 đưa vào `src/data/articles.ts`, build tĩnh và push Git, Agent 5 phải rà soát:*
- [ ] **1. Độ dài chuẩn:** Đạt tối thiểu **2.500 từ** (đếm từ thực tế, không tính code hay cú pháp rác).
- [ ] **2. Tiêu đề chuẩn 2 dòng (Curiosity Hook):** Độ dài vàng **50 – 62 ký tự**. Vừa khít 2 dòng ở box card ngoài, tuyệt đối không bị cắt cụt ba chấm `...`.
- [ ] **3. Vị trí khối "Những Điểm Chính":** Bắt buộc nằm ở **dưới cùng bài viết**, ngay sau *"Lời nhắn gửi từ Trại Cai Nghiện"*. Tuyệt đối không đặt ở đầu bài.
- [ ] **4. Quy tắc 4 KHÔNG:** Không phán xét đạo đức/lười biếng; không dùng từ ngữ self-help sáo rỗng (*tần số rung động, chuyển hóa đỉnh cao*); không kết án vấp ngã; không lý thuyết suông.
- [ ] **5. Văn phong thực chiến:** Chuẩn *"Nói chuyện cà phê vỉa hè nhưng trí tuệ viện nghiên cứu"* (Street-Smart Academic). Dẫn chứng đời thực (ngón tay quẹt 2h sáng cay xè mắt, bát phở 30k, chiếc điện thoại úp mặt).
- [ ] **6. Móc câu giữ chân (Retention):** Giữ nhịp câu biến hóa, có câu hỏi lửng (Open Loops) giữa các phần.
- [ ] **7. SEO On-page:** Từ khóa xuất hiện tự nhiên trong Title, Slug, H1, H2; Meta Excerpt 140 - 160 ký tự; có ít nhất 2 - 3 link nội bộ và nút CTA dẫn tới bài trắc nghiệm.

---

### CỔNG 2: THỊ GIÁC & HÌNH ẢNH VISUAL (AGENT 8 $\rightarrow$ AGENT 5)
*Trước khi bất kỳ hình ảnh nào được gắn vào bài viết web hoặc làm cover media:*
- [ ] **1. Mỹ cảm Zen Minimalist:** Đúng bảng màu nhận diện (Xanh rêu `#3A5A40`, Be ấm `#FAF7F2`, Đất nung `#C27D53`). Cảm giác mộc mạc Á Đông, bình yên, không lòe loẹt.
- [ ] **2. Bản quyền & Độc bản:** Không dùng ảnh mạng vi phạm bản quyền. Hình ảnh phải được sinh ra từ tư duy ẩn dụ triết học / đời thực đúng với chủ đề bài viết.
- [ ] **3. Dấu chìm thương hiệu (Watermark):** Bắt buộc đóng dấu mờ tinh tế ở góc phải ảnh: **`🌿 TRẠI CAI NGHIỆN`** (Opacity 30% - 35%), vừa bảo vệ thương hiệu vừa không gây phân tâm.
- [ ] **4. Kỹ thuật SEO Hình Ảnh:** Tỷ lệ chuẩn **16:9** (`1200x675px`), định dạng **WebP**, dung lượng tối ưu **dưới 120KB**, tên file chứa từ khóa không dấu ngăn cách bằng gạch nối (`tu-khoa-trai-cai-nghien.webp`), đầy đủ thẻ `alt`.

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
