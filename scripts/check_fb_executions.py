import urllib.request
import time
import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

for attempt in range(3):
    try:
        req = urllib.request.Request('http://103.157.218.111:60000/C1sco1234', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=4) as r:
            break
    except:
        time.sleep(1)

time.sleep(2)
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)

remote_code = '''
import sqlite3
import json

db_path = '/root/n8n_data/database.sqlite'
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Inspect nodes for E6PVBHKrtYPlfevu, wWXJoMhbchKzrkqr, Lj3wvfAe0CEqnWbQ
for wfid in ['E6PVBHKrtYPlfevu', 'wWXJoMhbchKzrkqr', 'Lj3wvfAe0CEqnWbQ']:
    c.execute("SELECT name, nodes FROM workflow_entity WHERE id = ?", (wfid,))
    name, nodes_json = c.fetchone()
    nodes = json.loads(nodes_json)
    print(f"\\n=================== WORKFLOW: {name} ({wfid}) ===================")
    for n in nodes:
        ntype = n.get('type')
        nname = n.get('name')
        if 'facebook' in ntype.lower() or 'facebook' in nname.lower() or 'http' in ntype.lower() or 'publish' in nname.lower():
            print(f"  Node: {nname} | Type: {ntype}")
            # print params
            params = n.get('parameters', {})
            # mask sensitive tokens
            p_str = json.dumps(params, ensure_ascii=False)
            if 'access_token' in p_str:
                p_str = p_str[:200] + "... [access_token masked]"
            print(f"    Params: {p_str[:300]}")
        else:
            print(f"  Node: {nname} | Type: {ntype}")

# Inspect execution 51 (E6PVBHKrtYPlfevu) - let's see what each node output was!
c.execute("SELECT data FROM execution_data WHERE executionId = '51'")
row = c.fetchone()
if row and row[0]:
    raw_str = row[0]
    # search for facebook or http response in raw_str
    print("\\n=== EXECUTION 51 (Nov 13 22:00 E6PVBHKrtYPlfevu) SEARCH FOR FB / HTTP ===")
    if 'facebook' in raw_str.lower():
        print("Found 'facebook' in execution 51 data!")
    else:
        print("'facebook' NOT found in execution 51 data!")
    
    # Let's inspect the flatted structure
    try:
        fl = json.loads(raw_str)
        # unflatten flatted if possible or print keys
        print("Root flatted length:", len(fl))
        print("Entry 0:", fl[0])
        print("Entry 2 (resultData):", fl[2] if len(fl)>2 else "")
    except Exception as e:
        print("Error inspecting flatted:", e)

# Also check execution 47 (error in Lj3wvfAe0CEqnWbQ)
c.execute("SELECT data FROM execution_data WHERE executionId = '47'")
row47 = c.fetchone()
if row47 and row47[0]:
    raw47 = row47[0]
    print("\\n=== EXECUTION 47 (Lj3wvfAe0CEqnWbQ) SEARCH FOR ERROR ===")
    try:
        fl47 = json.loads(raw47)
        print("Entry 2 (resultData):", fl47[2] if len(fl47)>2 else "")
        # Look for error string
        for idx, item in enumerate(fl47):
            if isinstance(item, dict) and 'message' in item:
                print(f"Item {idx} has message:", item)
    except Exception as e:
        print(e)

conn.close()
'''

sftp = ssh.open_sftp()
with sftp.file('/tmp/inspect_nodes.py', 'w') as f:
    f.write(remote_code)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('python3 /tmp/inspect_nodes.py')
print(stdout.read().decode())
print(stderr.read().decode())

ssh.close()
