import subprocess
import re
import html
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

cmd = ['curl.exe', '-s', '-L', '-A', 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'https://www.facebook.com/share/p/1KKqC32nbE/']
res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
raw_html = res.stdout

with open('scripts/fb_post_raw.html', 'w', encoding='utf-8') as f:
    f.write(raw_html)

# Extract og:description
m = re.search(r'<meta property="og:description" content="([^"]+)"', raw_html)
if m:
    print("=== OG:DESCRIPTION ===")
    print(html.unescape(m.group(1)))

# Search for the full text in raw_html
# Look for "Tôi không lười"
idx = raw_html.find('Tôi không lười')
if idx != -1:
    print("\n=== RAW HTML CONTEXT (around 'Tôi không lười') ===")
    snippet = raw_html[idx:idx+4000]
    print(html.unescape(snippet))
else:
    print("Could not find 'Tôi không lười' directly in text, checking escaped Unicode...")
    # Maybe \u0054\u00f4\u0069...
    matches = re.findall(r'\\"text\\":\\"([^\\"]+)\\"', raw_html)
    print(f"Found {len(matches)} text matches")
    for text in matches:
        if 'lười' in text or 'tiêu xài' in text or 'ba mươi phút' in text:
            print("MATCH:", text)
