import urllib.request
import time
import paramiko

for _ in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: break
    except:
        time.sleep(1)

time.sleep(2)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

# Start a temporary python HTTP server on host port 8888
cmd1 = 'python3 -m http.server 8888 --bind 0.0.0.0 >/dev/null 2>&1 &'
ssh.exec_command(cmd1)
time.sleep(1)

# Test if n8n container can curl 172.17.0.1:8888
cmd2 = '''
CID=$(docker ps -q -f name=n8n)
docker exec $CID sh -c "wget -q -O- --timeout=3 http://172.17.0.1:8888" | head -n 5
'''
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{cmd2}'")
print("Curl from n8n to host:\n" + stdout.read().decode())
print("Stderr:\n" + stderr.read().decode())

# Kill test server
ssh.exec_command('pkill -f "http.server 8888"')
ssh.close()
