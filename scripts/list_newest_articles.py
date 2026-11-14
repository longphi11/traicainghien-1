import re

with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slugs = re.findall(r'"slug":\s*"([^"]+)"', text)
titles = re.findall(r'"title":\s*"([^"]+)"', text)
dates = re.findall(r'"date":\s*"([^"]+)"', text)

print(f"Total articles: {len(slugs)}")
for i in range(min(10, len(slugs))):
    print(f"{i+1}. Date: {dates[i] if i < len(dates) else 'N/A'} | Slug: {slugs[i]} | Title: {titles[i] if i < len(titles) else 'N/A'}")
