import re

text = open('src/data/articles.ts', encoding='utf-8').read()
slugs = re.findall(r'"slug":\s*"([^"]+)"', text)
print("Total articles:", len(slugs))
for idx, s in enumerate(slugs):
    if 'luoi' in s or 'tieu-xai' in s or 'tra' in s:
        print(f"[{idx}] {s}")
