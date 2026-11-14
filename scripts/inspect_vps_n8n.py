import urllib.request
import time
import paramiko
import json

# Knock port
try:
    req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=5) as r:
        print('Knock:', r.status)
except Exception as e:
    print('Knock err:', e)

time.sleep(1)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10)
print('Connected SSH!')

# Get docker containers
stdin, stdout, stderr = ssh.exec_command('docker ps --format "{{.ID}} {{.Names}}"')
containers = stdout.read().decode('utf-8')
print('Containers:\n', containers)

# Export workflow wWXJoMhbchKzrkqr
cmd = 'CID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CID n8n export:workflow --id=wWXJoMhbchKzrkqr'
stdin, stdout, stderr = ssh.exec_command(cmd)
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')
print('Export stdout len:', len(out), 'err:', err)
with open('scripts/vps_exported_wWX.json', 'w', encoding='utf-8') as f:
    f.write(out)

# Check all workflows in n8n database or sqlite
cmd2 = 'CID=$(docker ps -q -f name=n8n | head -n 1); docker exec $CID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(cmd2)
all_wf = stdout.read().decode('utf-8')
print('All workflows len:', len(all_wf))
with open('scripts/vps_all_workflows.json', 'w', encoding='utf-8') as f:
    f.write(all_wf)

ssh.close()
