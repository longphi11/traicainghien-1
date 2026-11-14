import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for host in ['103.157.218.111', 'vn1.1921992.xyz']:
    try:
        req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            print(f'Knock {host} OK')
    except Exception as e:
        print(f'Knock {host} err: {e}')

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
print('Connected SSH!')

# Check active workflows
cmd_list = "CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1) && docker exec $CONTAINER_ID n8n list:workflows"
stdin, stdout, stderr = ssh.exec_command(cmd_list)
print("=== N8N WORKFLOWS ===")
print(stdout.read().decode())

# Export flow 01
cmd_exp = "CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1) && docker exec $CONTAINER_ID n8n export:workflow --id=wWXJoMhbchKzrkqr"
stdin, stdout, stderr = ssh.exec_command(cmd_exp)
out = stdout.read().decode()
with open('scripts/vps_wWXJoMhbchKzrkqr.json', 'w', encoding='utf-8') as f:
    f.write(out)
print('Exported wWXJoMhbchKzrkqr, size:', len(out))

# Check docker logs of n8n around 20:30
cmd_logs = "CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1) && docker logs --tail 100 $CONTAINER_ID"
stdin, stdout, stderr = ssh.exec_command(cmd_logs)
logs = stdout.read().decode()
print("=== RECENT N8N LOGS (sample) ===")
print(logs[-1500:])

ssh.close()
