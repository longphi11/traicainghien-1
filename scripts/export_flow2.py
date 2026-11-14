import urllib.request, time, paramiko, sys
sys.stdout.reconfigure(encoding='utf-8')

for _ in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: break
    except: time.sleep(1)

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

cmd = 'CONTAINER_ID=$(docker ps -q -f name=n8n) && docker exec $CONTAINER_ID n8n export:workflow --id=E6PVBHKrtYPlfevu'
stdin, stdout, stderr = ssh.exec_command(cmd)
wf_json = stdout.read().decode()

with open('scripts/flow_02_current.json', 'w', encoding='utf-8') as f:
    f.write(wf_json)

print('Exported flow 02 successfully! Size:', len(wf_json))
ssh.close()
