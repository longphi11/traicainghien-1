import paramiko
import sys

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
c.execute("SELECT id, name, active FROM workflow_entity")
rows = c.fetchall()
print(f"Total workflows in DB: {len(rows)}")
for r in rows:
    print(f"ID: {r[0]} | Active: {bool(r[2])} | Name: {r[1]}")

conn.close()
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/inspect_db.py', 'w') as f:
    f.write(remote_script)
sftp.close()

stdin, stdout, stderr = ssh.exec_command("python3 /tmp/inspect_db.py")
print(stdout.read().decode('utf-8'))
print(stderr.read().decode('utf-8'))

ssh.close()
