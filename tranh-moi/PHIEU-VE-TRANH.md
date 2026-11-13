# 🎨 PHIẾU VẼ TRANH — 3 tác phẩm gỡ chặn build

> Bố chỉ cần làm 3 việc: **mở app Gemini → dán prompt → lưu ảnh vào đúng thư mục này với đúng tên file.**

---

## Bước 1 — Mở app Gemini

Vào https://gemini.google.com → chọn chế độ tạo ảnh (Nano Banana).
Mỗi ngày app cho vài ảnh miễn phí. Nếu hết lượt, bố để hôm sau vẽ tiếp, con chờ.

**Yêu cầu chung khi vẽ (dán kèm vào cuối mỗi prompt nếu cần):**
> `landscape 16:9 aspect ratio, no text, no letters, no watermark`

---

## Bước 2 — Dán 3 prompt này (mỗi prompt 1 ảnh)

### 🖼️ ẢNH 1 → lưu tên: `cai-nghien-brain-rot-chua-lanh-bo-nao-20261111.jpg`

```
Hand-painted zen watercolour illustration on rough cold-press paper, visible paper
grain and fibres, wet-on-wet pigment blooms bleeding into the paper, thin charcoal
sumi-e ink contour lines, muted palette of forest green, warm beige paper and
terracotta. Scene: early dawn in a pine forest, a young Vietnamese man in his mid
twenties wearing a simple beige linen shirt, kneeling at the edge of a clear rocky
stream, cupping cold water to wash his face, eyes closed and calm; behind him on a
mossy stone lies his smartphone face down, screen dark and forgotten. Soft mist
between the pines, warm light spilling low across the water. Contemporary, grounded,
peaceful. Landscape 16:9, no text, no letters, no watermark.
```

**Vì sao cảnh này:** bài viết nói về *cai nghiện brain rot, rửa lại bộ não đang bị nhũn vì short video* — nên hình ảnh là **rửa mặt bằng nước suối lạnh, điện thoại úp xuống bị bỏ lại phía sau**.

---

### 🖼️ ẢNH 2 → lưu tên: `van-may-an-trong-thoi-quen-atomic-habits-20261112.jpg`

```
Hand-painted zen watercolour illustration on rough cold-press paper, visible paper
grain and fibres, wet-on-wet pigment blooms bleeding into the paper, thin charcoal
sumi-e ink contour lines, muted palette of forest green, warm beige paper and
terracotta. Scene: a quiet grassy hillside path at sunrise, a young Vietnamese woman
in her late twenties wearing a soft earth-toned cardigan, walking slowly up the slope
while pressing a small wooden marker stake into the ground beside the trail; a handful
of small stone cairns line the path behind her, each one slightly taller than the
last, marking one small step at a time. Distant layered hills fade into morning haze,
long soft shadows across the grass. Contemporary, patient, hopeful. Landscape 16:9,
no text, no letters, no watermark.
```

**Vì sao cảnh này:** bài viết nói về *1% mỗi ngày, vận may ẩn trong thói quen, thung lũng thất vọng* — nên hình ảnh là **cắm cọc đánh dấu từng bước nhỏ trên con dốc, các đống đá nhỏ cao dần phía sau**.

---

### 🖼️ ẢNH 3 → lưu tên: `thoat-khoi-brain-rot-lay-lai-su-tap-trung-dinh-cao-20261112.jpg`

```
Hand-painted zen watercolour illustration on rough cold-press paper, visible paper
grain and fibres, wet-on-wet pigment blooms bleeding into the paper, thin charcoal
sumi-e ink contour lines, muted palette of forest green, warm beige paper and
terracotta. Scene: an empty roadside bus shelter at late dusk, a young Vietnamese
woman in her mid twenties sitting alone on the wooden bench, her phone placed face
down on the seat beside her, screen off; she is looking up and away at the wide
evening sky where the last amber light fades behind distant rooftops and trees. A
bicycle leans against the shelter post, a light jacket folded on her lap. Quiet,
spacious, a mind finally at rest. Landscape 16:9, no text, no letters, no watermark.
```

**Vì sao cảnh này:** bài viết nói về *quẹt TikTok vô thức 2 tiếng, bẫy dopamine, lấy lại sự tập trung* — nên hình ảnh là **điện thoại úp xuống ở trạm xe buýt chiều tà, mắt nhìn lên bầu trời thay vì nhìn màn hình**.

---

## Bước 3 — Báo con

Khi đã lưu đủ 3 ảnh vào thư mục `tranh-moi` này, bố nhắn con một câu: **"xong tranh rồi"**.

Con sẽ tự chạy:

```
python scripts/generate_zen_thumbnails.py --from-inbox tranh-moi --update
node scripts/audit_all_articles.js
```

rồi cắt đúng 1200×675, nén dưới 120KB, đóng watermark `🌿 TRẠI CAI NGHIỆN`, gán vào 3 bài, kiểm toán, và đẩy lên web.

---

## Nếu ảnh bị từ chối

Con không nhận ảnh nếu:
- Quá giống ảnh đã có trên web (lệch < 15.0 điểm) → con báo tên bài bị giống, bố vẽ lại cảnh khác.
- Ra phong cách digital art / 3D / vector thay vì màu nước → con báo, bố thêm chữ `watercolour on textured paper` vào prompt.
- Có chữ hoặc watermark lạ trên ảnh → con báo, bố vẽ lại.

Con **không** tự thay bằng ảnh khác, không dùng vector, đúng lệnh bố.
