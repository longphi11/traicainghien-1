import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/vps_all_workflows_raw.json', 'r', encoding='utf-8') as f:
    wfs = json.load(f)

print(f"Total workflows: {len(wfs)}")
for w in wfs:
    print(f"\nID: {w['id']} | Active: {w['active']} | Name: {w['name']}")
    for node in w['nodes']:
        ntype = node.get('type', '')
        nname = node.get('name', '')
        params = node.get('parameters', {})
        if 'telegram' in ntype.lower() or 'telegram' in nname.lower():
            print(f"   -> Telegram Node: '{nname}' | operation: {params.get('operation')} | chat: {params.get('chatId')}")
            photo = params.get('file') or params.get('additionalFields', {}).get('photo')
            if photo:
                print(f"      Photo param: {photo}")
        if 'schedule' in ntype.lower() or 'cron' in nname.lower() or 'lịch' in nname.lower():
            print(f"   -> Trigger Node: '{nname}' | params: {params}")
        if 'bóc tách' in nname.lower() or 'ghép' in nname.lower() or 'javascript' in ntype.lower() or 'code' in ntype.lower():
            code = params.get('jsCode', '')
            if 'articlePool' in code:
                print(f"   -> Code Node '{nname}' has articlePool (length: {len(code)})")
            if 'allZenPhotos' in code:
                print(f"   -> Code Node '{nname}' has allZenPhotos (length: {len(code)})")
            if 'og:image' in code:
                print(f"   -> Code Node '{nname}' has og:image logic")
