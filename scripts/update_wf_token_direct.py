import time
import subprocess
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(5):
    print(f"Knock attempt {attempt + 1}...")
    res = subprocess.run('curl.exe -s -m 4 -A "Mozilla/5.0" http://103.157.218.111:60000/C1sco1234', shell=True, capture_output=True, text=True)
    if "OK" in res.stdout:
        print("Knock OK!")
        break
    time.sleep(2)

time.sleep(2)
try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10)
    print("SSH Connected!")

    # Update workflow nodes in sqlite directly
    py_code = """
import sqlite3
import json

db = '/root/n8n_data/database.sqlite'
conn = sqlite3.connect(db)
c = conn.cursor()
c.execute("SELECT nodes FROM workflow_entity WHERE id = 'wWXJoMhbchKzrkqr'")
row = c.fetchone()
if row:
    nodes = json.loads(row[0])
    updated = False
    for n in nodes:
        if n.get('name') == 'Gửi Telegram sendPhoto':
            url = n.get('parameters', {}).get('url', '')
            if 'AAEm8Fm77TROqU81PRhfWThlSqguMMZcfYs' in url:
                n['parameters']['url'] = url.replace('AAEm8Fm77TROqU81PRhfWThlSqguMMZcfYs', 'AAFnHi-ZCx7N576orPkdMqapeRLWfHQLH6Q')
                updated = True
                print("Updated bot token in node Gửi Telegram sendPhoto!")
            else:
                print("Token already up to date:", url[:45])
    if updated:
        c.execute("UPDATE workflow_entity SET nodes = ? WHERE id = 'wWXJoMhbchKzrkqr'", (json.dumps(nodes),))
        conn.commit()
        print("Database updated successfully!")
conn.close()
"""
    sftp = ssh.open_sftp()
    with sftp.file('/tmp/update_token.py', 'w') as f:
        f.write(py_code)
    sftp.close()

    stdin, stdout, stderr = ssh.exec_command("python3 /tmp/update_token.py && docker restart $(docker ps -q -f name=n8n)")
    print(stdout.read().decode('utf-8'))
    print(stderr.read().decode('utf-8'))
    ssh.close()
    print("ALL DONE!")
except Exception as e:
    print("SSH error:", e)
