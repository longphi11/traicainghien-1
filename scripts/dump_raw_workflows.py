import urllib.request
import time
import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for host in ['103.157.218.111', 'vn1.1921992.xyz']:
    try:
        req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            print(f"Knocked {host}: {r.status}")
    except Exception as e:
        print(f"Knock {host} note: {e}")

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(
    '103.157.218.111',
    port=11985,
    username='root',
    password='TCN@Root2026#Secure',
    timeout=15,
    banner_timeout=20,
    look_for_keys=False,
    allow_agent=False
)
print("Connected SSH successfully!")

cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CONTAINER_ID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd)
raw = stdout.read().decode('utf-8')
with open('scripts/vps_all_workflows_raw.json', 'w', encoding='utf-8') as f:
    f.write(raw)
print(f"Saved raw workflows! Length: {len(raw)}")

ssh.close()
