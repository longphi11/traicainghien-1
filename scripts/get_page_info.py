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
import urllib.request
import json

token = None
with open('/root/traicainghien/.env.local') as f:
    for line in f:
        if line.startswith('FB_PAGE_ACCESS_TOKEN='):
            token = line.split('=', 1)[1].strip().strip('\"\\'')
            break

url = f'https://graph.facebook.com/v20.0/1232949796570940?fields=id,name,link,username&access_token={token}'
with urllib.request.urlopen(url) as resp:
    print(resp.read().decode())
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/get_page_info.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/get_page_info.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
