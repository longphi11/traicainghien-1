import urllib.request
import time

url = "https://www.traicainghien.com/bai-viet/khi-chi-con-10-phan-tram-nang-luong-giao-an-cho-ngay-kiet-que"
print(f"Checking {url}...")

for attempt in range(1, 10):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            status = response.getcode()
            print(f"Attempt {attempt}: HTTP {status}")
            if status == 200:
                print("LIVE SITE DEPLOYED SUCCESSFULLY (HTTP 200 OK)!")
                break
    except urllib.error.HTTPError as e:
        print(f"Attempt {attempt}: HTTP {e.code} (still deploying...)")
    except Exception as e:
        print(f"Attempt {attempt}: {e}")
    time.sleep(6)
