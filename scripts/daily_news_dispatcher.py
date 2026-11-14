import urllib.request
import urllib.parse
import re
import json
import os
import sys
import time
import html
from datetime import datetime, timezone, timedelta
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

# Ensure working directory is project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from scripts.gemini_client import generate_content

HISTORY_FILE = os.path.join(BASE_DIR, "scripts", "daily_news_history.json")
BOT_TOKEN = "9249970693:AAFnHi-ZCx7N576orPkdMqapeRLWfHQLH6Q"
CHANNEL_ID = "-1004488309634" # @traicainghiendaily

# Danh sách 5 nguồn tin học thuật & tâm lý học hành vi uy tín hàng đầu thế giới
INTERNATIONAL_SOURCES = [
    {
        "name": "Psychology Today (Science of Choice)",
        "feed": "https://www.psychologytoday.com/us/blog/science-choice/feed",
        "domain": "psychologytoday.com",
        "topic": "Hành vi gây nghiện, tâm lý ra quyết định & thói quen"
    },
    {
        "name": "Psychology Today (The Athlete's Way)",
        "feed": "https://www.psychologytoday.com/us/blog/the-athletes-way/feed",
        "domain": "psychologytoday.com",
        "topic": "Khoa học thần kinh, Dopamine & rèn luyện thể chất/tâm trí"
    },
    {
        "name": "Behavioral Scientist",
        "feed": "https://behavioralscientist.org/feed/",
        "domain": "behavioralscientist.org",
        "topic": "Kiến trúc lựa chọn (Choice Architecture), Cú hích (Nudge) & Bẻ gãy thói quen xấu"
    },
    {
        "name": "Ness Labs",
        "feed": "https://nesslabs.com/feed",
        "domain": "nesslabs.com",
        "topic": "Khoa học thần kinh về sự tập trung, năng suất chánh niệm & chữa lành não bộ"
    },
    {
        "name": "Greater Good Science Center (UC Berkeley)",
        "feed": "https://greatergood.berkeley.edu/rss",
        "domain": "berkeley.edu",
        "topic": "Tâm lý học thực chứng, kiểm soát sự chú ý (Attention Control) & Self-compassion"
    },
    {
        "name": "Farnam Street (Brain Food)",
        "feed": "https://fs.blog/feed/",
        "domain": "fs.blog",
        "topic": "Mô hình tư duy (Mental Models), Kỷ luật tự thân & Làm việc sâu (Deep Work)"
    }
]

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return []
    return []

def save_history(history):
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history[-300:], f, ensure_ascii=False, indent=2)

def count_words(text):
    clean = re.sub(r'<[^>]*>', ' ', text or '')
    clean = html.unescape(clean)
    return len(clean.strip().split())

def fetch_all_candidate_articles():
    """
    Quét qua toàn bộ 5 nguồn quốc tế uy tín để lấy danh sách bài viết ứng viên mới nhất.
    """
    candidates = []
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

    for src in INTERNATIONAL_SOURCES:
        feed_url = src["feed"]
        src_name = src["name"]
        print(f"📡 Đang quét nguồn: {src_name}...")
        try:
            req = urllib.request.Request(feed_url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                xml_data = resp.read()
                root = ET.fromstring(xml_data)
                items = root.findall('.//item')
                print(f"   -> Tìm thấy {len(items)} bài viết từ {src_name}.")
                for it in items[:10]:
                    title_elem = it.find('title')
                    link_elem = it.find('link')
                    desc_elem = it.find('description')
                    
                    title = title_elem.text.strip() if title_elem is not None and title_elem.text else ''
                    link = link_elem.text.strip() if link_elem is not None and link_elem.text else ''
                    desc = desc_elem.text.strip() if desc_elem is not None and desc_elem.text else ''
                    
                    if link:
                        candidates.append({
                            "source_name": src_name,
                            "domain": src["domain"],
                            "topic": src["topic"],
                            "title": title,
                            "link": link,
                            "description": desc
                        })
        except Exception as e:
            print(f"   ⚠️ Lỗi quét nguồn {src_name}: {e}")

    return candidates

def extract_article_full_content(article_url):
    """
    Tải HTML bài báo gốc để bóc tách ảnh og:image và toàn văn các đoạn văn bản.
    """
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(article_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            page_html = resp.read().decode('utf-8', errors='ignore')
            
            # Extract og:image
            og_img = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', page_html, re.I)
            if not og_img:
                og_img = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', page_html, re.I)
            
            image_url = og_img.group(1).strip() if og_img else ""
            if not image_url or not image_url.startswith("http"):
                return None

            # Extract og:title & og:description
            og_title = re.search(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']', page_html, re.I)
            og_desc = re.search(r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']+)["\']', page_html, re.I)
            
            title = og_title.group(1).strip() if og_title else ""
            desc = og_desc.group(1).strip() if og_desc else ""

            # Extract clean paragraphs
            paras = re.findall(r'<p\b[^>]*>(.*?)</p>', page_html, re.I | re.DOTALL)
            clean_paras = []
            for p in paras:
                clean_p = re.sub(r'<[^>]+>', ' ', p).strip()
                clean_p = html.unescape(clean_p)
                clean_p = re.sub(r'\s+', ' ', clean_p)
                if len(clean_p) > 65 and not re.search(r'cookie|privacy policy|subscribe|sign up|all rights reserved', clean_p, re.I):
                    clean_paras.append(clean_p)
            
            full_body = "\n\n".join(clean_paras[:8])
            
            return {
                "url": article_url,
                "title": title,
                "description": desc,
                "image": image_url,
                "body": full_body
            }
    except Exception as e:
        print(f"Lỗi bóc tách bài {article_url}: {e}")
        return None

def synthesize_bulletin_150_words(article):
    """
    Biên soạn bản tin cô đọng khoảng 150 từ (chuẩn Telegram sendPhoto dưới 1024 ký tự).
    """
    prompt = f"""Bạn là Mây — AI Co-founder của Trại Cai Nghiện (traicainghien.com).
Nhiệm vụ: Hãy phân tích bài báo nghiên cứu tâm lý học / khoa học hành vi quốc tế dưới đây và biên soạn BẢN TIN TELEGRAM CÔ ĐỌNG KHOẢNG 140 ĐẾN 160 TỪ (tổng ký tự bắt buộc DƯỚI 950 ký tự để vừa vặn trong caption ảnh Telegram sendPhoto).

THÔNG TIN BÀI BÁO GỐC:
- Nguồn: {article.get('source_name', 'Tâm lý học hành vi quốc tế')}
- Tiêu đề gốc: {article['title']}
- Tóm tắt: {article.get('description', '')}
- Nội dung trích xuất:
{article.get('body', '')[:2500]}

CẤU TRÚC BẢN TIN BẮT BUỘC (Trả về đúng cấu trúc sau bằng tiếng Việt):
👉 <b>[Tiêu đề tiếng Việt ngắn gọn, hấp dẫn]</b>

[1 đoạn mở đầu 2 câu: Đặt vấn đề chạm đúng nỗi đau xao nhãng đời thường, vỗ về người đọc rằng họ không hề lười hay thiếu kỷ luật, não bộ chỉ đang phản ứng tự nhiên].

📌 <b>3 Cơ chế cần nhớ:</b>
• <b>[Điểm 1]:</b> [Giải thích ngắn gọn 1 câu về cơ chế não bộ/dopamine].
• <b>[Điểm 2]:</b> [Giải thích ngắn gọn 1 câu về bẫy kích thích/thói quen].
• <b>[Điểm 3]:</b> [Giải thích ngắn gọn 1 câu về giải pháp môi trường/tâm lý].

💡 <b>Kaizen 1%:</b> [Hành động vi mô 2 phút có thể làm ngay].

🌱 <i>"[1 câu danh ngôn triết lý ngắn gọn, sâu sắc]"</i>

QUY TẮC BẮT BUỘC:
- Định dạng HTML Telegram: chỉ dùng <b>, <i>, <a>.
- Tuyệt đối giữ tổng độ dài phần bạn viết trong khoảng 130 - 150 từ để khi ghép header và footer không vượt quá 1000 ký tự."""

    system_instruction = "Bạn là Mây của Trại Cai Nghiện. Phong cách: Thấu cảm, mộc mạc, khoa học, súc tích. Tuyệt đối tuân thủ độ dài khoảng 140-150 từ."
    
    generated_text = generate_content(prompt, system_instruction)
    if not generated_text:
        raise ValueError("Gemini returned empty response")

    clean_body = generated_text.strip()
    if clean_body.startswith("```html"):
        clean_body = clean_body[7:]
    elif clean_body.startswith("```"):
        clean_body = clean_body[3:]
    if clean_body.endswith("```"):
        clean_body = clean_body[:-3]
    clean_body = clean_body.strip()

    header = "🌿 <b>TRẠI CAI NGHIỆN DAILY</b>\n🧠 <b>[TÂM LÝ HỌC &amp; HÀNH VI]</b>\n\n"
    footer = f"\n\n📖 <a href=\"{article['url']}\">Bài gốc</a> · 🌿 <a href=\"https://traicainghien.com\">Trại Cai Nghiện</a>"

    caption = header + clean_body + footer

    # Smart truncation fallback if > 1024
    if len(caption) > 1024:
        clean_body_trimmed = clean_body[:(1020 - len(header) - len(footer) - 5)]
        last_nl = clean_body_trimmed.rfind("\n")
        if last_nl > 50:
            clean_body = clean_body_trimmed[:last_nl]
        caption = header + clean_body + footer

    w_count = count_words(caption)
    print(f"📊 Độ dài bản tin: {w_count} từ | {len(caption)} ký tự (Giới hạn: 1024)")
    return caption

def send_telegram_photo_bulletin(photo_url, caption):
    """
    Gửi ảnh gốc của bài báo và bản tin 150 từ lên Telegram channel qua sendPhoto.
    """
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
    payload = {
        "chat_id": CHANNEL_ID,
        "photo": photo_url,
        "caption": caption,
        "parse_mode": "HTML"
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=25) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        if res.get("ok"):
            msg_id = res['result']['message_id']
            print(f"✅ GỬI THÀNH CÔNG BẢN TIN 150 TỪ QUA SENDPHOTO! Message ID: {msg_id}")
            print(f"🔗 Xem bài tại: https://t.me/traicainghiendaily/{msg_id}")
            return res
        else:
            print(f"❌ Telegram trả về lỗi: {res}")
            return None

def run_daily_news_pipeline(dry_run=False, force_url=None):
    print("==================================================================")
    print("🚀 CHẠY LUỒNG BẢN TIN DAILY 150 TỪ KÈM ẢNH GỐC NATIVE (FLOW 01)")
    print("==================================================================")
    
    history = load_history()
    print(f"Đã tải {len(history)} bài viết trong lịch sử chống trùng.")
    
    candidates = fetch_all_candidate_articles()
    print(f"Tổng hợp được {len(candidates)} bài viết ứng viên từ 5 nguồn quốc tế.")
    
    selected_article = None
    if force_url:
        print(f"Chỉ định URL cụ thể: {force_url}")
        info = extract_article_full_content(force_url)
        if info:
            selected_article = info
            selected_article["source_name"] = "Nghiên cứu quốc tế chọn lọc"
    else:
        for cand in candidates:
            url = cand["link"]
            if url not in history:
                print(f" -> Đang kiểm tra bài: '{cand['title']}' ({cand['source_name']})")
                info = extract_article_full_content(url)
                if info and info.get("image") and len(info.get("body", "")) > 200:
                    selected_article = info
                    selected_article["source_name"] = cand["source_name"]
                    break

    if not selected_article:
        print("❌ Không tìm thấy bài viết mới nào thỏa mãn điều kiện!")
        return False

    print(f"\n✅ ĐÃ CHỌN ĐƯỢC BÀI VIẾT PHÙ HỢP:")
    print(f"   • Tiêu đề: {selected_article['title']}")
    print(f"   • Nguồn: {selected_article.get('source_name')}")
    print(f"   • URL: {selected_article['url']}")
    print(f"   • Ảnh gốc: {selected_article['image']}\n")

    print("🤖 Đang biên soạn bản tin cô đọng khoảng 150 từ...")
    caption = synthesize_bulletin_150_words(selected_article)

    print("\n--- NỘI DUNG BẢN TIN TRÊN TELEGRAM ---")
    print(caption)
    print("--------------------------------------\n")

    if dry_run:
        print("Chế độ Dry-run: Bỏ qua bước phát sóng lên Telegram.")
        return True

    print(f"📢 Đang phát sóng bài viết 150 từ lên kênh Telegram {CHANNEL_ID}...")
    result = send_telegram_photo_bulletin(selected_article["image"], caption)
    if result:
        history.append(selected_article["url"])
        save_history(history)
        print("🎉 Bản tin đã được xuất bản và lưu lịch sử thành công!")
        return True
    return False

if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    run_daily_news_pipeline(dry_run=dry_run)
