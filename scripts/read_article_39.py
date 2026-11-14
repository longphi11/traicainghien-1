import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

text = open('src/data/articles.ts', encoding='utf-8').read()
start = text.find('"ban-khong-he-luoi-chua-tim-duoc-ban-cong-cua-minh"')
if start != -1:
    print(text[start-20:start+1200])
