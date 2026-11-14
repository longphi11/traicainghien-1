import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/sample_quotes', exist_ok=True)

# Kích thước chuẩn tỉ lệ 4:5 (1080 x 1350) - chiếm trọn màn hình điện thoại lướt Facebook/Insta
width, height = 1080, 1350

# Màu nền: Màu giấy thô Washi ngà ấm (#FAF7F2)
bg_color = (250, 247, 242)
text_color = (45, 49, 46)      # Xám than trầm sang trọng
sub_color = (194, 125, 83)      # Sắc đất nung ấm (#C27D53)
border_color = (216, 208, 197)  # Viền be nhạt tinh tế

img = Image.new('RGB', (width, height), color=bg_color)
draw = ImageDraw.Draw(img)

# Khung viền thanh lịch
draw.rectangle([(40, 40), (width - 40, height - 40)], outline=border_color, width=2)
draw.rectangle([(50, 50), (width - 50, height - 50)], outline=border_color, width=1)

# Font chữ (dùng Palatino Linotype hoặc Georgia trên Windows để có chất thơ, sang trọng)
font_paths = [
    'C:/Windows/Fonts/pala.ttf',     # Palatino Linotype
    'C:/Windows/Fonts/georgia.ttf',  # Georgia
    'C:/Windows/Fonts/times.ttf'     # Times New Roman
]
font_main_path = 'C:/Windows/Fonts/georgia.ttf'
for fp in font_paths:
    if os.path.exists(fp):
        font_main_path = fp
        break

font_brand = ImageFont.truetype(font_main_path, 28)
font_quote = ImageFont.truetype(font_main_path, 42)
font_sub = ImageFont.truetype(font_main_path, 30)

# 1. Header: Tên thương hiệu
brand_text = "T R Ạ M   T Í C H   C Ự C"
bbox_b = draw.textbbox((0, 0), brand_text, font=font_brand)
bw = bbox_b[2] - bbox_b[0]
draw.text(((width - bw) / 2, 120), brand_text, fill=sub_color, font=font_brand)

# Dấu gạch chỉ nhỏ
draw.line([(width/2 - 30, 180), (width/2 + 30, 180)], fill=sub_color, width=2)

# 2. Nội dung trích dẫn (Việt hóa từ Power of Positivity)
quote_lines = [
    "“Bạn không cần phải cố gắng",
    "chứng minh giá trị của mình",
    "với bất kỳ ai.",
    "",
    "Một bông hoa nở rộ",
    "không phải để gây ấn tượng",
    "với người qua đường.",
    "",
    "Nó nở,",
    "đơn giản vì đó là bản chất của nó.”"
]

# Vẽ các dòng ở giữa ảnh
start_y = 380
line_height = 68

for i, line in enumerate(quote_lines):
    if line.strip():
        bbox = draw.textbbox((0, 0), line, font=font_quote)
        lw = bbox[2] - bbox[0]
        draw.text(((width - lw) / 2, start_y + i * line_height), line, fill=text_color, font=font_quote)

# 3. Footer: Nguồn & Lời nhắn
footer_text = "— Đừng so sánh, hãy cứ là chính mình."
bbox_f = draw.textbbox((0, 0), footer_text, font=font_sub)
fw = bbox_f[2] - bbox_f[0]
draw.text(((width - fw) / 2, 1150), footer_text, fill=(120, 125, 120), font=font_sub)

# Watermark nhỏ chân trang
handle_text = "@tramtichcuc.vn"
bbox_h = draw.textbbox((0, 0), handle_text, font=font_brand)
hw = bbox_h[2] - bbox_h[0]
draw.text(((width - hw) / 2, 1220), handle_text, fill=(180, 175, 168), font=font_brand)

output_path = 'public/sample_quotes/power_of_positivity_vietnamese_demo.png'
img.save(output_path, quality=95)
print(f"Rendered demo image successfully: {output_path}")
