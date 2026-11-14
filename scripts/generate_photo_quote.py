import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 1. Load screenshot
src_path = 'C:/Users/MrFine/.gemini/antigravity/brain/7f7afb35-eb57-4ca8-a53c-25e1c43cdff9/.user_uploaded/media_1794408415904_a074194e.jpg'
src = Image.open(src_path)

# Crop the content image (removing FB post header: avatar, name "Power of Positivity", 12 phút...)
# Header is roughly ~60px
crop_box = (5, 60, src.width - 5, src.height - 5)
post_img = src.crop(crop_box)

# Target high-resolution canvas: 1080 x 1350 (4:5 ratio)
target_w, target_h = 1080, 1350
canvas = Image.new('RGB', (target_w, target_h), (18, 18, 18))

# Resize post image to fill bottom/middle part
aspect = post_img.width / post_img.height
new_w = target_w
new_h = int(new_w / aspect)
post_resized = post_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Paste at the bottom
canvas.paste(post_resized, (0, target_h - new_h))

# Create a dark gradient overlay at top to smoothly blend and hide English text
overlay = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
draw_ov = ImageDraw.Draw(overlay)

# Gradient from y=0 to y=850
for y in range(850):
    if y < 450:
        alpha = 245 # Almost solid dark at very top
    elif y < 700:
        # Fade down
        alpha = int(245 - (y - 450) * (200 / 250))
    else:
        alpha = int(45 - (y - 700) * (45 / 150))
    alpha = max(0, min(255, alpha))
    draw_ov.line([(0, y), (target_w, y)], fill=(15, 15, 15, alpha))

canvas = Image.alpha_composite(canvas.convert('RGBA'), overlay).convert('RGB')
draw = ImageDraw.Draw(canvas)

# Fonts
font_path = 'C:/Windows/Fonts/georgia.ttf'
if not os.path.exists(font_path):
    font_path = 'C:/Windows/Fonts/times.ttf'

font_quote = ImageFont.truetype(font_path, 48)
font_brand = ImageFont.truetype(font_path, 26)

# Vietnamese translation of the exact quote
vn_lines = [
    "Tôi thật sự thích cảm giác được ở nhà.",
    "Trong không gian của riêng mình.",
    "Thoải mái, bình yên.",
    "Không bị vây quanh bởi bất kỳ ai."
]

# Draw Vietnamese quote
start_y = 260
line_height = 80
for i, line in enumerate(vn_lines):
    bbox = draw.textbbox((0, 0), line, font=font_quote)
    lw = bbox[2] - bbox[0]
    draw.text(((target_w - lw) / 2, start_y + i * line_height), line, fill=(255, 255, 255), font=font_quote)

# Draw watermark at bottom
brand_text = "@TRAMTICHCUC.VN"
bbox_b = draw.textbbox((0, 0), brand_text, font=font_brand)
bw = bbox_b[2] - bbox_b[0]
draw.text(((target_w - bw) / 2, 1260), brand_text, fill=(220, 220, 220), font=font_brand)

output_file = 'public/sample_quotes/cozy_photo_quote_demo.png'
canvas.save(output_file, quality=95)
print(f"Generated successfully: {output_file}")
