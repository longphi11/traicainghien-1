import urllib.request
import time
import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

host = 'vn1.1921992.xyz'
knock_url = f'http://{host}:60000/C1sco1234'
try:
    req = urllib.request.Request(knock_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=5) as r: pass
except: pass

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

# Export all and inspect nodes of each active daily workflow
cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CONTAINER_ID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd)
raw = stdout.read().decode('utf-8')
workflows = json.loads(raw)

daily_ids = ['yCJrtItjJqm3F7Ta', 'Qv3Q45ctCtUykHmx', 'bG48Cdxb2QBqiB0X', 'wWXJoMhbchKzrkqr']
sleep_ids = ['YqePn7jWibu9N2vz', 'RbeskJI2DdKZEuqx', '34sUV6RHvQMR2pWv', 'E6PVBHKrtYPlfevu']

for wf in workflows:
    wfid = wf.get('id')
    name = wf.get('name')
    active = wf.get('active')
    nodes = wf.get('nodes', [])
    print(f"\n====================\nWorkflow: {wfid} | Active: {active} | Name: {name}")
    for n in nodes:
        node_name = n.get('name')
        node_type = n.get('type')
        jsCode = n.get('parameters', {}).get('jsCode', '')
        if jsCode:
            print(f"  Node: {node_name} (Code len: {len(jsCode)})")
            if 'articlePool' in jsCode:
                print("    -> FOUND articlePool in code!")
            if 'allZenPhotos' in jsCode:
                print("    -> FOUND allZenPhotos in code!")
            if 'og:image' in jsCode:
                print("    -> FOUND og:image in code!")

ssh.close()
