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

# Official 3 workflows that MUST BE KEPT:
# 1. wWXJoMhbchKzrkqr
# 2. E6PVBHKrtYPlfevu
# 3. Lj3wvfAe0CEqnWbQ

# List of 9 legacy IDs to permanently delete:
delete_ids = [
    'yCJrtItjJqm3F7Ta',
    'YqePn7jWibu9N2vz',
    'Qv3Q45ctCtUykHmx',
    'RbeskJI2DdKZEuqx',
    'bG48Cdxb2QBqiB0X',
    '34sUV6RHvQMR2pWv',
    'VROpERUssjpf47lX',
    'SUtloagLCixIAdzJ',
    'mv1WKopmxMH2ZORM'
]

ids_tuple = tuple(delete_ids)

cmd = f'''python3 -c "
import sqlite3

con = sqlite3.connect('/root/n8n_data/database.sqlite')
cur = con.cursor()

ids = {ids_tuple}
print('Checking before delete:')
cur.execute(f'SELECT id, name, active FROM workflow_entity WHERE id IN ({{','.join(['?']*len(ids))}})', ids)
rows = cur.fetchall()
for r in rows:
    print('Found to delete:', r)

# Execute DELETE on workflow_entity and related tables (workflow_history, shared_workflow, execution_entity)
cur.execute(f'DELETE FROM workflow_entity WHERE id IN ({{','.join(['?']*len(ids))}})', ids)
print('Deleted from workflow_entity, rowcount:', cur.rowcount)

try:
    cur.execute(f'DELETE FROM workflow_history WHERE workflowId IN ({{','.join(['?']*len(ids))}})', ids)
    print('Deleted from workflow_history, rowcount:', cur.rowcount)
except Exception as e:
    print('workflow_history note:', e)

try:
    cur.execute(f'DELETE FROM shared_workflow WHERE workflowId IN ({{','.join(['?']*len(ids))}})', ids)
    print('Deleted from shared_workflow, rowcount:', cur.rowcount)
except Exception as e:
    print('shared_workflow note:', e)

con.commit()

print('\nRemaining workflows in database:')
cur.execute('SELECT id, name, active FROM workflow_entity')
for r in cur.fetchall():
    print('REMAINING:', r)

con.close()
"'''

stdin, stdout, stderr = ssh.exec_command(cmd)
print("Delete Output:\n" + stdout.read().decode('utf-8'))
print("Delete Stderr:\n" + stderr.read().decode('utf-8'))

# Now restart n8n container to reload clean database
print("Restarting n8n container...")
cmd_restart = '''
CONTAINER_ID=$(docker ps -q -f name=n8n | head -n 1)
docker restart $CONTAINER_ID
sleep 6
echo "Container status:"
docker ps -f name=n8n
'''
stdin, stdout, stderr = ssh.exec_command(cmd_restart)
print("Restart Output:\n" + stdout.read().decode('utf-8'))

ssh.close()
print("=== Permanent cleanup complete! ===")
