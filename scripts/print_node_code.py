import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/flow_01_updated.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

wf = data[0] if isinstance(data, list) else data

for node in wf.get('nodes', []):
    if node.get('name') == 'Bóc Tách Ảnh Tác Giả & Kiểm Tra Trùng':
        print(node.get('parameters', {}).get('jsCode', ''))
