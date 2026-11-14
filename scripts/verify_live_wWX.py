import paramiko
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(
    '103.157.218.111',
    port=11985,
    username='root',
    password='TCN@Root2026#Secure',
    timeout=10,
    banner_timeout=15,
    look_for_keys=False,
    allow_agent=False
)

remote_script = """
import sqlite3
import json

db_path = '/root/n8n_data/database.sqlite'
conn = sqlite3.connect(db_path)
c = conn.cursor()
c.execute("SELECT id, name, active, nodes, connections FROM workflow_entity WHERE id = 'wWXJoMhbchKzrkqr'")
row = c.fetchone()
if row:
    print(f"ID: {row[0]}")
    print(f"Name: {row[1]}")
    print(f"Active: {bool(row[2])}")
    nodes = json.loads(row[3])
    print("Nodes count:", len(nodes))
    for n in nodes:
        print(f" - {n.get('name')} ({n.get('type')})")
    conns = json.loads(row[4])
    print("Connections:")
    print(json.dumps(conns, indent=2))
else:
    print("Workflow not found!")

conn.close()
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/verify_wf.py', 'w') as f:
    f.write(remote_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command("python3 /tmp/verify_wf.py")
print(stdout.read().decode('utf-8'))
print(stderr.read().decode('utf-8'))

ssh.close()
