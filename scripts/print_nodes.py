import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

for w in wfs:
    print(f"\nWF {w['id']} ({w['name']}) Active: {w['active']}")
    for n in w['nodes']:
        print(f"  Node: {n['name']} | Type: {n['type']}")
        if 'telegram' in n['name'].lower() or 'telegram' in n['type'].lower():
            print(f"    Params: {n.get('parameters')}")
