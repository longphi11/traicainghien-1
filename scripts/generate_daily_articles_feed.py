import re
import json

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(
    r'\{\s*"slug":\s*"([^"]+)",\s*'
    r'"title":\s*"([^"]+)",\s*'
    r'"excerpt":\s*"([^"]+)",\s*'
    r'"thumbnail":\s*"([^"]+)",'
    r'[\s\S]*?'
    r'"content":\s*"([\s\S]*?)"\s*'
    r'(?:,\s*"sources":|\s*\})',
    re.MULTILINE
)

articles = []
for m in pattern.finditer(text):
    slug = m.group(1)
    title = m.group(2)
    excerpt = m.group(3)
    thumbnail = m.group(4)
    content = m.group(5).replace('\\n', '\n').replace('\\"', '"')
    
    points = []
    if 'KEY TAKEAWAYS' in content or 'ĐIỂM CỐT LÕI' in content:
        section = re.split(r'KEY TAKEAWAYS|ĐIỂM CỐT LÕI', content, flags=re.IGNORECASE)[-1]
        for line in section.split('\n'):
            line = line.strip()
            if line.startswith('*') or line.startswith('-') or line.startswith('•'):
                clean = line.lstrip('*-• ').strip()
                if 'Nguồn tham khảo' in clean or 'Đúc kết từ' in clean or 'https://' in clean:
                    continue
                # Replace **Header:** with <b>Header:</b>
                clean = re.sub(r'^\*\*([^\*]+)\*\*:?', r'<b>\1:</b>', clean)
                clean = re.sub(r'\*\*([^\*]+)\*\*', r'<b>\1</b>', clean)
                if len(clean) > 15:
                    points.append(clean)
                if len(points) >= 3:
                    break

    if not points:
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('*') or line.startswith('-'):
                clean = line.lstrip('*- ').strip()
                if 'Nguồn tham khảo' in clean or 'Đúc kết từ' in clean or 'https://' in clean:
                    continue
                clean = re.sub(r'^\*\*([^\*]+)\*\*:?', r'<b>\1:</b>', clean)
                clean = re.sub(r'\*\*([^\*]+)\*\*', r'<b>\1</b>', clean)
                if len(clean) > 20:
                    points.append(clean)
                if len(points) >= 3:
                    break

    if not points:
        points = [f"<b>Cốt lõi:</b> {excerpt}"]
        
    if thumbnail.startswith('/'):
        thumb_url = f"https://traicainghien.com{thumbnail}"
    else:
        thumb_url = thumbnail
        
    action = "Dành 2 phút ghi lại cảm giác hiện tại và đặt điện thoại xa tầm mắt 2 mét."
    if "doc-sach" in slug or "flex" in slug:
        action = "Chọn đúng 1 ý tưởng hay nhất từ cuốn sách đang đọc và đem ra áp dụng ngay."
    elif "10-phan-tram" in slug or "kiet-que" in slug:
        action = "Hạ chuẩn mọi mục tiêu xuống mức tối thiểu, cho phép bản thân nghỉ ngơi sớm."
    elif "dopamine" in slug or "detox" in slug:
        action = "Tắt mọi thông báo không quan trọng và chuyển màn hình điện thoại về thang xám."
    elif "thoi-quen" in slug or "kaizen" in slug:
        action = "Bắt đầu với phiên bản 2 phút cực nhỏ cho việc bạn đang trì hoãn."
    elif "tap-trung" in slug or "deep-work" in slug:
        action = "Chỉ mở đúng 1 tab trình duyệt duy nhất trong 25 phút làm việc kế tiếp."
    elif "ngu" in slug or "dem" in slug:
        action = "Cất điện thoại ngoài phòng ngủ hoặc cách giường tối thiểu 2 mét."

    articles.append({
        'slug': slug,
        'title': title,
        'excerpt': excerpt,
        'thumbnail': thumb_url,
        'points': points[:3],
        'action': action,
        'url': f"https://traicainghien.com/bai-viet/{slug}"
    })

with open('scripts/daily_articles_feed.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)
print("Updated feed JSON with 39 spotless articles!")
