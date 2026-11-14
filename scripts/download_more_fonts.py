import urllib.request
import os

fonts = {
    "Caveat-Variable.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/caveat/Caveat%5Bwght%5D.ttf",
    "BeVietnamPro-Medium.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/BeVietnamPro-Medium.ttf",
    "Pangolin-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/pangolin/Pangolin-Regular.ttf",
    "Itim-Regular.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/itim/Itim-Regular.ttf"
}

for name, url in fonts.items():
    dest = os.path.join("assets/fonts", name)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out_file:
            out_file.write(resp.read())
        print(f"Success: {name} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")
