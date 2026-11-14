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

cmd = '''python3 -c "
import sqlite3, json
con = sqlite3.connect('/root/n8n_data/database.sqlite')
cur = con.cursor()
rows = cur.execute('SELECT id, workflowId, status, startedAt, stoppedAt FROM execution_entity ORDER BY id DESC LIMIT 15').fetchall()
for r in rows:
    print(r)
"'''
stdin, stdout, stderr = ssh.exec_command(cmd)
print("Executions:\n", stdout.read().decode('utf-8'))
print("Stderr:\n", stderr.read().decode('utf-8'))

ssh.close()
