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

# Check the posts from 13/11 (122131590573422163) and 12/11 and 11/11
post_ids = [
    '1232949796570940_122131590573422163', # 13/11 10:00
    '1232949796570940_122131509711422163', # 12/11 21:00
    '1232949796570940_122131416351422163', # 12/11 10:00
    '1232949796570940_122131295733422163', # 11/11 21:00
    '1232949796570940_122131184007422163', # 11/11 10:00
]

for pid in post_ids:
    url = f'https://graph.facebook.com/v20.0/{pid}?fields=id,created_time,is_published,is_hidden,permalink_url,shares,comments.summary(true),reactions.summary(true)&access_token={token}'
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            print(f"\\nPost: {pid}")
            print(f"  Created: {data.get('created_time')}")
            print(f"  Is Published: {data.get('is_published')}")
            print(f"  Is Hidden: {data.get('is_hidden')}")
            print(f"  Permalink: {data.get('permalink_url')}")
            print(f"  Reactions: {data.get('reactions', {}).get('summary', {}).get('total_count')}")
            print(f"  Comments: {data.get('comments', {}).get('summary', {}).get('total_count')}")
    except urllib.error.HTTPError as e:
        print(f"Error {pid}: {e.code} {e.read().decode()}")
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/check_fb_post_visibility.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/check_fb_post_visibility.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
