import urllib.request
import time
import paramiko
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
ssh.connect(
    '103.157.218.111',
    port=11985,
    username='root',
    password='TCN@Root2026#Secure',
    timeout=15,
    banner_timeout=20,
    look_for_keys=False,
    allow_agent=False
)
print("Connected SSH successfully!")

sftp = ssh.open_sftp()
sftp.put('scripts/vps_delete_script.py', '/root/vps_delete_script.py')
sftp.close()
print("Uploaded vps_delete_script.py")

cmd = '''
python3 /root/vps_delete_script.py
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
docker restart $CONTAINER_ID
sleep 6
echo "Workflows via n8n CLI:"
docker exec $CONTAINER_ID n8n export:workflow --all
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
print("Output:\n" + stdout.read().decode('utf-8'))
print("Errors:\n" + stderr.read().decode('utf-8'))

ssh.close()
