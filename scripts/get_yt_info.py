import urllib.request
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

url = 'https://www.youtube.com/watch?v=bx_4PigZJhw'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        
        m_title = re.search(r'<title>([^<]+)</title>', html)
        if m_title:
            print("Title:", m_title.group(1))
            
        m_desc = re.search(r'<meta name="description" content="([^"]+)"', html)
        if m_desc:
            print("Description:", m_desc.group(1))
            
        m_player = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});(?:var|\s*</script>)', html)
        if m_player:
            try:
                data = json.loads(m_player.group(1))
                vd = data.get('videoDetails', {})
                print("Channel:", vd.get('author'))
                print("Title:", vd.get('title'))
                print("Length Seconds:", vd.get('lengthSeconds'))
                print("Short Description:\n", vd.get('shortDescription'))
            except Exception as e:
                print("Player parse error:", e)
except Exception as e:
    print("Fetch error:", e)
