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

# Check container status
stdin, stdout, stderr = ssh.exec_command('docker ps --filter name=n8n --format "Container {{.Names}}: {{.Status}} (Ports: {{.Ports}})"')
print("Docker container:\n", stdout.read().decode())

# Check crontab
stdin, stdout, stderr = ssh.exec_command('crontab -l')
print("VPS Crontab:\n", stdout.read().decode())

# Check recent n8n logs
stdin, stdout, stderr = ssh.exec_command('docker logs --tail 15 $(docker ps -q -f name=n8n)')
print("Recent n8n logs:\n", stdout.read().decode())

ssh.close()
