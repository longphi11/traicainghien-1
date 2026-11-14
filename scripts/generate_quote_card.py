import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

def create_washi_background(width=1080, height=1080):
    # Base warm washi paper color (#FAF7F2 = 250, 247, 242)
    base = Image.new("RGB", (width, height), (250, 247, 242))
    
    # 1. Natural paper grain
    np.random.seed(101)
    noise = np.random.normal(0, 3.8, (height, width, 3)).astype(np.float32)
    arr = np.array(base, dtype=np.float32)
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr)
    
    # 2. Subtle organic watercolor wash vignette
    vignette = Image.new("L", (width, height), 0)
    v_draw = ImageDraw.Draw(vignette)
    v_draw.ellipse([-width*0.25, -height*0.25, width*1.25, height*1.25], fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=120))
    
    # Slightly darker warm edges (#F0EAE1)
    edge_tint = Image.new("RGB", (width, height), (240, 234, 225))
    img = Image.composite(img, edge_tint, vignette)
    
    return img

def get_circular_avatar(size=56):
    totem_path = "public/images/logo-totem.png"
    if os.path.exists(totem_path):
        im = Image.open(totem_path).convert("RGB")
        im = im.resize((size, size), Image.Resampling.LANCZOS)
    else:
        im = Image.new("RGB", (size, size), (235, 222, 211))
        
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    output = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    output.paste(im, (0, 0), mask=mask)
    
    # Add border
    border_draw = ImageDraw.Draw(output)
    border_draw.ellipse((1, 1, size-2, size-2), outline=(194, 125, 83, 200), width=2) # #C27D53
    return output

def generate_quote_card(text_lines, font_name, output_path, font_size=56, line_spacing=26):
    width, height = 1080, 1080
    img = create_washi_background(width, height)
    draw = ImageDraw.Draw(img)
    
    # Colors
    text_color = (58, 90, 64)       # #3A5A40 - Forest Moss Green
    brand_title = (45, 74, 50)      # #2D4A32 - Deep Zen Green
    brand_sub = (120, 139, 123)     # #788B7B - Soft Sage Gray
    
    # Fonts
    font_path = os.path.join("assets/fonts", font_name)
    quote_font = ImageFont.truetype(font_path, font_size)
    brand_font = ImageFont.truetype("assets/fonts/BeVietnamPro-Medium.ttf", 26)
    handle_font = ImageFont.truetype("assets/fonts/BeVietnamPro-Medium.ttf", 20)
    
    # Bounding boxes
    line_bboxes = [draw.textbbox((0, 0), line, font=quote_font) for line in text_lines]
    line_heights = [bbox[3] - bbox[1] for bbox in line_bboxes]
    line_widths = [bbox[2] - bbox[0] for bbox in line_bboxes]
    
    total_height = sum(line_heights) + (len(text_lines) - 1) * line_spacing
    
    # Vertical centering (shifted up slightly for footer breathing space)
    start_y = (height - total_height) // 2 - 45
    
    # Draw quote lines
    curr_y = start_y
    for i, line in enumerate(text_lines):
        w = line_widths[i]
        x = (width - w) // 2
        draw.text((x, curr_y), line, font=quote_font, fill=text_color)
        curr_y += line_heights[i] + line_spacing
        
    # --- FOOTER BADGE (Centered at bottom) ---
    footer_y = height - 125
    badge_size = 54
    
    # Measure footer text width to center the whole group
    brand_str = "Trại Cai Nghiện"
    handle_str = "@traicainghien"
    
    b_box = draw.textbbox((0, 0), brand_str, font=brand_font)
    h_box = draw.textbbox((0, 0), handle_str, font=handle_font)
    text_group_w = max(b_box[2] - b_box[0], h_box[2] - h_box[0])
    
    total_footer_w = badge_size + 16 + text_group_w
    badge_x = (width - total_footer_w) // 2
    
    # Paste circular avatar
    avatar = get_circular_avatar(badge_size)
    img.paste(avatar, (badge_x, footer_y), mask=avatar)
    
    # Draw Brand texts
    text_x = badge_x + badge_size + 16
    draw.text((text_x, footer_y - 2), brand_str, font=brand_font, fill=brand_title)
    draw.text((text_x, footer_y + 30), handle_str, font=handle_font, fill=brand_sub)
    
    # Save image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "JPEG", quality=95)
    print(f"Generated: {output_path}")

# Curate quotes inspired by Tiny Buddha & Power of Positivity
quotes_data = [
    {
        "id": "mau_01_patrick_hand",
        "font": "PatrickHand-Regular.ttf",
        "size": 52,
        "spacing": 22,
        "lines": [
            "Bạn không cần phải kiểm soát mọi thứ.",
            "Đôi khi, điều dũng cảm nhất bạn có thể làm",
            "chỉ đơn giản là buông tay",
            "và thở một hơi thật sâu."
        ],
        "source": "Tiny Buddha"
    },
    {
        "id": "mau_02_mali_wabi_sabi",
        "font": "Mali-Medium.ttf",
        "size": 50,
        "spacing": 28,
        "lines": [
            "Nước đục để yên sẽ tự trong.",
            "Tâm trí mỏi mệt khi được nghỉ ngơi",
            "sẽ tự tìm lại bình yên."
        ],
        "source": "Trại Cai Nghiện"
    },
    {
        "id": "mau_03_caveat_handwriting",
        "font": "Caveat-Variable.ttf",
        "size": 64,
        "spacing": 22,
        "lines": [
            "Đừng để những ngày bận rộn",
            "cuốn trôi đi sự tĩnh lặng",
            "vốn dĩ luôn thuộc về bạn."
        ],
        "source": "Power of Positivity"
    },
    {
        "id": "mau_04_sriracha_brush",
        "font": "Sriracha-Regular.ttf",
        "size": 52,
        "spacing": 26,
        "lines": [
            "Sống chậm lại một nhịp,",
            "để nhận ra những điều bình dị",
            "vẫn đang lặng lẽ nở hoa quanh mình."
        ],
        "source": "Tiny Buddha"
    },
    {
        "id": "mau_05_itim_chalk",
        "font": "Itim-Regular.ttf",
        "size": 54,
        "spacing": 26,
        "lines": [
            "Không sao cả nếu hôm nay",
            "bạn chỉ làm được một việc duy nhất:",
            "là dịu dàng với chính mình."
        ],
        "source": "Power of Positivity"
    }
]

for q in quotes_data:
    out = f"public/images/quotes/{q['id']}.jpg"
    generate_quote_card(q["lines"], q["font"], out, font_size=q["size"], line_spacing=q["spacing"])

