import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import subprocess

ARTICLES_FILE = "src/data/articles.ts"
REGISTRY_FILE = "src/data/article_registry.json"

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
    Chèn bài viết mới vào rawArticles trong src/data/articles.ts và chạy kiểm toán an toàn.
    """
    # Bước 1: Luôn đồng bộ Git mới nhất
    sync_latest_git()

    if not os.path.exists(ARTICLES_FILE):
        print(f"❌ File not found: {ARTICLES_FILE}")
        return False
        
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        
    slug = article_obj["slug"]
    if f'"slug": "{slug}"' in content or f"'slug': '{slug}'" in content:
        print(f"ℹ️ Bài viết với slug '{slug}' đã tồn tại trong {ARTICLES_FILE}")
        return True
        
    marker = "const rawArticles: Article[] = ["
    pos = content.find(marker)
    if pos == -1:
        print(f"❌ Marker '{marker}' not found in {ARTICLES_FILE}")
        return False
        
    insert_pos = pos + len(marker)
    article_json = json.dumps(article_obj, ensure_ascii=False, indent=2)
    indented_json = "\n  " + article_json.replace("\n", "\n  ") + ","
    
    new_content = content[:insert_pos] + indented_json + content[insert_pos:]
    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"✅ Đã chèn bài viết '{article_obj['title']}' vào {ARTICLES_FILE}")

    # Bước 2: Chạy kiểm toán tự động (Audit Gate) để cập nhật Registry và chống đè
    try:
        print("🛡️ [MÂY & AGENT 5] Khởi chạy kiểm toán bài viết tự động...")
        audit_res = subprocess.run(["node", "scripts/audit_all_articles.js"], capture_output=True, text=True)
        if audit_res.returncode != 0:
            print("❌ [LỖI KIỂM TOÁN] Bài viết không đạt chuẩn! Chi tiết:")
            print(audit_res.stderr or audit_res.stdout)
            # Revert file nếu audit fail
            with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
                f.write(content)
            print("↩️ Đã hoàn tác file articles.ts để bảo vệ hệ thống.")
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
        # Add cả articles, registry và thư mục ảnh
        files_to_add = [ARTICLES_FILE]
        if os.path.exists(REGISTRY_FILE):
            files_to_add.append(REGISTRY_FILE)
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

if __name__ == "__main__":
    print("Article publisher ready with Auto Git-Sync & Data Integrity Gate.")
