import paramiko
import sys
import time

print("Connecting SSH...", flush=True)
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
print("SSH Connected!", flush=True)

sftp = ssh.open_sftp()
sftp.put('scripts/flow_01_updated.json', '/root/flow_01_updated.json')
sftp.close()
print("Uploaded flow_01_updated.json to /root on VPS", flush=True)

cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n)
docker cp /root/flow_01_updated.json $CONTAINER_ID:/tmp/flow_01_updated.json
docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_01_updated.json
docker exec $CONTAINER_ID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true
docker exec $CONTAINER_ID n8n list:workflows
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
print("CMD Output:\n" + stdout.read().decode(), flush=True)
print("CMD Stderr:\n" + stderr.read().decode(), flush=True)

ssh.close()
print("DONE!", flush=True)
