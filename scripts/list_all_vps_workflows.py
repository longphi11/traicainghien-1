import urllib.request
import time
import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

host = 'vn1.1921992.xyz'
knock_url = f'http://{host}:60000/C1sco1234'
print(f"Knocking {knock_url}...")
try:
    req = urllib.request.Request(knock_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=5) as r:
        print('Knock response:', r.status)
except Exception as e:
    print('Knock note:', e)

time.sleep(2)
print("Connecting SSH...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)
print("Connected SSH successfully!")

cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CONTAINER_ID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd)
raw = stdout.read().decode('utf-8')
workflows = json.loads(raw)
print(f"Total workflows in n8n: {len(workflows)}")

tcn_wfs = []
for wf in workflows:
    name = wf.get('name', '')
    wfid = wf.get('id', '')
    active = wf.get('active', False)
    print(f"ID: {wfid} | Active: {active} | Name: {name}")
    tcn_wfs.append({
        'id': wfid,
        'name': name,
        'active': active
    })

with open('scripts/all_workflows_summary.json', 'w', encoding='utf-8') as f:
    json.dump(tcn_wfs, f, ensure_ascii=False, indent=2)

ssh.close()
