import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import time
import urllib.request
import urllib.error
import urllib.parse
from youtube_content_miner import get_best_video_content, save_processed_id
from generate_omnichannel_article import build_article_from_video, NoUniqueThumbnailError
from website_article_publisher import insert_article_to_website, git_commit_and_push

def get_env_variable(var_name):
    if os.environ.get(var_name):
        return os.environ.get(var_name)
    env_paths = [".env.local", "/root/traicainghien/.env.local"]
    for ep in env_paths:
        if os.path.exists(ep):
            try:
                with open(ep, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith(f"{var_name}="):
                            return line.split("=", 1)[1].strip('"\'')
            except:
                pass
    return ""

BOT_TOKEN = get_env_variable("TELEGRAM_BOT_TOKEN")
CHANNEL_ID = get_env_variable("TELEGRAM_CHANNEL_ID") or "-1004488309634"
PAGE_ID = get_env_variable("FB_PAGE_ID") or "1232949796570940"

def get_page_token():
    env_file = ".env.local"
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("FB_PAGE_ACCESS_TOKEN="):
                    return line.split("=")[1].strip()
    return os.environ.get("FB_PAGE_ACCESS_TOKEN", "")

def send_telegram_announcement(photo_url, caption, attempts=2):
    """
    Sends photo with caption to Telegram channel (thu lai 1 lan neu loi mang).
    """
    if photo_url.startswith("/"):
        photo_url = "https://traicainghien.com" + photo_url

    last_err = None
    for attempt in range(1, attempts + 1):
        try:
            post_data = urllib.parse.urlencode({
                'chat_id': CHANNEL_ID,
                'photo': photo_url,
                'caption': caption,
                'parse_mode': 'HTML'
            }).encode('utf-8')

            url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
            req = urllib.request.Request(url, data=post_data, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=25) as resp:
                res = json.loads(resp.read().decode())
                print("Telegram post published successfully:", res.get("ok"))
                return True
        except Exception as e:
            last_err = e
            print(f"Telegram broadcast error (lan {attempt}/{attempts}):", e)
            if attempt < attempts:
                time.sleep(5)

    print("Telegram broadcast FAILED:", last_err)
    return False

def publish_facebook_fanpage(photo_url, fb_post, slug, attempts=3):
    """
    Publishes photo post directly to Facebook Fanpage with narrative caption & first comment.
    """
    page_token = get_page_token()
    if not page_token:
        print("❌ Missing FB_PAGE_ACCESS_TOKEN!")
        return False
        
    if photo_url.startswith("/"):
        photo_url = "https://traicainghien.com" + photo_url
        
    article_url = f"https://traicainghien.com/bai-viet/{slug}"

    last_err = None
    for attempt in range(1, attempts + 1):
        try:
            post_data = urllib.parse.urlencode({
                'url': photo_url,
                'caption': fb_post,
                'access_token': page_token,
                'published': 'true'
            }).encode('utf-8')

            url = f"https://graph.facebook.com/v20.0/{PAGE_ID}/photos"
            req = urllib.request.Request(url, data=post_data, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                res = json.loads(resp.read().decode())
                post_id = res.get("post_id") or res.get("id")
                print(f"✅ Facebook Photo Post SUCCESS! Post ID: {post_id} (lan {attempt}/{attempts})")

                # Pinned First Comment
                comment_data = urllib.parse.urlencode({
                    'message': f"📖 Bạn có thể đọc bài viết đầy đủ và xem các bước thực hành chi tiết tại: {article_url}\nTham gia kênh Telegram của chúng mình để nhận lời nhắc mỗi ngày nhé: https://t.me/traicainghiendaily",
                    'access_token': page_token
                }).encode('utf-8')
                comment_url = f"https://graph.facebook.com/v20.0/{post_id}/comments"
                req_c = urllib.request.Request(comment_url, data=comment_data, headers={'User-Agent': 'Mozilla/5.0'})
                try:
                    with urllib.request.urlopen(req_c, timeout=15) as resp_c:
                        res_c = json.loads(resp_c.read().decode())
                        print("✅ Pinned First Comment SUCCESS! Comment ID:", res_c.get("id"))
                except Exception as ce:
                    print("Comment note:", ce)

                return post_id
        except urllib.error.HTTPError as e:
            try:
                body = e.read().decode()[:300]
            except Exception:
                body = ''
            last_err = f"HTTP {e.code} {body}"
            print(f"❌ Facebook publish error (lan {attempt}/{attempts}): {last_err}")
        except Exception as e:
            last_err = e
            print(f"❌ Facebook publish error (lan {attempt}/{attempts}):", e)
        if attempt < attempts:
            time.sleep(5 * attempt)

    print("❌ Facebook publish FAILED sau", attempts, "lan thu:", last_err)
    return None

def save_facebook_post_queue(fb_post, slug):
    queue_file = "scripts/facebook_pending_posts.json"
    queue = []
    if os.path.exists(queue_file):
        try:
            with open(queue_file, "r", encoding="utf-8") as f:
                queue = json.load(f)
        except:
            queue = []
            
    queue.append({
        "slug": slug,
        "link": f"https://traicainghien.com/bai-viet/{slug}",
        "post_content": fb_post
    })
    
    with open(queue_file, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)

def run_omnichannel_pipeline(topic="focus"):
    """
    Master pipeline:
    1. Search top YouTube video & transcript
    2. Synthesize deep article, Telegram summary, and Facebook post
    3. Insert article into website
    4. Share to Telegram channel
    5. Publish Photo post directly to Facebook Fanpage
    6. Mark video as processed
    """
    print(f"\n=======================================================")
    print(f"🚀 RUNNING OMNICHANNEL CONTENT PIPELINE FOR TOPIC: {topic.upper()}")
    print(f"=======================================================")
    
    # Step 1: Mine YouTube
    video_data = get_best_video_content(topic=topic)
    if not video_data:
        print("❌ No new video candidates found!")
        return False
        
    print(f"✅ Found Video: '{video_data['title']}' ({video_data['views']} views)")
    
    # Step 2: Build Articles
    try:
        artifacts = build_article_from_video(video_data, topic=topic)
    except NoUniqueThumbnailError as e:
        # Khong con tac pham Zen doc ban nao dat chuan -> dung pipeline, bao Bo ro ly do.
        print("\n⛔ [DUNG PIPELINE] Kho tranh Zen da can, khong the tao bai moi.")
        print(f"   Ly do: {e}")
        print("   Khong dang gi len website/Telegram/Facebook de tranh anh trung lap.")
        print("   Cach xu ly: bo ve them tranh Zen roi chay:")
        print("     python3 scripts/generate_zen_thumbnails.py --from-inbox tranh-moi --update")
        try:
            from scripts.telegram_reporter import send_to_hdqt_topic
            send_to_hdqt_topic(
                "⚠️ <b>[FLOW 03 TẠM DỪNG]</b> Kho tranh Zen độc bản đã cạn nên Mây "
                "<b>không xuất bản bài mới</b> (tránh lặp thumbnail).\n"
                f"Video đang chờ: <i>{video_data['title']}</i>\n"
                "Cần bố vẽ thêm tranh rồi nạp lại. Chi tiết trong "
                "<code>tranh-moi/PHIEU-VE-TRANH.md</code>."
            )
        except Exception:
            pass
        return False

    article_obj = artifacts["article"]
    tg_caption = artifacts["telegram_caption"]
    fb_post = artifacts["facebook_post"]
    slug = article_obj["slug"]
    
    print(f"✅ Generated Article: '{article_obj['title']}' (Slug: {slug})")
    
    # Step 3: Insert into website
    insert_ok = insert_article_to_website(article_obj)
    if not insert_ok:
        print("❌ [CRITICAL] Bài viết không vượt qua kiểm toán hoặc không chèn được vào website!")
        print("⛔ NGẮT MẠCH PIPELINE ĐỂ BẢO VỆ HỆ THỐNG — KHÔNG PHÁT SÓNG LINK CHẾT LÊN TELEGRAM & FACEBOOK!")
        try:
            from scripts.telegram_reporter import send_to_hdqt_topic
            send_to_hdqt_topic(f"⚠️ <b>[CẢNH BÁO FLOW 03]</b> Bài viết '{article_obj['title']}' không vượt qua kiểm toán website! Mây đã tự động ngắt mạch pipeline để bảo vệ kênh.")
        except:
            pass
        return False
        
    git_commit_and_push(f"feat: add new {topic} article '{article_obj['title']}' from YouTube research")
        
    # Step 4: Share to Telegram
    print("📢 Sharing to Telegram channel @traicainghiendaily...")
    send_telegram_announcement(article_obj["thumbnail"], tg_caption)
    
    # Step 5: Publish Photo Post to Facebook Fanpage
    print("📱 Publishing Photo Post to Facebook Fanpage...")
    fb_post_id = publish_facebook_fanpage(article_obj["thumbnail"], fb_post, slug)
    if fb_post_id:
        # Tin hieu cho bridge/n8n biet Facebook da dang thanh cong
        print(f"FB_POST_ID:{fb_post_id}")
    else:
        print("FB_POST_ID:FAILED")
        # Chi xep vao hang doi khi dang that bai, de con dang lai sau
        save_facebook_post_queue(fb_post, slug)
    
    # Step 6: Mark video as processed
    save_processed_id(video_data["id"])
    
    # Step 7: Tổng kết ra log.
    # KHÔNG gửi Telegram riêng ở đây: node "Soạn Báo Cáo" của Flow 03 đã gửi
    # báo cáo cho Bố (kèm trạng thái Facebook), gửi thêm sẽ bị trùng 2 tin.
    print(
        f"📋 TỔNG KẾT | topic={topic} | slug={slug} | video={video_data['id']} | "
        f"facebook={'✅ ' + str(fb_post_id) if fb_post_id else '⚠️ vào hàng đợi'}"
    )

    print(f"🎉 PIPELINE COMPLETED SUCCESSFULLY FOR TOPIC: {topic.upper()}!")
    return True

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", default="focus", choices=["focus", "habit"])
    args = parser.parse_args()
    
    ok = run_omnichannel_pipeline(args.topic)
    # Bao dung ma loi cho bridge/n8n: 0 = thanh cong, 1 = that bai
    sys.exit(0 if ok else 1)
