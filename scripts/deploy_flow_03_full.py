import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("1. Knocking port 60000...", flush=True)
for _ in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r: break
    except:
        time.sleep(1)

time.sleep(2)
print("2. Connecting SSH...", flush=True)
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
print("SSH Connected successfully!", flush=True)

# 3. Upload publisher bridge service
sftp = ssh.open_sftp()
sftp.put('scripts/publisher_bridge_service.py', '/root/traicainghien/scripts/publisher_bridge_service.py')
print("Uploaded publisher_bridge_service.py", flush=True)

# 4. Upload flow 03 json
sftp.put('scripts/flow_03_n8n.json', '/root/flow_03_n8n.json')
print("Uploaded flow_03_n8n.json", flush=True)
sftp.close()

# 5. Create systemd service for publisher bridge
systemd_unit = """[Unit]
Description=Trai Cai Nghien Publisher Bridge Service for n8n
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/traicainghien
ExecStart=/usr/bin/python3 /root/traicainghien/scripts/publisher_bridge_service.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
"""

setup_script = f"""
cat << 'EOF' > /etc/systemd/system/traicainghien-publisher.service
{systemd_unit}
EOF

systemctl daemon-reload
systemctl enable traicainghien-publisher
systemctl restart traicainghien-publisher
systemctl status traicainghien-publisher --no-pager
"""

stdin, stdout, stderr = ssh.exec_command(f"bash -c '{setup_script}'")
print("Systemd Service setup output:\n" + stdout.read().decode(), flush=True)

time.sleep(2)
# 6. Test health from host and from inside n8n
test_script = """
curl -s http://127.0.0.1:5005/health
echo ""
CID=$(docker ps -q -f name=n8n)
docker exec $CID sh -c "wget -q -O- http://172.17.0.1:5005/health"
echo ""
"""
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{test_script}'")
print("Health check output:\n" + stdout.read().decode(), flush=True)

# 7. Import flow 03 into n8n container
import_script = """
CID=$(docker ps -q -f name=n8n)
docker cp /root/flow_03_n8n.json $CID:/tmp/flow_03_n8n.json
docker exec $CID n8n import:workflow --input=/tmp/flow_03_n8n.json
"""
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{import_script}'")
print("Import Flow 03 output:\n" + stdout.read().decode(), flush=True)

# 8. List all workflows and activate Flow 03
list_script = """
CID=$(docker ps -q -f name=n8n)
docker exec $CID n8n export:workflow --all | grep -E '"name"|"id"|"active"' | head -n 30
"""
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{list_script}'")
print("Workflows list snippet:\n" + stdout.read().decode(), flush=True)

# 9. Clean up Linux crontab to avoid duplicate runs
clean_cron = """
crontab -l | grep -v 'omnichannel_dispatcher.py' > /tmp/new_cron
crontab /tmp/new_cron
crontab -l
"""
stdin, stdout, stderr = ssh.exec_command(f"bash -c '{clean_cron}'")
print("Updated Crontab:\n" + stdout.read().decode(), flush=True)

ssh.close()
print("🎉 ALL DONE! Flow 03 is now fully active inside n8n!", flush=True)
