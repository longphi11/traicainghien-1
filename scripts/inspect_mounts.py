import urllib.request
import time
import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for host in ['103.157.218.111', 'vn1.1921992.xyz']:
    try:
        req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: pass
    except: pass

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15, banner_timeout=20)

cmd = 'docker inspect $(docker ps -q -f name=n8n | head -n 1) | grep -A 15 "Mounts"'
stdin, stdout, stderr = ssh.exec_command(cmd)
print("Mounts:\n", stdout.read().decode('utf-8'))

stdin, stdout, stderr = ssh.exec_command('which sqlite3')
print("Host sqlite3:", stdout.read().decode('utf-8'))

ssh.close()
