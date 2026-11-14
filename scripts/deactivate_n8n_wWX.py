import paramiko
import sys

import subprocess
import time

cmd_knock = 'curl.exe -s -m 5 -A "Mozilla/5.0" http://103.157.218.111:60000/C1sco1234'
subprocess.run(cmd_knock, shell=True)
time.sleep(2)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10)

py_code = """
import sqlite3
conn = sqlite3.connect('/root/n8n_data/database.sqlite')
c = conn.cursor()
c.execute("UPDATE workflow_entity SET active = 0 WHERE id = 'wWXJoMhbchKzrkqr'")
conn.commit()
print("Deactivated wWXJoMhbchKzrkqr in n8n successfully!")
conn.close()
"""
sftp = ssh.open_sftp()
with sftp.file('/tmp/deact.py', 'w') as f:
    f.write(py_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command("python3 /tmp/deact.py && docker restart $(docker ps -q -f name=n8n)")
print(stdout.read().decode('utf-8'))
ssh.close()
