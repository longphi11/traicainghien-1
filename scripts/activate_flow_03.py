import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10, banner_timeout=15, look_for_keys=False, allow_agent=False)

cmd = 'sqlite3 /root/n8n_data/database.sqlite "SELECT id, name, active FROM workflow_entity;"'
stdin, stdout, stderr = ssh.exec_command(cmd)
out = stdout.read().decode('utf-8', errors='ignore')
print("=== N8N WORKFLOWS IN DB ===")
print(out)

# If Flow 03 is active=0, activate it
flow03_id = None
for line in out.splitlines():
    if "Flow 03" in line:
        parts = line.split("|")
        flow03_id = parts[0].strip()
        is_active = parts[2].strip() if len(parts) > 2 else "0"
        print(f"Flow 03 ID: {flow03_id}, active: {is_active}")
        if is_active != "1":
            print(f"Activating Flow 03 ({flow03_id}) via sqlite...")
            ssh.exec_command(f'sqlite3 /root/n8n_data/database.sqlite "UPDATE workflow_entity SET active=1 WHERE id=\'{flow03_id}\';"')

# Also publish in n8n container
if flow03_id:
    cmd_pub = f'CID=$(docker ps -q -f name=n8n) && docker exec $CID n8n publish:workflow --id={flow03_id}'
    s_in, s_out, s_err = ssh.exec_command(f"bash -c '{cmd_pub}'")
    print("Publish output:\n", s_out.read().decode())

# Restart container to apply
ssh.exec_command('CID=$(docker ps -q -f name=n8n) && docker restart $CID')
print("Restarted container!")

# Check again
stdin, stdout, stderr = ssh.exec_command(cmd)
print("=== FINAL WORKFLOW STATUS ===")
print(stdout.read().decode('utf-8', errors='ignore'))

ssh.close()
