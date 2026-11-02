import re

txt = open('src/data/articles.ts', encoding='utf-8').read()
slugs = re.findall(r'"slug":\s*"([^"]+)"', txt)
thumbs = re.findall(r'"thumbnail":\s*"([^"]+)"', txt)
print(f"Total articles found: {len(slugs)}")
for i, (s, t) in enumerate(zip(slugs, thumbs)):
    print(f"{i+1}. [{s}] -> {t}")
