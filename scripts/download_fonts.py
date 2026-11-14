import urllib.request
import os

fonts = {
    "PatrickHand-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhand/PatrickHand-Regular.ttf",
    "Caveat-Bold.ttf": "https://github.com/google/fonts/raw/main/ofl/caveat/static/Caveat-Bold.ttf",
    "Caveat-Regular.ttf": "https://github.com/google/fonts/raw/main/ofl/caveat/static/Caveat-Regular.ttf",
    "Mali-Medium.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/mali/Mali-Medium.ttf",
    "Sriracha-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/sriracha/Sriracha-Regular.ttf"
}

os.makedirs("assets/fonts", exist_ok=True)

for name, url in fonts.items():
    dest = os.path.join("assets/fonts", name)
    try:
        print(f"Downloading {name}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Success: {name} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")
