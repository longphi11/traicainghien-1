import urllib.request
import time
import socket
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Knock
req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=5) as r:
    print('Knock status:', r.status)

time.sleep(2)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

# Check SSH to GitHub
stdin, stdout, stderr = ssh.exec_command('cat /root/.ssh/id_ed25519.pub')
print('VPS Public SSH Key:\n', stdout.read().decode())

stdin, stdout, stderr = ssh.exec_command('ssh -o StrictHostKeyChecking=no -T git@github.com')
print('SSH git@github.com stdout:\n', stdout.read().decode())
print('SSH git@github.com stderr:\n', stderr.read().decode())

# Check git status in /root/traicainghien
stdin, stdout, stderr = ssh.exec_command('cd /root/traicainghien && git status -s && git log -n 2 --oneline')
print('Git status & log:\n', stdout.read().decode())

ssh.close()
