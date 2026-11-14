import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/flow_01_updated.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if isinstance(data, list):
    wf = data[0]
else:
    wf = data

for node in wf.get('nodes', []):
    print(f"Node: {node.get('name')} ({node.get('type')})")
    code = node.get('parameters', {}).get('jsCode', '')
    if code:
        print("--- JS CODE ---")
        print(code[:1500])
        print("===============")
