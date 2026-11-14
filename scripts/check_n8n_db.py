import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            break
    except:
        time.sleep(1)

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

# Check workflows in n8n database via sqlite or export
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) n8n export:workflow --all')
print("All exported workflows snippet:\n", stdout.read().decode()[:1000])

stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) sqlite3 /home/node/.n8n/database.sqlite "SELECT id, name, active FROM workflow_entity;"')
print("Workflows in sqlite:\n", stdout.read().decode())

ssh.close()
