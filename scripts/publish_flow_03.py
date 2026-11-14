import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

cmd = '''
CID=$(docker ps -q -f name=n8n)
echo "Publishing Flow 03..."
docker exec $CID n8n publish:workflow --id=Lj3wvfAe0CEqnWbQ
echo "Restarting n8n..."
docker restart $CID
'''

stdin, stdout, stderr = ssh.exec_command(f"bash -c '{cmd}'")
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
