import paramiko

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

script_sh = """
CID=$(docker ps -q -f name=n8n)
echo "Container ID: $CID"
docker cp /root/flow_01_updated.json $CID:/tmp/flow_01_updated.json
echo "CP done"
docker exec $CID n8n import:workflow --input=/tmp/flow_01_updated.json
echo "Import done"
docker exec $CID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true
echo "Update done"
docker exec $CID n8n list:workflows
"""

stdin, stdout, stderr = ssh.exec_command(f'bash -c \'{script_sh}\'')
print("=== STDOUT ===")
print(stdout.read().decode())
print("=== STDERR ===")
print(stderr.read().decode())

ssh.close()
