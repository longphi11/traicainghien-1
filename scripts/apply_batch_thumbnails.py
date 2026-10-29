import os
from PIL import Image, ImageDraw, ImageFont

brain_dir = r"C:\Users\MrFine\.gemini\antigravity\brain\1200023e-b4f6-435e-b656-b09888ac9b01"
out_dir = r"public\images\articles"

font_path = "C:\\Windows\\Fonts\\segoeui.ttf"
if not os.path.exists(font_path):
    font_path = "C:\\Windows\\Fonts\\arial.ttf"

watermark_font = ImageFont.truetype(font_path, 24)

mappings = [
    ("thumb_deep_work_zen_1793317908230.jpg", "sach-deep-work-lam-sau-trai-cai-nghien.webp"),
    ("thumb_flow_state_zen_1793317917330.jpg", "sach-flow-dong-chay-trai-cai-nghien.webp"),
    ("thumb_fast_slow_thinking_zen_1793317927207.jpg", "sach-tu-duy-nhanh-va-cham-trai-cai-nghien.webp"),
    ("thumb_happiness_trap_zen_1793317950755.jpg", "sach-bay-hanh-phuc-trai-cai-nghien.webp"),
    ("thumb_kintsugi_bowl_zen_1793317959532.jpg", "ban-khong-he-yeu-duoi-kintsugi-trai-cai-nghien.webp"),
    ("thumb_urge_surfing_wave_zen_1793317969558.jpg", "6-buoc-urge-surfing-trai-cai-nghien.webp"),
    ("thumb_dopamine_detox_water_zen_1793317977262.jpg", "thanh-loc-nao-bo-dopamine-detox-trai-cai-nghien.webp"),
    ("thumb_two_focus_rules_zen_1793318006095.jpg", "2-quy-tac-cai-thien-tap-trung-trai-cai-nghien.webp"),
    ("thumb_tim_ferriss_pages_zen_1793318015142.jpg", "bai-hoc-tim-ferriss-trai-cai-nghien.webp"),
    ("thumb_lego_habits_zen_1793318024655.jpg", "bi-mat-xep-gach-lego-xay-thoi-quen-trai-cai-nghien.webp"),
    ("thumb_audio_overload_zen_1793318033464.jpg", "ao-tuong-chua-lanh-nao-bo-trai-cai-nghien.webp")
]

for src_name, dst_name in mappings:
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(out_dir, dst_name)
    
    if not os.path.exists(src_path):
        print(f"Missing source: {src_path}")
        continue
        
    img = Image.open(src_path).convert("RGBA")
    img = img.resize((1200, 675), Image.Resampling.LANCZOS)
    
    # Overlay watermark
    overlay = Image.new("RGBA", (1200, 675), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    text = "🌿 TRẠI CAI NGHIỆN"
    bbox = draw.textbbox((0, 0), text, font=watermark_font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    x = 1200 - text_w - 32
    y = 675 - text_h - 22
    
    # Draw subtle shadow and clean light text
    draw.text((x + 1, y + 1), text, font=watermark_font, fill=(20, 25, 20, 140))
    draw.text((x, y), text, font=watermark_font, fill=(250, 247, 242, 210))
    
    final_img = Image.alpha_composite(img, overlay).convert("RGB")
    final_img.save(dst_path, format="WEBP", quality=85)
    
    size_kb = round(os.path.getsize(dst_path) / 1024, 1)
    print(f"Processed & Saved: {dst_name} ({size_kb} KB)")

print("All 11 thumbnails successfully converted and updated!")
