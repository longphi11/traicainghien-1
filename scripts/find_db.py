import paramiko
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

cmd = 'find / -name "database.sqlite" 2>/dev/null'
stdin, stdout, stderr = ssh.exec_command(cmd)
print("Sqlite db path:\n" + stdout.read().decode())

cmd2 = 'CID=$(docker ps -q -f name=n8n) && docker exec $CID n8n export:workflow --all'
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{cmd2}'")
export_str = stdout.read().decode('utf-8', errors='ignore')
print("Export all length:", len(export_str))

import json
try:
    all_wf = json.loads(export_str)
    for w in all_wf:
        print(f"Workflow: ID={w.get('id')}, Name={w.get('name')}, Active={w.get('active')}")
except Exception as e:
    print("JSON parse error:", e)

ssh.close()
