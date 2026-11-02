import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import re
from PIL import Image
import numpy as np

print("🎨 [AGENT 8 & AGENT 5] ĐANG KIỂM TOÁN TÍNH ĐỘC BẢN THỊ GIÁC (VISUAL PERCEPTUAL AUDIT)...")

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'\{\s*["\']slug["\']:\s*["\']([^"\']+)["\'][\s\S]*?["\']title["\']:\s*["\']([^"\']+)["\'][\s\S]*?["\']thumbnail["\']:\s*["\']([^"\']+)["\']'
matches = re.findall(pattern, content)

images = []
for slug, title, thumb in matches:
    path = os.path.join('public', thumb.lstrip('/'))
    if os.path.exists(path):
        img = Image.open(path).convert('RGB').resize((64, 64))
        arr = np.array(img, dtype=float)
        images.append({
            'slug': slug,
            'title': title,
            'thumb': thumb,
            'path': path,
            'arr': arr
        })
    else:
        print(f"❌ [LỖI THUMBNAIL THIẾU] {path} không tồn tại!")
        sys.exit(1)

# Lọc các bài không thuộc mục Sách Hay (vì sách hay dùng chung layout 3D book mockup theo lệnh bố)
non_sach_images = [img for img in images if not img['slug'].startswith(('review-sach', 'doc-sach', 'doc-cau-chuyen'))]

has_conflicts = False
for i in range(len(non_sach_images)):
    for j in range(i + 1, len(non_sach_images)):
        a1 = non_sach_images[i]
        a2 = non_sach_images[j]
        diff = np.mean(np.abs(a1['arr'] - a2['arr']))
        # Nếu độ lệch pixel trung bình < 15.0 -> Coi như trùng lặp thị giác
        if diff < 15.0:
            print(f"\n❌ [LỖI ĐỎ TRÙNG LẶP THỊ GIÁC - LỆNH ĐẶC BIỆT CỦA BỐ]")
            print(f"   Độ tương đồng quá cao (Difference = {diff:.2f} < 15.0) giữa 2 bài:")
            print(f"   1. [{a1['slug']}] {a1['title']}")
            print(f"      Thumbnail: {a1['thumb']}")
            print(f"   2. [{a2['slug']}] {a2['title']}")
            print(f"      Thumbnail: {a2['thumb']}")
            print(f"   👉 YÊU CẦU: Agent 8 bắt buộc phải tạo tác phẩm nghệ thuật độc bản hoàn toàn mới!")
            has_conflicts = True

if has_conflicts:
    print("\n⛔ [KẾT LUẬN] KIỂM TOÁN THỊ GIÁC THẤT BẠI (VISUAL AUDIT FAILED)! Cấm xuất bản khi còn ảnh trùng lặp.")
    sys.exit(1)
else:
    print(f"✅ [XÁC NHẬN ĐỘC BẢN] 100% ({len(non_sach_images)}/{len(non_sach_images)}) bài viết sở hữu hình ảnh độc bản hoàn toàn riêng biệt. Không có bài nào bị trùng lặp!")
    sys.exit(0)
