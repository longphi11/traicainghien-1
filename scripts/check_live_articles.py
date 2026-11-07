import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re

req = urllib.request.Request('https://www.traicainghien.com/bai-viet', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

slugs = set(re.findall(r'/bai-viet/([a-zA-Z0-9\-]+)', html))
print(f"Total article slugs found on /bai-viet: {len(slugs)}")
for s in sorted(list(slugs))[:10]:
    print("-", s)

target = "khi-chi-con-10-phan-tram-nang-luong-giao-an-cho-ngay-kiet-que"
print("\nTarget article present on /bai-viet?", target in slugs)
