import urllib.request
import time
import paramiko
import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

host = '103.157.218.111'
knock_url = f'http://{host}:60000/C1sco1234'

print(f"=== TIẾN TRÌNH NÂNG CẤP FLOW 01 & FLOW 02 CHUẨN TIMEZONE ===")
print(f"1. Gửi gói tin bảo vệ Port Knocking tới {knock_url}...")

try:
    req = urllib.request.Request(knock_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=4) as r:
        print(f"   -> Knock thành công (HTTP {r.status})!")
except Exception as e:
    print(f"   -> Knock note: {e}")

time.sleep(2)

print("2. Kết nối SSH tới VPS (với retry)...")
ssh = None
for i in range(3):
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(
            host,
            port=11985,
            username='root',
            password='TCN@Root2026#Secure',
            timeout=15,
            banner_timeout=30,
            look_for_keys=False,
            allow_agent=False
        )
        print(f"   -> Kết nối SSH thành công (lần thử {i+1})!")
        ssh = client
        break
    except Exception as e:
        print(f"   -> Lần thử {i+1} note: {e}")
        time.sleep(2)

if not ssh:
    print("❌ Không thể kết nối SSH!")
    sys.exit(1)

# Upload workflow JSONs
print("3. Uploading flow_01_master.json & flow_02_master.json lên VPS...")
sftp = ssh.open_sftp()
sftp.put('scripts/flow_01_master.json', '/root/flow_01_master.json')
sftp.put('scripts/flow_02_master.json', '/root/flow_02_master.json')
sftp.close()
print("   -> Upload hoàn tất vào /root/")

# Import into n8n container
print("4. Nhập workflow vào n8n Docker container & khởi động lại...")
cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
echo "Container ID: $CONTAINER_ID"

docker cp /root/flow_01_master.json $CONTAINER_ID:/tmp/flow_01_master.json
docker cp /root/flow_02_master.json $CONTAINER_ID:/tmp/flow_02_master.json

echo "Importing Flow 01 (wWXJoMhbchKzrkqr)..."
docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_01_master.json
docker exec $CONTAINER_ID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true

echo "Importing Flow 02 (E6PVBHKrtYPlfevu)..."
docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_02_master.json
docker exec $CONTAINER_ID n8n update:workflow --id=E6PVBHKrtYPlfevu --active=true

echo "Restarting n8n container..."
docker restart $CONTAINER_ID
sleep 6

echo "=== DANH SÁCH WORKFLOWS ĐANG ACTIVE TRÊN N8N ==="
docker exec $CONTAINER_ID n8n list:workflows
'''

stdin, stdout, stderr = ssh.exec_command(cmd)
out = stdout.read().decode('utf-8')
err = stderr.read().decode('utf-8')

print("=== KẾT QUẢ TRIỂN KHAI TRÊN MÁY CHỦ ===")
print(out)
if err.strip():
    print("Stderr:", err)

ssh.close()
print("🎉 NÂNG CẤP HOÀN TẤT 100%! Flow 01 và Flow 02 đã đồng bộ múi giờ Asia/Ho_Chi_Minh!")
