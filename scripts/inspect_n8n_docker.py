import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

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

cmd = 'docker inspect $(docker ps -q -f name=n8n) | grep -A 30 "Mounts"'
stdin, stdout, stderr = ssh.exec_command(cmd)
print("=== N8N DOCKER MOUNTS ===")
print(stdout.read().decode())

cmd2 = 'docker inspect $(docker ps -q -f name=n8n) | grep -A 20 "Env"'
stdin, stdout, stderr = ssh.exec_command(cmd2)
print("=== N8N DOCKER ENV ===")
print(stdout.read().decode())

ssh.close()
