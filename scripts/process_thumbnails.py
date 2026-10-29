import os
from PIL import Image, ImageDraw, ImageFont

FONT_PATH = "C:\\Windows\\Fonts\\segoeui.ttf"
if not os.path.exists(FONT_PATH):
    FONT_PATH = "C:\\Windows\\Fonts\\arial.ttf"

WATERMARK_FONT = ImageFont.truetype(FONT_PATH, 24)

def process_thumbnail(src_path, dst_path):
    """
    Resizes image to 1200x675 (16:9), adds delicate watermark '🌿 TRẠI CAI NGHIỆN',
    and saves as WebP (<120KB).
    """
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return False

    img = Image.open(src_path).convert("RGBA")
    img = img.resize((1200, 675), Image.Resampling.LANCZOS)

    # Create transparent overlay for watermark
    overlay = Image.new("RGBA", (1200, 675), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    text = "🌿 TRẠI CAI NGHIỆN"
    bbox = draw.textbbox((0, 0), text, font=WATERMARK_FONT)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    x = 1200 - text_w - 32
    y = 675 - text_h - 22

    # Draw soft shadow then light text
    draw.text((x + 1, y + 1), text, font=WATERMARK_FONT, fill=(20, 25, 20, 140))
    draw.text((x, y), text, font=WATERMARK_FONT, fill=(250, 247, 242, 210))

    # Composite overlay onto image
    final_img = Image.alpha_composite(img, overlay).convert("RGB")

    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    final_img.save(dst_path, format="WEBP", quality=85)
    
    file_size = os.path.getsize(dst_path)
    print(f"Saved: {dst_path} ({round(file_size / 1024, 1)} KB)")
    return True

if __name__ == "__main__":
    print("Thumbnail processor helper ready.")
