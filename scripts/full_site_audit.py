import sys
import re
import os

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Split articles by slug
slug_matches = list(re.finditer(r'"slug":\s*"([^"]+)"', content))
print(f"Tổng số bài viết tìm thấy: {len(slug_matches)}\n")

articles_info = []
for i in range(len(slug_matches)):
    start = slug_matches[i].start()
    end = slug_matches[i+1].start() if i + 1 < len(slug_matches) else content.find('export const articles = rawArticles')
    art_chunk = content[start:end]
    
    slug = slug_matches[i].group(1)
    
    # Title
    t_match = re.search(r'"title":\s*"((?:\\.|[^"\\])*)"', art_chunk)
    title = t_match.group(1).replace('\\"', '"') if t_match else 'N/A'
    
    # Thumbnail
    thumb_match = re.search(r'"thumbnail":\s*"([^"]+)"', art_chunk)
    thumb = thumb_match.group(1) if thumb_match else 'N/A'
    
    # Content: extract from "content": " to the end of the article object
    content_idx = art_chunk.find('"content":')
    if content_idx != -1:
        # starts after "content": "
        body_start = art_chunk.find('"', content_idx + 10) + 1
        # ends at the closing quote before the object closing or next field
        # We can find the last quote before the end of art_chunk
        body_end = art_chunk.rfind('"')
        body = art_chunk[body_start:body_end]
    else:
        body = ''
    
    # Word count estimation (Vietnamese word count)
    words = len(re.findall(r'\b\w+\b', body))
    
    # Title len
    t_len = len(title)
    
    # Check ASCII
    has_ascii = any(ch in body for ch in ['▲', '│', '╭──', '└──►', '┌──', '└──', '├─'])
    
    # Check raw tables
    has_raw_table = '| :--- |' in body or bool(re.search(r'\|.*?\|.*?\|\s*\\n\s*\|.*?:---', body))
    
    # Check Key Takeaways position
    kt_pos = -1
    for kw in ['NHỮNG ĐIỂM CHÍNH', 'KEY TAKEAWAYS']:
        p = body.find(kw)
        if p != -1:
            kt_pos = p
            break
    
    kt_at_bottom = True
    if kt_pos != -1:
        kt_ratio = kt_pos / max(len(body), 1)
        if kt_ratio < 0.65:
            kt_at_bottom = False
    else:
        kt_at_bottom = 'Missing'
        
    articles_info.append({
        'index': i + 1,
        'slug': slug,
        'title': title,
        'title_len': t_len,
        'thumb': thumb,
        'words': words,
        'has_ascii': has_ascii,
        'has_raw_table': has_raw_table,
        'kt_at_bottom': kt_at_bottom,
        'body_len': len(body)
    })

print("="*80)
print(f"{'STT':<4} | {'KẾT QUẢ':<8} | {'TIÊU ĐỀ':<52} | {'SỐ TỪ':<8} | {'DÀI T.ĐỀ':<8}")
print("="*80)

error_count = 0
for a in articles_info:
    issues = []
    
    # 1. Title length
    if a['title_len'] > 65:
        issues.append(f"Tiêu đề dài ({a['title_len']} ký tự, dễ tràn 2 dòng cắt '...')")
    elif a['title_len'] < 38:
        issues.append(f"Tiêu đề quá ngắn ({a['title_len']} ký tự)")
        
    # 2. ASCII Text Art
    if a['has_ascii']:
        issues.append("Chứa ký tự ASCII text art")
        
    # 3. Raw Tables
    if a['has_raw_table']:
        issues.append("Chứa bảng markdown thô (| :--- |)")
        
    # 4. Key Takeaways
    if a['kt_at_bottom'] is False:
        issues.append("Khối 'Những Điểm Chính' bị đặt ở đầu/giữa bài")
    elif a['kt_at_bottom'] == 'Missing':
        issues.append("Thiếu khối 'Những Điểm Chính'")
        
    # 5. Words
    if a['words'] < 2000:
        issues.append(f"Dung lượng chưa đạt ({a['words']} từ < 2.000 từ)")
        
    # 6. Thumbnail existence & format
    thumb_path = a['thumb'].lstrip('/')
    full_thumb_path = os.path.join('public', thumb_path)
    if not os.path.exists(full_thumb_path):
        issues.append(f"File thumbnail không tồn tại: {a['thumb']}")
    else:
        thumb_size_kb = os.path.getsize(full_thumb_path) / 1024
        if thumb_size_kb > 150:
            issues.append(f"Thumbnail nặng ({round(thumb_size_kb, 1)} KB > 120 KB)")

    if issues:
        error_count += 1
        status = "❌ CẦN SỬA"
    else:
        status = "✅ PASS"
        
    print(f"{a['index']:<4} | {status:<8} | {a['title'][:50]:<52} | {a['words']:<8} | {a['title_len']:<8}")
    if issues:
        for iss in issues:
            print(f"       👉 {iss}")
        print("-" * 80)

print("="*80)
print(f"TỔNG KẾT: {len(articles_info) - error_count}/{len(articles_info)} ĐẠT CHUẨN | {error_count} BÀI CẦN SỬA ĐỔI.")
