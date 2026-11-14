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

cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
echo "Restarting n8n container $CONTAINER_ID..."
docker restart $CONTAINER_ID
sleep 6
echo "Checking n8n status:"
docker ps -f name=n8n
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
print("Restart output:\n" + stdout.read().decode('utf-8'))
print("Restart errors:\n" + stderr.read().decode('utf-8'))

# Now verify workflows status
cmd2 = 'CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CONTAINER_ID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd2)
raw = stdout.read().decode('utf-8')
workflows = json.loads(raw)
print("\n=== CURRENT WORKFLOWS STATUS ===")
for wf in workflows:
    print(f"ID: {wf.get('id')} | Active: {wf.get('active')} | Name: {wf.get('name')}")

ssh.close()
