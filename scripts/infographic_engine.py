"""
INFOGRAPHIC ENGINE CHUẨN HOÁ - TRẠI CAI NGHIỆN
Công cụ tạo sơ đồ / infographic bảo đảm 100% không bao giờ bị cắt chữ (Anti-Clipping Guardrail)
Quy chuẩn thiết lập:
- Kích thước chuẩn: 1200 x 740 px
- Nền giấy mộc sần hạt: #FAF7F2
- Bảng màu: Xanh rêu (#3A5A40), Đất nung (#C27D53), Gạch cổ (#A44A3F), Xám than (#2D312E)
- Mọi trường chữ bắt buộc được kiểm toán bounding box trước khi render. Vượt quá -> Ném Exception ngay!
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont
import os

FONT_DIR = "C:/Windows/Fonts"

def get_font(name="arial.ttf", size=14):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)

def check_text_bounds(text, font, max_width, label=""):
    bbox = font.getbbox(text)
    w = bbox[2] - bbox[0]
    if w > max_width:
        raise ValueError(f"❌ [LỖI TRÀN CHỮ] '{label}' ('{text}') có độ dài {w}px, vượt quá chiều rộng khung cho phép ({max_width}px)!")
    return w

def wrap_text(text, font, max_width):
    words = text.split()
    lines = []
    current_line = ""
    for w in words:
        test = current_line + " " + w if current_line else w
        bbox = font.getbbox(test)
        if (bbox[2] - bbox[0]) <= max_width:
            current_line = test
        else:
            if current_line:
                lines.append(current_line)
            current_line = w
    if current_line:
        lines.append(current_line)
    return lines
