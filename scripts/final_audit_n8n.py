import urllib.request
import time
import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for host in ['103.157.218.111', 'vn1.1921992.xyz']:
    try:
        req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: pass
    except: pass

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

cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CONTAINER_ID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd)
raw = stdout.read().decode('utf-8')
workflows = json.loads(raw)

print("=== FINAL VERIFICATION OF ALL N8N WORKFLOWS ===")
active_count = 0
for wf in workflows:
    wfid = wf.get('id')
    active = wf.get('active')
    name = wf.get('name')
    print(f"[{'ACTIVE' if active else 'INACTIVE'}] ID: {wfid} | Name: {name}")
    if active:
        active_count += 1

print(f"\nTotal active workflows: {active_count}")
ssh.close()
