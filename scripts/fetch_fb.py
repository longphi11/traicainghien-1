import urllib.request
import re

url = 'https://www.facebook.com/share/p/1KKqC32nbE/'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
})

try:
    with urllib.request.urlopen(req, timeout=10) as r:
        final_url = r.geturl()
        print('Final URL:', final_url)
        content = r.read().decode('utf-8', errors='ignore')
        print('Content length:', len(content))
        with open('scripts/fb_page.html', 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Meta og:title, og:description
        for m in re.finditer(r'<meta\s+(?:property|name)=["\']([^"\']+)["\']\s+content=["\']([^"\']+)["\']', content):
            if 'title' in m.group(1).lower() or 'desc' in m.group(1).lower():
                print(f"{m.group(1)}: {m.group(2)}")
                
        # Also check title tag
        t = re.search(r'<title>([^<]+)</title>', content)
        if t:
            print("Title tag:", t.group(1))
except Exception as e:
    print('Error:', e)
