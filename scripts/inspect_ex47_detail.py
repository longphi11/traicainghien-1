import urllib.request
import time
import paramiko
import sys

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

# Inspect why execution 47 failed at 21:00 tonight (13/11)
remote_code = """
import sqlite3
import json

db_path = '/root/n8n_data/database.sqlite'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Get execution 47
c.execute("SELECT data FROM execution_data WHERE executionId = '47'")
row = c.fetchone()
if row:
    raw = row[0]
    # search for HTTP error or 500 details
    idx = raw.find('500')
    if idx != -1:
        print("Found 500 around index:", raw[max(0, idx-200):idx+500])
    idx2 = raw.find('error')
    print("Substring around error:")
    print(raw[:1500])

conn.close()
"""

sftp = ssh.open_sftp()
with sftp.file('/tmp/inspect_ex47.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/inspect_ex47.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
