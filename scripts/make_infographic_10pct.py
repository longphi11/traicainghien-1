"""
INFOGRAPHIC ENGINE - GIÁO ÁN HỒI PHỤC KHI NĂNG LƯỢNG CHỈ CÒN 10%
Anti-clipping guaranteed, safe bounds check, 1200x740 WebP <150KB
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont
import os

FONT_DIR = "C:/Windows/Fonts"

def get_font(name="arial.ttf", size=14, bold=False):
    font_file = "arialbd.ttf" if bold else "arial.ttf"
    try:
        return ImageFont.truetype(os.path.join(FONT_DIR, font_file), size)
    except:
        return ImageFont.truetype(os.path.join(FONT_DIR, "arial.ttf"), size)

def check_bounds(text, font, max_w, label=""):
    bbox = font.getbbox(text)
    w = bbox[2] - bbox[0]
    if w > max_w:
        raise ValueError(f"❌ [CLIPPING ERROR] '{label}' ('{text}') width {w}px > max {max_w}px!")
    return w

def wrap_text(text, font, max_w):
    words = text.split()
    lines = []
    curr = ""
    for w in words:
        test = curr + " " + w if curr else w
        bbox = font.getbbox(test)
        if (bbox[2] - bbox[0]) <= max_w:
            curr = test
        else:
            if curr:
                lines.append(curr)
            curr = w
    if curr:
        lines.append(curr)
    return lines

WIDTH, HEIGHT = 1200, 740
img = Image.new("RGB", (WIDTH, HEIGHT), "#FAF7F2")
draw = ImageDraw.Draw(img)

# Outer border
draw.rectangle([20, 20, WIDTH - 20, HEIGHT - 20], outline="#E6E1D8", width=2)
draw.rectangle([26, 26, WIDTH - 26, HEIGHT - 26], outline="#D1C7B7", width=1)

# Colors
C_DARK = "#2D312E"
C_MOSS = "#3A5A40"
C_EARTH = "#C27D53"
C_MUTED = "#6B7280"
C_BG_CARD = "#FFFFFF"

# 1. Header
font_tag = get_font(size=13, bold=True)
font_title = get_font(size=22, bold=True)
font_sub = get_font(size=14, bold=False)

tag_text = "🌿 QUẢN TRỊ CẢM XÚC • NGHỆ THUẬT TỰ CHỮA LÀNH"
check_bounds(tag_text, font_tag, 900, "Tag")
tag_w = font_tag.getbbox(tag_text)[2] - font_tag.getbbox(tag_text)[0]
draw.text(((WIDTH - tag_w) // 2, 50), tag_text, fill=C_MOSS, font=font_tag)

title_text = "GIÁO ÁN HỒI PHỤC: KHI NĂNG LƯỢNG CHỈ CÒN 10%"
check_bounds(title_text, font_title, 950, "Title")
title_w = font_title.getbbox(title_text)[2] - font_title.getbbox(title_text)[0]
draw.text(((WIDTH - title_w) // 2, 80), title_text, fill=C_DARK, font=font_title)

sub_text = "Cách làm việc cho một tâm trí đang đau - Không bỏ cuộc, không tự trừng phạt"
check_bounds(sub_text, font_sub, 900, "Subtitle")
sub_w = font_sub.getbbox(sub_text)[2] - font_sub.getbbox(sub_text)[0]
draw.text(((WIDTH - sub_w) // 2, 118), sub_text, fill=C_EARTH, font=font_sub)

# Divider line
draw.line([(WIDTH // 2 - 120, 150), (WIDTH // 2 + 120, 150)], fill=C_EARTH, width=2)

# 2. Four Cards Layout
CARD_W = 250
CARD_H = 460
CARD_Y = 175
MARGIN_X = 70
GAP_X = 20

cards_data = [
    {
        "step": "BƯỚC 1",
        "title": "THỪA NHẬN TỔN THƯƠNG",
        "tag": "Bỏ Tiếng Còi Phạt",
        "bullets": [
            "Xem vết thương tinh thần như một chiếc chân đau.",
            "Ngừng lấy giáo án ngày 100% áp lên ngày kiệt quệ.",
            "Không so sánh mình với những người đang chạy trên mạng."
        ]
    },
    {
        "step": "BƯỚC 2",
        "title": "KHỞI ĐỘNG CƠ THỂ",
        "tag": "Làm Ấm Tinh Thần",
        "bullets": [
            "Không lôi mình ra bàn làm việc bằng sự cưỡng ép thô bạo.",
            "Pha một ấm trà nóng, rửa cái cốc, dọn góc bàn 5 phút.",
            "Cho phép mình chạm vào một niềm vui nhỏ không deadline."
        ]
    },
    {
        "step": "BƯỚC 3",
        "title": "GIÁO ÁN 30 PHÚT",
        "tag": "Gấp Sổ Lo Âu",
        "bullets": [
            "Đóng danh sách cả mùa giải lại khi sự ngợp thở ập đến.",
            "Hỏi đúng một câu: Việc nhỏ nhất làm được trong 30 phút là gì?",
            "Làm xong 30 phút là chiến thắng, không cần làm quá sức."
        ]
    },
    {
        "step": "BƯỚC 4",
        "title": "KIỂM TRA THỂ LỰC",
        "tag": "Đo Đúng Căn Nguyên",
        "bullets": [
            "Rất nhiều ngày tinh thần tệ, thật ra là cơ thể bị bỏ đói.",
            "Kiểm tra lại: Đêm qua ngủ mấy tiếng? Đã ăn uống đủ nước chưa?",
            "Dùng trọn vẹn 10% năng lượng, đó chính là 100% của hôm nay."
        ]
    }
]

font_step = get_font(size=12, bold=True)
font_card_title = get_font(size=14, bold=True)
font_card_tag = get_font(size=12, bold=True)
font_bullet = get_font(size=13, bold=False)

for i, c in enumerate(cards_data):
    cx = MARGIN_X + i * (CARD_W + GAP_X)
    
    draw.rounded_rectangle([cx + 3, CARD_Y + 3, cx + CARD_W + 3, CARD_Y + CARD_H + 3], radius=10, fill="#E8E2D7")
    draw.rounded_rectangle([cx, CARD_Y, cx + CARD_W, CARD_Y + CARD_H], radius=10, fill=C_BG_CARD, outline="#D1C7B7", width=1)
    
    header_h = 75
    draw.rounded_rectangle([cx, CARD_Y, cx + CARD_W, CARD_Y + header_h], radius=10, fill="#F4EFE6")
    draw.rectangle([cx, CARD_Y + header_h - 10, cx + CARD_W, CARD_Y + header_h], fill="#F4EFE6")
    draw.line([(cx, CARD_Y + header_h), (cx + CARD_W, CARD_Y + header_h)], fill="#E0D6C3", width=1)
    
    check_bounds(c["step"], font_step, CARD_W - 20, f"Card {i+1} Step")
    step_w = font_step.getbbox(c["step"])[2] - font_step.getbbox(c["step"])[0]
    draw.text((cx + (CARD_W - step_w) // 2, CARD_Y + 14), c["step"], fill=C_EARTH, font=font_step)
    
    check_bounds(c["title"], font_card_title, CARD_W - 20, f"Card {i+1} Title")
    ctitle_w = font_card_title.getbbox(c["title"])[2] - font_card_title.getbbox(c["title"])[0]
    draw.text((cx + (CARD_W - ctitle_w) // 2, CARD_Y + 38), c["title"], fill=C_DARK, font=font_card_title)
    
    tag_badge = f"• {c['tag']} •"
    check_bounds(tag_badge, font_card_tag, CARD_W - 20, f"Card {i+1} Tag")
    tag_badge_w = font_card_tag.getbbox(tag_badge)[2] - font_card_tag.getbbox(tag_badge)[0]
    draw.text((cx + (CARD_W - tag_badge_w) // 2, CARD_Y + header_h + 16), tag_badge, fill=C_MOSS, font=font_card_tag)
    
    draw.line([(cx + 30, CARD_Y + header_h + 38), (cx + CARD_W - 30, CARD_Y + header_h + 38)], fill="#EAE3D2", width=1)
    
    by = CARD_Y + header_h + 52
    for b_idx, bullet in enumerate(c["bullets"]):
        draw.text((cx + 18, by), "•", fill=C_EARTH, font=font_bullet)
        lines = wrap_text(bullet, font_bullet, CARD_W - 44)
        for line in lines:
            check_bounds(line, font_bullet, CARD_W - 40, f"Card {i+1} B{b_idx+1}")
            draw.text((cx + 32, by), line, fill=C_DARK, font=font_bullet)
            by += 21
        by += 10

# 3. Footer
font_footer = get_font(size=12, bold=False)
footer_text = "🌿 TRẠI CAI NGHIỆN • traicainghien.com • Dốc hết 10% năng lượng hôm nay chính là 100%"
check_bounds(footer_text, font_footer, 800, "Footer")
footer_w = font_footer.getbbox(footer_text)[2] - font_footer.getbbox(footer_text)[0]
draw.text(((WIDTH - footer_w) // 2, HEIGHT - 55), footer_text, fill=C_MUTED, font=font_footer)

output_path = "public/images/articles/so-do-giao-an-10-phan-tram-nang-luong.webp"
img.save(output_path, "WEBP", quality=90)
sz = os.path.getsize(output_path)
print(f"✅ Infographic created: {output_path} ({sz//1024} KB)")
if sz > 150 * 1024:
    raise ValueError(f"Infographic exceeds 150KB: {sz} bytes")
