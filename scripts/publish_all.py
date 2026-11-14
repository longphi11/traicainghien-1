import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(5):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as r:
            if r.status == 200:
                print("Knock OK")
                break
    except:
        time.sleep(2)

time.sleep(3)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

# List workflows
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) n8n list:workflow')
out_list = stdout.read().decode()
print("Workflows list:\n", out_list)

# Publish workflow yCJrtItjJqm3F7Ta and any others
for line in out_list.splitlines():
    if '|' in line:
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 2 and parts[0] != 'ID':
            w_id = parts[0]
            print(f"Publishing workflow {w_id}...")
            stdin2, stdout2, stderr2 = ssh.exec_command(f'docker exec $(docker ps -q -f name=n8n) n8n publish:workflow --id={w_id}')
            print(stdout2.read().decode())

# Restart container
stdin, stdout, stderr = ssh.exec_command('docker restart $(docker ps -q -f name=n8n)')
stdout.channel.recv_exit_status()
print("Restarted container!")

time.sleep(6)
stdin, stdout, stderr = ssh.exec_command('docker logs --tail 25 $(docker ps -q -f name=n8n)')
print("New logs:\n", stdout.read().decode())

ssh.close()
