"""
TRẠI CAI NGHIỆN - QUOTE CARD ENGINE
Tạo ảnh Quote chuẩn Facebook/Instagram theo phong cách Xanh Lam kết hợp bộ nhận diện Trại Cai Nghiện.
"""

import os
import sys
import argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Default Colors
BG_WASHI = (250, 247, 242)      # #FAF7F2 - Warm Linen Beige
TEXT_MOSS = (58, 90, 64)        # #3A5A40 - Forest Moss Green
BRAND_DARK = (45, 74, 50)       # #2D4A32 - Deep Zen Green
BRAND_SAGE = (120, 139, 123)    # #788B7B - Soft Sage Gray
BORDER_TERRA = (194, 125, 83)   # #C27D53 - Warm Terracotta

FONTS_AVAILABLE = {
    "patrick": ("PatrickHand-Regular.ttf", 52, 22),
    "mali": ("Mali-Medium.ttf", 50, 26),
    "caveat": ("Caveat-Variable.ttf", 62, 20),
    "sriracha": ("Sriracha-Regular.ttf", 52, 26),
    "itim": ("Itim-Regular.ttf", 54, 24)
}

def create_washi_background(width=1080, height=1080):
    base = Image.new("RGB", (width, height), BG_WASHI)
    np.random.seed(random_seed := 101)
    noise = np.random.normal(0, 3.8, (height, width, 3)).astype(np.float32)
    arr = np.clip(np.array(base, dtype=np.float32) + noise, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr)
    
    vignette = Image.new("L", (width, height), 0)
    v_draw = ImageDraw.Draw(vignette)
    v_draw.ellipse([-width*0.25, -height*0.25, width*1.25, height*1.25], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=120))
    
    edge_tint = Image.new("RGB", (width, height), (240, 234, 225))
    return Image.composite(img, edge_tint, vignette)

def get_circular_avatar(size=54):
    totem_path = "public/images/logo-totem.png"
    if os.path.exists(totem_path):
        im = Image.open(totem_path).convert("RGB").resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new("RGB", (size, size), (235, 222, 211))
        
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    
    output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    output.paste(im, (0, 0), mask=mask)
    ImageDraw.Draw(output).ellipse((1, 1, size-2, size-2), outline=(*BORDER_TERRA, 200), width=2)
    return output

def render_quote(lines, font_choice="patrick", output_path="output_quote.jpg", custom_size=None):
    font_file, def_size, spacing = FONTS_AVAILABLE.get(font_choice.lower(), FONTS_AVAILABLE["patrick"])
    font_size = custom_size if custom_size else def_size
    
    width, height = 1080, 1080
    img = create_washi_background(width, height)
    draw = ImageDraw.Draw(img)
    
    font_path = os.path.join("assets/fonts", font_file)
    quote_font = ImageFont.truetype(font_path, font_size)
    brand_font = ImageFont.truetype("assets/fonts/BeVietnamPro-Medium.ttf", 26)
    handle_font = ImageFont.truetype("assets/fonts/BeVietnamPro-Medium.ttf", 20)
    
    line_bboxes = [draw.textbbox((0, 0), l, font=quote_font) for l in lines]
    line_heights = [b[3] - b[1] for b in line_bboxes]
    line_widths = [b[2] - b[0] for b in line_bboxes]
    
    total_h = sum(line_heights) + (len(lines) - 1) * spacing
    curr_y = (height - total_h) // 2 - 45
    
    for i, line in enumerate(lines):
        x = (width - line_widths[i]) // 2
        draw.text((x, curr_y), line, font=quote_font, fill=TEXT_MOSS)
        curr_y += line_heights[i] + spacing
        
    # Footer
    footer_y = height - 125
    badge_size = 54
    brand_str = "Trại Cai Nghiện"
    handle_str = "@traicainghien"
    
    b_box = draw.textbbox((0, 0), brand_str, font=brand_font)
    h_box = draw.textbbox((0, 0), handle_str, font=handle_font)
    text_w = max(b_box[2] - b_box[0], h_box[2] - h_box[0])
    
    total_footer_w = badge_size + 16 + text_w
    badge_x = (width - total_footer_w) // 2
    
    avatar = get_circular_avatar(badge_size)
    img.paste(avatar, (badge_x, footer_y), mask=avatar)
    
    text_x = badge_x + badge_size + 16
    draw.text((text_x, footer_y - 2), brand_str, font=brand_font, fill=BRAND_DARK)
    draw.text((text_x, footer_y + 30), handle_str, font=handle_font, fill=BRAND_SAGE)
    
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    img.save(output_path, "JPEG", quality=95)
    print(f"Đã tạo ảnh quote thành công: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Tạo ảnh Quote Trại Cai Nghiện")
    parser.add_argument("--text", "-t", type=str, help="Nội dung quote (dùng dấu gạch đứng | để xuống dòng)")
    parser.add_argument("--font", "-f", type=str, default="patrick", choices=list(FONTS_AVAILABLE.keys()), help="Chọn font")
    parser.add_argument("--out", "-o", type=str, default="public/images/quotes/quote_latest.jpg", help="Đường dẫn file xuất ra")
    
    args = parser.parse_args()
    if args.text:
        lines = [l.strip() for l in args.text.split("|") if l.strip()]
    else:
        lines = [
            "Đôi khi, điều dũng cảm nhất bạn có thể làm",
            "chỉ đơn giản là buông tay",
            "và thở một hơi thật sâu."
        ]
    render_quote(lines, font_choice=args.font, output_path=args.out)
