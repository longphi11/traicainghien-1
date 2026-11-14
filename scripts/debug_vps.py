import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(3):
    try:
        req = urllib.request.Request('http://vn1.1921992.xyz:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        urllib.request.urlopen(req, timeout=4)
        print(f"Knock success on attempt {attempt+1}")
        break
    except Exception as e:
        time.sleep(1)

time.sleep(3)

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect('vn1.1921992.xyz', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)
    
    # 1. Read cron_focus.log
    stdin, stdout, stderr = ssh.exec_command('tail -n 100 /root/traicainghien/cron_focus.log')
    print("=== CRON_FOCUS.LOG ===")
    print(stdout.read().decode())

    # 2. Check git status on VPS
    stdin, stdout, stderr = ssh.exec_command('cd /root/traicainghien && git status && git log -n 3 --oneline')
    print("=== GIT ON VPS ===")
    print(stdout.read().decode())

    # 3. Check n8n logs
    stdin, stdout, stderr = ssh.exec_command('docker logs --tail 50 $(docker ps -q -f name=n8n)')
    print("=== DOCKER N8N LOGS ===")
    print(stdout.read().decode())

    ssh.close()
except Exception as e:
    print('SSH error:', e)
