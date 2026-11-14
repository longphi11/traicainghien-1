import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Ensure knock
print("Knocking port 60000...")
for _ in range(5):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=3) as r:
            print("Knock OK")
            break
    except Exception as e:
        print("Knock retry:", e)
        time.sleep(1)

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

# Official 3 workflows that MUST be ACTIVE:
# 1. wWXJoMhbchKzrkqr (Flow 01: Ban Tin Tam Ly & Thoi Quen)
# 2. E6PVBHKrtYPlfevu (Flow 02: Loi Nhac Di Ngu)
# 3. Lj3wvfAe0CEqnWbQ (Flow 03: Dao YouTube & Xuat Ban Da Kenh)

# Duplicate / legacy workflows to DEACTIVATE:
deactivate_ids = [
    'yCJrtItjJqm3F7Ta',
    'Qv3Q45ctCtUykHmx',
    'bG48Cdxb2QBqiB0X', # <- THIS ONE CAUSED THE COVID PHOTO AND WRONG TEMPLATE!
    'VROpERUssjpf47lX',
    'SUtloagLCixIAdzJ',
    'mv1WKopmxMH2ZORM',
    'YqePn7jWibu9N2vz',
    'RbeskJI2DdKZEuqx',
    '34sUV6RHvQMR2pWv'
]

activate_ids = [
    'wWXJoMhbchKzrkqr',
    'E6PVBHKrtYPlfevu',
    'Lj3wvfAe0CEqnWbQ'
]

cmd = '''
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
echo "Container ID: $CONTAINER_ID"

# Deactivate legacy workflows
for id in {deact}; do
    echo "Deactivating $id..."
    docker exec $CONTAINER_ID n8n update:workflow --id=$id --active=false
done

# Ensure official workflows are active
for id in {act}; do
    echo "Activating official $id..."
    docker exec $CONTAINER_ID n8n update:workflow --id=$id --active=true
done
'''.format(deact=' '.join(deactivate_ids), act=' '.join(activate_ids))

stdin, stdout, stderr = ssh.exec_command(cmd)
print("Result:\n" + stdout.read().decode('utf-8'))
print("Errors:\n" + stderr.read().decode('utf-8'))

ssh.close()
print("Deactivation & activation complete!")
