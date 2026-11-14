import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import paramiko
import time

try:
    req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=5) as r:
        print('Knocked port 60000:', r.status)
except Exception as e:
    print('Knock err:', e)

time.sleep(1)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)
    print('SSH Connected successfully!')
    
    # 1. Grep for bot token on VPS
    stdin, stdout, stderr = ssh.exec_command('grep -rn "9249970693" /root/ 2>/dev/null')
    output = stdout.read().decode('utf-8', errors='ignore')
    print('--- GREP TOKEN ON VPS ---')
    print(output)
    
    # 2. Check running processes on VPS
    stdin, stdout, stderr = ssh.exec_command('ps aux | grep -v "ps aux" | grep -v grep')
    ps_output = stdout.read().decode('utf-8', errors='ignore')
    print('--- RUNNING PROCESSES ON VPS ---')
    for line in ps_output.split('\n'):
        if any(k in line.lower() for k in ['tele', 'bot', 'may', 'trai', 'python', 'node']):
            print(line)

    ssh.close()
except Exception as e:
    print('SSH error:', e)
