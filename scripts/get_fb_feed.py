import urllib.request
import urllib.error
import time
import paramiko
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            break
    except:
        time.sleep(1)

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

remote_code = """
import os
import urllib.request
import urllib.error
import json

token = None
for p in ['.env.local', '/root/traicainghien/.env.local']:
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('FB_PAGE_ACCESS_TOKEN='):
                    token = line.split('=', 1)[1].strip().strip('\"\\'')
                    break
    if token: break

page_id = '1232949796570940'
url = f'https://graph.facebook.com/v20.0/{page_id}/feed?fields=id,created_time,message,story&limit=10&access_token={token}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode())
        print('=== RECENT 10 POSTS ON FACEBOOK FANPAGE ===')
        for item in data.get('data', []):
            print(f"ID: {item.get('id')} | Created: {item.get('created_time')}")
            msg = item.get('message', item.get('story', ''))
            print(f"  Content: {repr(msg[:120])}")
except urllib.error.HTTPError as e:
    print('HTTP Error:', e.code, e.read().decode())
except Exception as e:
    print('Error:', e)
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/get_fb_posts.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/get_fb_posts.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
