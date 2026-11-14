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

# Danh sách 5 nguồn tin học thuật & tâm lý học hành vi uy tín hàng đầu
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

def get_session_name():
    vn_tz = timezone(timedelta(hours=7))
    hour = datetime.now(vn_tz).hour
    if hour < 12:
        return "BẢN TIN SÁNG 08:30"
    elif hour < 18:
        return "BẢN TIN CHIỀU 15:00"
    else:
        return "BẢN TIN TỐI 20:30"

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
        print(f"📡 Đang quét nguồn: {src_name} ({feed_url})...")
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
    Tải toàn bộ HTML của bài báo gốc để bóc tách:
    1. Ảnh og:image chất lượng cao
    2. Toàn văn các đoạn văn bản (paragraphs) phục vụ phân tích chuyên sâu
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

            # Extract clean paragraphs (excluding nav, footer, ads)
            paras = re.findall(r'<p\b[^>]*>(.*?)</p>', page_html, re.I | re.DOTALL)
            clean_paras = []
            for p in paras:
                clean_p = re.sub(r'<[^>]+>', ' ', p).strip()
                clean_p = html.unescape(clean_p)
                clean_p = re.sub(r'\s+', ' ', clean_p)
                if len(clean_p) > 65 and not re.search(r'cookie|privacy policy|subscribe|sign up|all rights reserved|terms of service', clean_p, re.I):
                    clean_paras.append(clean_p)
            
            full_body = "\n\n".join(clean_paras[:12]) # Lấy 12 đoạn văn bản sâu sắc nhất
            
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

def synthesize_deep_bulletin_with_gemini(article, session_name=None):
    """
    Biên soạn bài viết phân tích chuyên sâu (Deep-dive Bulletin) trên 500 từ theo đúng linh hồn Trại Cai Nghiện.
    """
    if not session_name:
        session_name = get_session_name()

    prompt = f"""Bạn là Mây — AI Co-founder của Trại Cai Nghiện (traicainghien.com).
Nhiệm vụ: Hãy phân tích bài báo nghiên cứu tâm lý học / khoa học hành vi quốc tế dưới đây và biên soạn một BẢN TIN PHÂN TÍCH CHUYÊN SÂU CÓ ĐỘ DÀI TỐI THIỂU 520 TỪ ĐẾN TỐI ĐA 620 TỪ (tuyệt đối không viết ngắn dưới 500 từ).

THÔNG TIN BÀI BÁO GỐC:
- Nguồn: {article.get('source_name', 'Tâm lý học hành vi quốc tế')}
- Tiêu đề gốc: {article['title']}
- Tóm tắt gốc: {article.get('description', '')}
- Nội dung trích xuất chi tiết:
{article.get('body', '')[:3500]}
- Link bài gốc: {article['url']}

CẤU TRÚC BÀI VIẾT BẮT BUỘC (Đúng phong cách 'Nói chuyện cà phê nhưng trí tuệ viện nghiên cứu' của Trại Cai Nghiện):
1. Tiêu đề tiếng Việt sắc bén, chạm đúng nỗi đau xao nhãng / thói quen đời thường (In hoa, hấp dẫn).
2. Dẫn nhập & Đặt vấn đề đời sống (Khoảng 80 - 100 từ): Miêu tả cảm giác bất lực, dằn vặt khi muốn tập trung nhưng tay tự động với lấy điện thoại, lướt short video hoặc trì hoãn. Khẳng định: bạn không hề lười hay yếu đuối, não bộ chỉ đang phản ứng với bẫy kích thích sai cách.
3. Cơ chế khoa học não bộ từ nghiên cứu (Khoảng 120 - 150 từ): Phân tích cặn kẽ cơ chế sinh học thần kinh (Dopamine nền, thùy trán Prefrontal Cortex, hạch hạnh nhân Amygdala, hoặc các nguyên lý tâm lý học hành vi từ bài gốc).
4. 3 Bài học / Chiêm nghiệm đắt giá (Mỗi điểm phân tích sâu sắc từ 80 - 110 từ):
   - Luận điểm 1: Bẫy hành vi ngầm mà người trẻ thường mắc phải.
   - Luận điểm 2: Vì sao ý chí thô kệch luôn thua thiết kế môi trường.
   - Luận điểm 3: Giải phóng khỏi mặc cảm tội lỗi & tự từ bi (Self-compassion theo Wabi-Sabi).
5. Bài tập thực hành vi mô 1% (Kaizen Action - Khoảng 70 - 90 từ): 2-3 hành động cụ thể có thể làm ngay trong 2 phút (như quy tắc 2 mét, làm sạch điểm nhìn, nhịn 60 giây).
6. Một câu đúc kết triết lý sống bình an và nhắc nhở ấm áp.

QUY TẮC ĐỊNH DẠNG HTML CỦA TELEGRAM:
- Chỉ sử dụng các thẻ HTML an toàn: <b>, <i>, <a>, <code>.
- Tuyệt đối KHÔNG dùng Markdown (*, **, #).
- Tổng độ dài bài viết BẮT BUỘC nằm trong khoảng 520 - 620 từ tiếng Việt (khoảng 2800 - 3600 ký tự) để đảm bảo chiều sâu học thuật và không vượt quá giới hạn 4096 ký tự của Telegram.

HÃY XUẤT BẢN TOÀN BỘ NỘI DUNG BÀI VIẾT BẰNG TIẾNG VIỆT (KHÔNG KÈM LỜI DẪN THỪA CỦA AI):"""

    system_instruction = """Bạn là Mây — AI Co-founder của Trại Cai Nghiện. Phong cách: Trái tim thấu cảm, không phán xét, ngôn từ đời thường mộc mạc kết hợp nền tảng khoa học thần kinh và triết lý Wabi-Sabi. Tuân thủ nghiêm ngặt độ dài tối thiểu 520 từ."""
    
    generated_text = generate_content(prompt, system_instruction)
    if not generated_text:
        raise ValueError("Gemini returned empty response")

    # Clean markdown code blocks if any
    clean_text = generated_text.strip()
    if clean_text.startswith("```html"):
        clean_text = clean_text[7:]
    elif clean_text.startswith("```"):
        clean_text = clean_text[3:]
    if clean_text.endswith("```"):
        clean_text = clean_text[:-3]
    clean_text = clean_text.strip()

    # Build Header and Footer
    source_display = article.get('source_name', 'Quốc tế')
    article_link = article['url']
    photo_url = article['image']

    header = f'<a href="{photo_url}">&#8205;</a>🌿 <b>TRẠI CAI NGHIỆN DAILY • {session_name}</b>\n' \
             f'🧠 <b>[PHÂN TÍCH CHUYÊN SÂU • TÂM LÝ HỌC &amp; HÀNH VI]</b>\n\n'

    footer = f'\n\n📖 <i>Nghiên cứu gốc từ: <a href="{article_link}">{source_display}</a></i>\n\n' \
             f'======\n' \
             f'🌿 <b>Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn</b>\n' \
             f'<a href="https://traicainghien.com">Website</a> | ' \
             f'<a href="https://traicainghien.com/trac-nghiem">Trắc nghiệm Dopamine</a> | ' \
             f'<a href="https://www.facebook.com/traicainghienvn2026">Fanpage</a>'

    full_message = header + clean_text + footer

    # Check length
    w_count = count_words(full_message)
    c_count = len(full_message)
    print(f"📊 Kết quả đếm: {w_count} từ | {c_count} ký tự (Giới hạn Telegram: 4096 ký tự)")

    # Smart trimming if ever exceeding 4080 chars
    while len(full_message) > 4080:
        lines = clean_text.rsplit("\n", 1)
        if len(lines) > 1:
            clean_text = lines[0]
            full_message = header + clean_text + footer
        else:
            full_message = full_message[:4080] + "..."
            break

    return full_message

def send_telegram_deep_message(photo_url, message_text):
    """
    Gửi tin nhắn chuyên sâu (>500 từ) kèm hiển thị ảnh lớn phía trên bài viết qua sendMessage Telegram API.
    """
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHANNEL_ID,
        "text": message_text,
        "parse_mode": "HTML",
        "link_preview_options": {
            "url": photo_url,
            "show_above_text": True,
            "prefer_large_media": True
        }
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
            print(f"✅ GỬI THÀNH CÔNG BẢN TIN CHUYÊN SÂU! Message ID: {msg_id}")
            print(f"🔗 Xem bài tại: https://t.me/traicainghiendaily/{msg_id}")
            return res
        else:
            print(f"❌ Telegram trả về lỗi: {res}")
            return None

def run_daily_news_pipeline(dry_run=False, force_url=None):
    print("==================================================================")
    print("🚀 CHẠY LUỒNG BẢN TIN DAILY ĐA NGUỒN CHUYÊN SÂU (FLOW 01 - UPGRADED)")
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
                if info and info.get("image") and len(info.get("body", "")) > 300:
                    selected_article = info
                    selected_article["source_name"] = cand["source_name"]
                    break
                else:
                    print(f"    (Bài thiếu ảnh hoặc nội dung quá ngắn, chuyển bài tiếp theo)")

    if not selected_article:
        print("❌ Không tìm thấy bài viết mới nào thỏa mãn điều kiện có ảnh và bài viết chi tiết!")
        return False

    print(f"\n✅ ĐÃ CHỌN ĐƯỢC BÀI VIẾT PHÙ HỢP:")
    print(f"   • Tiêu đề: {selected_article['title']}")
    print(f"   • Nguồn: {selected_article.get('source_name')}")
    print(f"   • URL: {selected_article['url']}")
    print(f"   • Ảnh gốc: {selected_article['image']}")
    print(f"   • Độ dài thân bài trích xuất: {len(selected_article.get('body', ''))} ký tự\n")

    print("🤖 Đang dùng Gemini AI phân tích chuyên sâu (> 500 từ) theo công thức Trại Cai Nghiện...")
    deep_message = synthesize_deep_bulletin_with_gemini(selected_article)

    print("\n--- PREVIEW NỘI DUNG BẢN TIN TRÊN TELEGRAM ---")
    print(deep_message[:1200] + "\n... [phần còn lại] ...\n")
    print(f"Độ dài tổng: {count_words(deep_message)} từ | {len(deep_message)} ký tự\n")

    if dry_run:
        print("Chế độ Dry-run: Bỏ qua bước phát sóng lên Telegram.")
        return True

    print(f"📢 Đang phát sóng bài phân tích chuyên sâu lên kênh Telegram {CHANNEL_ID}...")
    result = send_telegram_deep_message(selected_article["image"], deep_message)
    if result:
        history.append(selected_article["url"])
        save_history(history)
        print("🎉 Bản tin đã được xuất bản và lưu lịch sử thành công!")
        return True
    return False

if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    run_daily_news_pipeline(dry_run=dry_run)
