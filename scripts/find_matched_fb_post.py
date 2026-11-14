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
with open('/root/traicainghien/.env.local') as f:
    for line in f:
        if line.startswith('FB_PAGE_ACCESS_TOKEN='):
            token = line.split('=', 1)[1].strip().strip('\"\\'')
            break

# Search posts with caption containing 'TỪ NGÀY MAI MÌNH SẼ THAY ĐỔI HOÀN TOÀN'
url = f'https://graph.facebook.com/v20.0/1232949796570940/posts?fields=id,created_time,permalink_url,message&limit=25&access_token={token}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    for item in data.get('data', []):
        msg = item.get('message', '')
        if 'THAY ĐỔI HOÀN TOÀN' in msg or 'ĐÃ BAO NHIÊU LẦN' in msg:
            print("MATCHED POST:")
            print("ID:", item.get('id'))
            print("Created:", item.get('created_time'))
            print("Permalink:", item.get('permalink_url'))
            print("Snippet:", repr(msg[:150]))
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/find_post.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/find_post.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
