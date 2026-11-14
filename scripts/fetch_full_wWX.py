import urllib.request
import time
import paramiko
import sys
import json

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

# Export workflow wWXJoMhbchKzrkqr
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) n8n export:workflow --id=wWXJoMhbchKzrkqr')
wf_data = stdout.read().decode('utf-8')
with open('scripts/vps_wWX_full.json', 'w', encoding='utf-8') as f:
    f.write(wf_data)

# Let's inspect the execution log or table
stdin, stdout, stderr = ssh.exec_command('docker exec $(docker ps -q -f name=n8n) node -e "const { default: Database } = require(\'better-sqlite3\'); const db = new Database(\'/home/node/.n8n/database.sqlite\'); const rows = db.prepare(\'SELECT id, workflowId, status, startedAt, stoppedAt FROM execution_entity ORDER BY id DESC LIMIT 10\').all(); console.log(JSON.stringify(rows, null, 2));"')
print("Recent Executions:\n", stdout.read().decode('utf-8'))
print("Stderr:\n", stderr.read().decode('utf-8'))

ssh.close()
