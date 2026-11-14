import urllib.request
import urllib.parse
import json
import re
import html
import sys

sys.stdout.reconfigure(encoding='utf-8')

BOT_TOKEN = "9249970693:AAFnHi-ZCx7N576orPkdMqapeRLWfHQLH6Q"
CHANNEL_ID = "-1004488309634" # @traicainghiendaily

def decode_entities(val):
    return html.unescape(val or '').strip()

def clean_text(val):
    clean = re.sub(r'<[^>]*>', ' ', val or '')
    clean = decode_entities(clean)
    return re.sub(r'\s+', ' ', clean).strip()

def truncate(val, max_len):
    chars = list(val or '')
    if len(chars) > max_len:
        return ''.join(chars[:max_len - 1]) + '…'
    return ''.join(chars)

def escape_html(val):
    return html.escape(val or '', quote=True)

def fetch_rss_candidates():
    # Thử lấy bài mới nhất từ Psychology Today feed
    feeds = [
        'https://www.psychologytoday.com/us/blog/science-choice/feed',
        'https://www.psychologytoday.com/us/blog/the-athletes-way/feed',
        'https://www.psychologytoday.com/us/blog/brain-waves/feed'
    ]
    import xml.etree.ElementTree as ET
    for feed_url in feeds:
        try:
            req = urllib.request.Request(feed_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as r:
                root = ET.fromstring(r.read())
                items = root.findall('.//item')
                candidates = []
                for it in items:
                    t = it.find('title').text if it.find('title') is not None else ''
                    l = it.find('link').text if it.find('link') is not None else ''
                    d = it.find('description').text if it.find('description') is not None else ''
                    if l:
                        candidates.append({'title': t, 'link': l, 'description': d})
                if candidates:
                    return candidates
        except Exception as e:
            print(f"Feed {feed_url} error: {e}")
    return []

def extract_meta(page_html, prop_name):
    match = re.search(rf'<meta[^>]+property=[\'"]{prop_name}[\'"][^>]+content=[\'"]([^\'"]+)[\'"]', page_html, re.I)
    if not match:
        match = re.search(rf'<meta[^>]+content=[\'"]([^\'"]+)[\'"][^>]+property=[\'"]{prop_name}[\'"]', page_html, re.I)
    return decode_entities(match.group(1)) if match else ''

def extract_paragraphs(page_html):
    matches = re.findall(r'<p\b[^>]*>(.*?)</p>', page_html, re.I | re.DOTALL)
    valid_p = []
    for m in matches:
        text = clean_text(m)
        if len(text) > 70 and not re.search(r'subscribe|sign up|privacy policy|cookie', text, re.I):
            valid_p.append(text)
    return ' '.join(valid_p[:2])

def prepare_and_send():
    print("1. Đang quét bài viết mới nhất từ Psychology Today...")
    candidates = fetch_rss_candidates()
    if not candidates:
        print("Không tìm thấy bài viết RSS nào!")
        return False

    selected_post = None
    for cand in candidates:
        link = cand['link']
        print(f" -> Kiểm tra bài: {cand['title']} ({link})")
        try:
            req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=10) as r:
                page_html = r.read().decode('utf-8')
        except Exception as e:
            print(f"    Lỗi tải bài: {e}")
            continue

        og_image = extract_meta(page_html, 'og:image')
        if not og_image:
            print("    Không có og:image -> bỏ qua bài này theo quy chuẩn.")
            continue

        title = clean_text(cand['title'] or extract_meta(page_html, 'og:title'))
        summary = clean_text(cand['description']) or clean_text(extract_meta(page_html, 'og:description')) or extract_paragraphs(page_html)

        selected_post = {
            'link': link,
            'title': title,
            'summary': summary,
            'photo': og_image
        }
        break

    if not selected_post:
        print("Không tìm được bài viết hợp lệ có og:image!")
        return False

    print("\n2. Chuẩn bị định dạng bài viết chuẩn Flow 01...")
    parsed_link = urllib.parse.urlparse(selected_post['link'])
    source_host = parsed_link.hostname.replace('www.', '') if parsed_link.hostname else 'psychologytoday.com'
    safe_title = escape_html(truncate(selected_post['title'], 150))
    safe_summary = escape_html(truncate(selected_post['summary'], 360))

    session_name = "BẢN TIN ĐÊM 22:00 (BẢN KIỂM THỬ LIVE FLOW 01)"
    prefix = f"🌿 <b>TRẠI CAI NGHIỆN DAILY • {session_name}</b>\n\n" \
             f"🧠 <b>[TÂM LÝ HỌC &amp; HÀNH VI]</b>\n" \
             f"👉 <b>{safe_title}</b>\n\n"

    summary_label = "📰 <b>Điểm đáng chú ý từ nghiên cứu gốc:</b>\n"
    action = "\n\n💡 <b>Gợi ý hôm nay:</b>\n" \
             "Đọc phần phương pháp và kết luận trong bài gốc trước khi áp dụng lời khuyên cho mình.\n\n"

    suffix = f'📖 <a href="{escape_html(selected_post["link"])}">Đọc bài gốc tại {escape_html(source_host)}</a>\n\n' \
             f"🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>\n" \
             f'<a href="https://traicainghien.com">Website</a> · ' \
             f'<a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm Dopamine</a>'

    safe_summary_text = safe_summary or 'Nguồn RSS không có đoạn tóm tắt; bạn có thể xem chi tiết tại bài gốc.'
    caption = f"{prefix}{summary_label}{safe_summary_text}{action}{suffix}"

    while len(caption) > 1024 and len(safe_summary_text) > 24:
        safe_summary_text = truncate(safe_summary_text, max(24, len(safe_summary_text) - 40))
        caption = f"{prefix}{summary_label}{safe_summary_text}{action}{suffix}"

    print(f" -> Ảnh gốc: {selected_post['photo']}")
    print(f" -> Độ dài Caption: {len(caption)} ký tự (Giới hạn Telegram: 1024)")
    print("\n=== NỘI DUNG BẢN TIN TRÊN TELEGRAM ===")
    print(caption)
    print("======================================\n")

    print("3. Đang gửi bài viết tới kênh Telegram @traicainghiendaily...")
    send_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
    payload = {
        'chat_id': CHANNEL_ID,
        'photo': selected_post['photo'],
        'caption': caption,
        'parse_mode': 'HTML'
    }

    req_tg = urllib.request.Request(
        send_url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )

    try:
        with urllib.request.urlopen(req_tg, timeout=15) as resp:
            res_data = json.loads(resp.read().decode('utf-8'))
            if res_data.get('ok'):
                msg_id = res_data['result']['message_id']
                print(f"✅ GỬI THÀNH CÔNG LÊN TELEGRAM! Message ID: {msg_id}")
                print(f"🔗 Xem bài tại: https://t.me/traicainghiendaily/{msg_id}")
                return True
            else:
                print(f"❌ Telegram trả về lỗi: {res_data}")
                return False
    except Exception as e:
        print(f"❌ Lỗi gửi Telegram: {e}")
        return False

if __name__ == '__main__':
    prepare_and_send()
