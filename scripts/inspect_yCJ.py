import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

for w in wfs:
    if w['id'] == 'yCJrtItjJqm3F7Ta':
        print("=== FLOW yCJrtItjJqm3F7Ta ===")
        for n in w['nodes']:
            print(f"\n--- Node: {n['name']} ({n['type']}) ---")
            print(json.dumps(n.get('parameters', {}), ensure_ascii=False, indent=2))
