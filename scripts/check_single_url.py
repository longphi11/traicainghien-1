import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request

target = "https://www.traicainghien.com/bai-viet/khi-chi-con-10-phan-tram-nang-luong-giao-an-cho-ngay-kiet-que"
try:
    req = urllib.request.Request(target, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    print("Status:", res.getcode())
    print("Length:", len(res.read()))
except Exception as e:
    print("Error:", e)
