import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import subprocess

ARTICLES_FILE = "src/data/articles.ts"

def insert_article_to_website(article_obj):
    """
    Inserts a new article object to rawArticles in src/data/articles.ts
    """
    if not os.path.exists(ARTICLES_FILE):
        print(f"File not found: {ARTICLES_FILE}")
        return False
        
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        
    slug = article_obj["slug"]
    if f'"slug": "{slug}"' in content or f"'slug': '{slug}'" in content:
        print(f"Article with slug '{slug}' already exists in {ARTICLES_FILE}")
        return True
        
    marker = "const rawArticles: Article[] = ["
    pos = content.find(marker)
    if pos == -1:
        print(f"Marker '{marker}' not found in {ARTICLES_FILE}")
        return False
        
    insert_pos = pos + len(marker)
    article_json = json.dumps(article_obj, ensure_ascii=False, indent=2)
    # Indent slightly
    indented_json = "\n  " + article_json.replace("\n", "\n  ") + ","
    
    new_content = content[:insert_pos] + indented_json + content[insert_pos:]
    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"Successfully inserted article '{article_obj['title']}' to {ARTICLES_FILE}")
    return True

def git_commit_and_push(commit_message):
    """
    Commits changes and pushes to git remote to trigger Vercel deploy.
    """
    try:
        subprocess.run(["git", "add", ARTICLES_FILE], check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        print("Git commit successful. Pushing to remote...")
        res = subprocess.run(["git", "push"], capture_output=True, text=True)
        print("Git push result:", res.stdout, res.stderr)
        return True
    except Exception as e:
        print("Git push note:", e)
        return False

if __name__ == "__main__":
    print("Article publisher ready.")
