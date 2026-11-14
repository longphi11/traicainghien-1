import urllib.request
import re
import sys
import json
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

url = 'https://www.youtube.com/watch?v=Fh9FaLJ-sNc'
req = urllib.request.Request(
    url,
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'vi,en;q=0.9'
    }
)

with urllib.request.urlopen(req, timeout=10) as r:
    html = r.read().decode('utf-8', errors='ignore')

m = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});', html)
if m:
    data = json.loads(m.group(1))
    captions = data.get('captions', {}).get('playerCaptionsTracklistRenderer', {}).get('captionTracks', [])
    print(f"Found {len(captions)} caption tracks:")
    for c in captions:
        print("- Language:", c.get('languageCode'), c.get('name', {}).get('simpleText'))
        track_url = c.get('baseUrl')
        if track_url:
            print("Fetching transcript from:", track_url[:100])
            req_c = urllib.request.Request(track_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req_c, timeout=10) as rc:
                xml_data = rc.read().decode('utf-8', errors='ignore')
                root = ET.fromstring(xml_data)
                texts = [elem.text for elem in root.findall('.//text') if elem.text]
                full_transcript = " ".join(texts)
                print("Transcript length:", len(full_transcript))
                with open('scripts/transcript_lock_in.txt', 'w', encoding='utf-8') as f:
                    f.write(full_transcript)
                print("Saved transcript to scripts/transcript_lock_in.txt")
                print("Transcript preview (first 1000 chars):\n", full_transcript[:1000])
                break
else:
    print("No ytInitialPlayerResponse found")
