import json

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Load our article draft
import importlib.util
# Let's read from scripts/draft_tieu_xai_article.ts or define directly in python
from draft_tieu_xai_article_dict import new_article

# Format new article as JSON object
article_json = json.dumps(new_article, ensure_ascii=False, indent=2)

# Insert after const rawArticles: Article[] = [
marker = 'const rawArticles: Article[] = ['
if marker not in code:
    marker = 'const rawArticles = ['

idx = code.find(marker)
if idx == -1:
    raise Exception("Could not find rawArticles marker")

insert_pos = idx + len(marker)

# Format insertion
replacement = '\n  ' + article_json + ','
new_code = code[:insert_pos] + replacement + code[insert_pos:]

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Successfully inserted into src/data/articles.ts!")

# Update article_registry.json
with open('src/data/article_registry.json', 'r', encoding='utf-8') as f:
    registry = json.load(f)

if new_article['slug'] not in registry:
    registry.insert(0, new_article['slug'])
    with open('src/data/article_registry.json', 'w', encoding='utf-8') as f:
        json.dump(registry, f, ensure_ascii=False, indent=2)
    print(f"Added {new_article['slug']} to article_registry.json (total: {len(registry)})")
else:
    print(f"{new_article['slug']} already in registry")
