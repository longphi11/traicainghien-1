import urllib.request
import time
import paramiko
import json
import sys

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

# Export workflow wWXJoMhbchKzrkqr
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) n8n export:workflow --id=wWXJoMhbchKzrkqr')
wf_str = stdout.read().decode('utf-8')

with open('scratch/wf_debug.json', 'w', encoding='utf-8') as f:
    f.write(wf_str)

print("Exported workflow size:", len(wf_str))
ssh.close()
