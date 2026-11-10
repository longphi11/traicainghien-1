import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import urllib.request
import urllib.parse
from youtube_content_miner import get_best_video_content, save_processed_id
from generate_omnichannel_article import build_article_from_video
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

def send_telegram_announcement(photo_url, caption):
    """
    Sends photo with caption to Telegram channel.
    """
    try:
        if photo_url.startswith("/"):
            photo_url = "https://traicainghien.com" + photo_url
            
        post_data = urllib.parse.urlencode({
            'chat_id': CHANNEL_ID,
            'photo': photo_url,
            'caption': caption,
            'parse_mode': 'HTML'
        }).encode('utf-8')

        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
        req = urllib.request.Request(url, data=post_data, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            res = json.loads(resp.read().decode())
            print("Telegram post published successfully:", res.get("ok"))
            return True
    except Exception as e:
        print("Telegram broadcast error:", e)
        return False

def publish_facebook_fanpage(photo_url, fb_post, slug):
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
    
    try:
        post_data = urllib.parse.urlencode({
            'url': photo_url,
            'caption': fb_post,
            'access_token': page_token
        }).encode('utf-8')

        url = f"https://graph.facebook.com/v20.0/{PAGE_ID}/photos"
        req = urllib.request.Request(url, data=post_data, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=20) as resp:
            res = json.loads(resp.read().decode())
            post_id = res.get("post_id") or res.get("id")
            print(f"✅ Facebook Photo Post SUCCESS! Post ID: {post_id}")
            
            # Pinned First Comment
            comment_data = urllib.parse.urlencode({
                'message': f"📖 Bạn có thể đọc bài viết đầy đủ và xem các bước thực hành chi tiết tại: {article_url}\nTham gia kênh Telegram của chúng mình để nhận lời nhắc mỗi ngày nhé: https://t.me/traicainghiendaily",
                'access_token': page_token
            }).encode('utf-8')
            comment_url = f"https://graph.facebook.com/v20.0/{post_id}/comments"
            req_c = urllib.request.Request(comment_url, data=comment_data, headers={'User-Agent': 'Mozilla/5.0'})
            try:
                with urllib.request.urlopen(req_c, timeout=10) as resp_c:
                    res_c = json.loads(resp_c.read().decode())
                    print("✅ Pinned First Comment SUCCESS! Comment ID:", res_c.get("id"))
            except Exception as ce:
                print("Comment note:", ce)
                
            return post_id
    except Exception as e:
        print("❌ Facebook publish error:", e)
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
    artifacts = build_article_from_video(video_data, topic=topic)
    article_obj = artifacts["article"]
    tg_caption = artifacts["telegram_caption"]
    fb_post = artifacts["facebook_post"]
    slug = article_obj["slug"]
    
    print(f"✅ Generated Article: '{article_obj['title']}' (Slug: {slug})")
    
    # Step 3: Insert into website
    insert_ok = insert_article_to_website(article_obj)
    if insert_ok:
        git_commit_and_push(f"feat: add new {topic} article '{article_obj['title']}' from YouTube research")
        
    # Step 4: Share to Telegram
    print("📢 Sharing to Telegram channel @traicainghiendaily...")
    send_telegram_announcement(article_obj["thumbnail"], tg_caption)
    
    # Step 5: Publish Photo Post to Facebook Fanpage
    print("📱 Publishing Photo Post to Facebook Fanpage...")
    fb_post_id = publish_facebook_fanpage(article_obj["thumbnail"], fb_post, slug)
    save_facebook_post_queue(fb_post, slug)
    
    # Step 6: Mark video as processed
    save_processed_id(video_data["id"])
    
    # Step 7: Send private Telegram report to Bố
    try:
        from scripts.telegram_reporter import report_omnichannel_success, report_system_error
        report_omnichannel_success(topic, video_data["title"], slug, fb_post_id or "Chờ đồng bộ")
        print("📨 Sent success report to Bố on Telegram!")
    except Exception as re:
        print("Report note:", re)

    print(f"🎉 PIPELINE COMPLETED SUCCESSFULLY FOR TOPIC: {topic.upper()}!")
    return True

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", default="focus", choices=["focus", "habit"])
    args = parser.parse_args()
    
    run_omnichannel_pipeline(args.topic)
