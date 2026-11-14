import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

for w in wfs:
    if w['id'] == 'Lj3wvfAe0CEqnWbQ':
        print("=== FLOW 03 (Lj3wvfAe0CEqnWbQ) ===")
        for n in w['nodes']:
            print(f"\n--- Node: {n['name']} ({n['type']}) ---")
            print(json.dumps(n.get('parameters', {}), ensure_ascii=False, indent=2))
