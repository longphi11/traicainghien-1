import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

script_sh = """
CID=$(docker ps -q -f name=n8n)
echo "Container: $CID"
docker exec $CID ip route show
docker exec $CID sh -c 'nc -zv 172.17.0.1 11985 2>&1 || true'
docker exec $CID sh -c 'wget -q -O- --timeout=2 http://172.17.0.1:60000/C1sco1234 || true'
"""
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{script_sh}'")
print(stdout.read().decode())
print(stderr.read().decode())
ssh.close()
