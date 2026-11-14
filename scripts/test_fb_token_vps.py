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

test_token_script = """
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
    if token:
        break

print('Found token:', bool(token), 'Length:', len(token) if token else 0)

if token:
    url = f'https://graph.facebook.com/v20.0/1232949796570940?fields=id,name&access_token={token}'
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            print('FB Graph API Response:', data)
    except urllib.error.HTTPError as e:
        print('FB Graph API HTTP Error:', e.code, e.read().decode())
    except Exception as e:
        print('FB Graph API Error:', e)

    url_me = f'https://graph.facebook.com/v20.0/me?access_token={token}'
    try:
        with urllib.request.urlopen(url_me, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            print('FB /me Response:', data)
    except urllib.error.HTTPError as e:
        print('FB /me HTTP Error:', e.code, e.read().decode())
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/test_fb_token.py', 'w') as f:
    f.write(test_token_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/test_fb_token.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
