import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n) && docker exec $CONTAINER_ID n8n export:workflow --id=wWXJoMhbchKzrkqr'
stdin, stdout, stderr = ssh.exec_command(cmd)
wf_json = stdout.read().decode('utf-8', errors='ignore')

wf = json.loads(wf_json)
nodes = wf[0]['nodes'] if isinstance(wf, list) else wf['nodes']
for n in nodes:
    if n.get('name') == 'Bóc Tách Ảnh Tác Giả & Kiểm Tra Trùng':
        print("Found node! First 300 chars of code:")
        print(n.get('parameters', {}).get('jsCode', '')[:300])

ssh.close()
