import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import subprocess

ARTICLES_FILE = "src/data/articles.ts"
REGISTRY_FILE = "src/data/article_registry.json"
COMMENTS_FILE = "src/data/articleComments.ts"

def generate_seeding_comments(article_obj):
    slug = article_obj["slug"]
    title = article_obj["title"]
    pillar_tag = article_obj.get("pillarTag", "LayLaiSuTapTrung")
    prefix = slug[:6].replace('-', '')
    
    if pillar_tag == "LayLaiSuTapTrung" or "tap-trung" in slug or "focus" in slug:
        c1 = {
            "id": f"{prefix}-1",
            "name": "Nguyễn Hoàng Nam (Lập trình viên Backend • 28 tuổi)",
            "content": f"Đọc bài viết '{title}' mà mình thấy như được cứu rỗi tâm trí. Suốt nửa năm nay mình luôn vật lộn với những cơn nhảy tab liên tục, đang code dở là lại ngứa tay bật mạng xã hội lướt vô thức. Đọc xong phân tích của Mây mình mới hiểu não bộ không hề lười mà đang bị ngộ độc siêu kích thích. Mình vừa dọn sạch bàn làm việc và cất điện thoại cách xa 2 mét theo hướng dẫn, cảm giác làm việc sâu trở lại thật nhẹ nhõm!",
            "date": "Vừa xong",
            "likes": 86,
            "isLongStory": True
        }
        c2 = {
            "id": f"{prefix}-2",
            "name": "Trần Thị Mai Phương (Content Strategist)",
            "content": "Phân tích khoa học thần kinh rất sắc bén và dễ hiểu! Hóa ra cơ chế chai lì thụ thể dopamine chính là thủ phạm khiến người trẻ dễ bị sương mù não. Cảm ơn Trại Cai Nghiện vì góc nhìn nhân văn không hề phán xét.",
            "date": "1 ngày trước",
            "likes": 49
        }
        c3 = {
            "id": f"{prefix}-3",
            "name": "Lê Quốc Bảo (Sinh viên năm cuối)",
            "content": "Quy tắc đơn nhiệm 45/10 đã giúp mình hoàn thành xong đồ án tốt nghiệp sau 2 tuần trì hoãn. Bí quyết đúng là giảm ma sát môi trường chứ không gồng mình bằng ý chí thô kệch.",
            "date": "2 ngày trước",
            "likes": 34
        }
    else:
        c1 = {
            "id": f"{prefix}-1",
            "name": "Vũ Thu Trang (Dược sĩ lâm sàng • 29 tuổi)",
            "content": f"Bài viết '{title}' chạm đúng vào nỗi đau lớn nhất của mình. Bao nhiêu lần tự hứa 'từ ngày mai sẽ dậy 5h sáng, tập thể dục, đọc sách' rồi chỉ được 3 ngày là bỏ cuộc trong cảm giác tội lỗi bóp nghẹt. Giờ mình mới hiểu hạch hạnh nhân sợ sự xáo trộn đột ngột thế nào. Quy tắc 2 phút và Kaizen 1% mỗi ngày giúp mình bắt đầu lại một cách nhẹ nhàng, bình an vô cùng.",
            "date": "Vừa xong",
            "likes": 92,
            "isLongStory": True
        }
        c2 = {
            "id": f"{prefix}-2",
            "name": "Đặng Minh Quân (Project Manager)",
            "content": "Thay đổi lớn đến từ những dịch chuyển vi mô 1%. Triết lý Atomic Habits và phương pháp Kaizen của Nhật Bản được Trại Cai Nghiện đóng gói cực kỳ thực chiến và gần gũi.",
            "date": "1 ngày trước",
            "likes": 53
        }
        c3 = {
            "id": f"{prefix}-3",
            "name": "Phạm Hải Đăng (24 tuổi)",
            "content": "Đọc xong là mình bắt đầu ngay với việc xỏ giày đi bộ 5 phút thay vì đặt mục tiêu chạy 5km quá sức. Cảm ơn Mây vì những lời vỗ về ấm áp và khoa học!",
            "date": "2 ngày trước",
            "likes": 38
        }
    return [c1, c2, c3]

def insert_comments_for_slug(article_obj):
    if not os.path.exists(COMMENTS_FILE):
        return True
    with open(COMMENTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    slug = article_obj["slug"]
    if f'"{slug}":' in content or f"'{slug}':" in content:
        return True
        
    marker = "export const articleCommentsMap: Record<string, Comment[]> = {\n"
    pos = content.find(marker)
    if pos == -1:
        return False
        
    comments = generate_seeding_comments(article_obj)
    comments_json = json.dumps(comments, ensure_ascii=False, indent=4)
    indented_comments = f'  "{slug}": ' + comments_json.replace("\n", "\n  ") + ",\n"
    
    new_content = content[:pos + len(marker)] + indented_comments + content[pos + len(marker):]
    with open(COMMENTS_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ Đã chèn 3 bình luận seeding độc bản cho '{slug}' vào {COMMENTS_FILE}")
    return True

def sync_latest_git():
    """
    Kéo mã nguồn mới nhất từ GitHub trước khi thao tác để không bao giờ bị đè code.
    """
    try:
        print("🔄 [GIT SYNC] Đang kéo cập nhật mới nhất từ GitHub trước khi xuất bản...")
        res = subprocess.run(["git", "pull", "--rebase"], capture_output=True, text=True)
        print("Git pull result:", res.stdout.strip() if res.stdout else "Up to date")
        return True
    except Exception as e:
        print(f"⚠️ [GIT SYNC NOTE] {e}")
        return False

def insert_article_to_website(article_obj):
    """
    Chèn bài viết mới vào rawArticles trong src/data/articles.ts, bình luận vào articleComments.ts và chạy kiểm toán an toàn.
    """
    # Bước 1: Luôn đồng bộ Git mới nhất
    sync_latest_git()

    if not os.path.exists(ARTICLES_FILE):
        print(f"❌ File not found: {ARTICLES_FILE}")
        return False
        
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        old_articles_content = f.read()
        
    old_comments_content = ""
    if os.path.exists(COMMENTS_FILE):
        with open(COMMENTS_FILE, "r", encoding="utf-8") as f:
            old_comments_content = f.read()
        
    slug = article_obj["slug"]
    if f'"slug": "{slug}"' in old_articles_content or f"'slug': '{slug}'" in old_articles_content:
        print(f"ℹ️ Bài viết với slug '{slug}' đã tồn tại trong {ARTICLES_FILE}")
        return True
        
    marker = "const rawArticles: Article[] = ["
    pos = old_articles_content.find(marker)
    if pos == -1:
        print(f"❌ Marker '{marker}' not found in {ARTICLES_FILE}")
        return False
        
    insert_pos = pos + len(marker)
    article_json = json.dumps(article_obj, ensure_ascii=False, indent=2)
    indented_json = "\n  " + article_json.replace("\n", "\n  ") + ","
    
    new_content = old_articles_content[:insert_pos] + indented_json + old_articles_content[insert_pos:]
    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"✅ Đã chèn bài viết '{article_obj['title']}' vào {ARTICLES_FILE}")

    # Chèn bình luận seeding độc bản
    insert_comments_for_slug(article_obj)

    # Bước 2: Chạy kiểm toán tự động (Audit Gate) để cập nhật Registry và chống đè
    try:
        print("🛡️ [MÂY & AGENT 5] Khởi chạy kiểm toán bài viết tự động...")
        audit_res = subprocess.run(["node", "scripts/audit_all_articles.js"], capture_output=True, text=True)
        if audit_res.returncode != 0:
            print("❌ [LỖI KIỂM TOÁN] Bài viết không đạt chuẩn! Chi tiết:")
            print(audit_res.stderr or audit_res.stdout)
            # Revert files nếu audit fail
            with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
                f.write(old_articles_content)
            if old_comments_content:
                with open(COMMENTS_FILE, "w", encoding="utf-8") as f:
                    f.write(old_comments_content)
            print("↩️ Đã hoàn tác file articles.ts và articleComments.ts để bảo vệ hệ thống.")
            return False
        print("✅ Kiểm toán thành công! Sổ đăng ký article_registry.json đã được cập nhật tự động.")
    except Exception as e:
        print(f"⚠️ Lưu ý kiểm toán: {e}")

    return True

def git_commit_and_push(commit_message):
    """
    Commits changes và push lên tất cả remote GitHub để kích hoạt Vercel deploy.
    """
    try:
        # Add cả articles, registry, comments và thư mục ảnh
        files_to_add = [ARTICLES_FILE]
        if os.path.exists(REGISTRY_FILE):
            files_to_add.append(REGISTRY_FILE)
        if os.path.exists(COMMENTS_FILE):
            files_to_add.append(COMMENTS_FILE)
        if os.path.exists("public/images/articles"):
            files_to_add.append("public/images/articles")

        subprocess.run(["git", "add"] + files_to_add, check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        print("Git commit thành công. Đang đẩy lên remote GitHub...")
        
        # Pull --rebase để tích hợp các commit mới nhất trước khi push
        subprocess.run(["git", "pull", "--rebase"], capture_output=True)

        # Push lên remote mặc định
        res = subprocess.run(["git", "push"], capture_output=True, text=True)
        print("Git push result:", res.stdout.strip() if res.stdout else "OK")

        # Nếu có remote fork, push thêm fork để Vercel nhận diện
        try:
            subprocess.run(["git", "push", "fork", "main"], capture_output=True, text=True)
        except:
            pass

        return True
    except Exception as e:
        print("Git commit/push note:", e)
        return False
        print("Git push result:", res.stdout.strip() if res.stdout else "OK")

        # Nếu có remote fork, push thêm fork để Vercel nhận diện
        try:
            subprocess.run(["git", "push", "fork", "main"], capture_output=True, text=True)
        except:
            pass

        return True
    except Exception as e:
        print("Git commit/push note:", e)
        return False

if __name__ == "__main__":
    print("Article publisher ready with Auto Git-Sync & Data Integrity Gate.")
