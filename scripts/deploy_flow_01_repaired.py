import urllib.request
import time
import paramiko
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

def attempt_deploy():
    print("1. Gửi gói tin bảo vệ Port Knocking tới port 60000...")
    knock_success = False
    for host in ['103.157.218.111', 'vn1.1921992.xyz']:
        try:
            req = urllib.request.Request(f'http://{host}:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as r:
                print(f"   -> Knock {host} thành công (HTTP {r.status})!")
                knock_success = True
                break
        except Exception as e:
            print(f"   -> Knock {host} note: {e}")

    if not knock_success:
        print("Knock không phản hồi (có thể do firewall đang tạm rate-limit IP hiện tại).")
        return False

    print("2. Đợi 2 giây và kết nối SSH tới port 11985...")
    time.sleep(2)
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
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
        print("   -> Kết nối SSH thành công!")
    except Exception as e:
        print(f"   -> Kết nối SSH lỗi: {e}")
        return False

    # 3. Upload flow_01_repaired.json
    print("3. Tải file flow_01_repaired.json lên VPS...")
    sftp = ssh.open_sftp()
    sftp.put('scripts/flow_01_repaired.json', '/root/flow_01_repaired.json')
    sftp.close()
    print("   -> Đã tải xong lên /root/flow_01_repaired.json")

    # 4. Import workflow vào n8n container và kích hoạt duy nhất wWXJoMhbchKzrkqr
    print("4. Import workflow vào container n8n...")
    cmd = '''
    CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
    if [ -z "$CONTAINER_ID" ]; then
        echo "Error: n8n container not found!"
        exit 1
    fi
    docker cp /root/flow_01_repaired.json $CONTAINER_ID:/tmp/flow_01_repaired.json
    docker exec $CONTAINER_ID n8n import:workflow --input=/tmp/flow_01_repaired.json
    docker exec $CONTAINER_ID n8n update:workflow --id=wWXJoMhbchKzrkqr --active=true
    docker restart $CONTAINER_ID
    sleep 5
    echo "=== WORKFLOW STATUS IN N8N ==="
    docker exec $CONTAINER_ID n8n list:workflows
    '''
    stdin, stdout, stderr = ssh.exec_command(cmd)
    output = stdout.read().decode('utf-8')
    err_out = stderr.read().decode('utf-8')
    print("Output:\n" + output)
    if err_out:
        print("Errors:\n" + err_out)

    ssh.close()
    print("=== Flow 01 đã được cập nhật và kích hoạt thành công trên n8n! ===")
    return True

if __name__ == '__main__':
    attempt_deploy()
