import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

for w in wfs:
    if w['id'] == 'wWXJoMhbchKzrkqr':
        print("=== FLOW 01 (wWXJoMhbchKzrkqr) ===")
        for n in w['nodes']:
            print(f"Node: {n['name']} ({n['type']})")
            if 'parameters' in n and 'jsCode' in n['parameters']:
                print(f"--- Code for {n['name']} ---")
                print(n['parameters']['jsCode'])
    elif w['id'] == 'E6PVBHKrtYPlfevu':
        print("\n=== FLOW 02 (E6PVBHKrtYPlfevu) ===")
        for n in w['nodes']:
            print(f"Node: {n['name']} ({n['type']})")
            if 'parameters' in n and 'jsCode' in n['parameters']:
                print(f"--- Code for {n['name']} ---")
                print(n['parameters']['jsCode'])
            if 'parameters' in n and 'url' in n['parameters']:
                print(f"--- HTTP for {n['name']}: {n['parameters'].get('url')} ---")
                print(n['parameters'])
