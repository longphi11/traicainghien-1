import urllib.request
import time
import paramiko
import sys

print("1. Knocking port 60000...", flush=True)
req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=5) as r:
    print("Knock success:", r.status, flush=True)

time.sleep(1)
print("2. Connecting SSH...", flush=True)
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
print("SSH Connected successfully!", flush=True)

# Upload updated workflow to VPS
print("3. Uploading flow_01_updated.json to VPS...", flush=True)
sftp = ssh.open_sftp()
sftp.put('scripts/flow_01_updated.json', '/root/flow_01_updated.json')
sftp.close()
print("Uploaded flow_01_updated.json to /root", flush=True)

# Import workflow into n8n container
print("4. Importing into n8n container...", flush=True)
cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n)
docker cp /root/flow_01_updated.json $CONTAINER_ID:/tmp/flow_01_updated.json
docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_01_updated.json
docker exec $CONTAINER_ID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
print("Import stdout:\n" + stdout.read().decode(), flush=True)
print("Import stderr:\n" + stderr.read().decode(), flush=True)

# Verify workflow status
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) n8n list:workflows')
print("Workflows list:\n" + stdout.read().decode(), flush=True)

ssh.close()
print("=== Flow 01 successfully deployed & updated on VPS! ===", flush=True)
