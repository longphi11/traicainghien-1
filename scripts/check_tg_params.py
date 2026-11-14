import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

for w in wfs:
    if w['id'] in ['yCJrtItjJqm3F7Ta', 'Qv3Q45ctCtUykHmx', 'bG48Cdxb2QBqiB0X', 'wWXJoMhbchKzrkqr']:
        print(f"\n=== WF {w['id']} ({w['name']}) Active: {w['active']} ===")
        for n in w['nodes']:
            if 'telegram' in n['type'].lower():
                print(f"  Node '{n['name']}' -> params: {n.get('parameters')}")
