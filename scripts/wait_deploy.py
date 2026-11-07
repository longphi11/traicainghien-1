import urllib.request
import time

url = "https://www.traicainghien.com/bai-viet/khi-chi-con-10-phan-tram-nang-luong-giao-an-cho-ngay-kiet-que"
print(f"Waiting for Vercel deployment on {url}...")

for i in range(12):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        if res.getcode() == 200:
            print(f"✅ DEPLOYED! HTTP 200 OK at attempt {i+1}")
            break
    except Exception as e:
        print(f"Attempt {i+1}: {e}")
    time.sleep(5)
