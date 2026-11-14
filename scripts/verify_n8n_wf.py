import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for _ in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: break
    except:
        time.sleep(1)

time.sleep(2)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(
    '103.157.218.111',
    port=11985,
    username='root',
    password='TCN@Root2026#Secure',
    timeout=10,
    banner_timeout=15,
    look_for_keys=False,
    allow_agent=False
)

stdin, stdout, stderr = ssh.exec_command('CID=$(docker ps -q -f name=n8n) && docker exec $CID n8n list:workflows')
print("=== ACTIVE N8N WORKFLOWS ===")
print(stdout.read().decode('utf-8', errors='ignore'))

# Verify Flow 01 is active
stdin, stdout, stderr = ssh.exec_command('CID=$(docker ps -q -f name=n8n) && docker exec $CID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true')
print("=== ACTIVATE FLOW 01 ===")
print(stdout.read().decode('utf-8', errors='ignore'))

ssh.close()
