import urllib.request
import time
import paramiko
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

print("1. Knocking port 60000...")
for host in ['103.157.218.111', 'vn1.1921992.xyz']:
    try:
        req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            print(f"Knock {host} OK")
    except Exception as e:
        print(f"Knock {host} note: {e}")

time.sleep(2)
print("2. Connecting SSH...")
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

# Upload flow_01_master.json
print("3. Uploading flow_01_master.json to VPS...")
sftp = ssh.open_sftp()
sftp.put('scripts/flow_01_master.json', '/root/flow_01_master.json')
sftp.close()
print("Uploaded flow_01_master.json to /root")

# Import workflow into n8n container
print("4. Importing into n8n container...")
cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
docker cp /root/flow_01_master.json $CONTAINER_ID:/tmp/flow_01_master.json
docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_01_master.json
docker exec $CONTAINER_ID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true
docker restart $CONTAINER_ID
sleep 6
echo "Checking n8n workflows:"
docker exec $CONTAINER_ID n8n export:workflow --all
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
raw_out = stdout.read().decode('utf-8')
print("Import & Restart output:\n" + raw_out[:1500])

ssh.close()
print("=== Flow 01 Master successfully deployed! ===")
