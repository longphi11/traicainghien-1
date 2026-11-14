import sqlite3

con = sqlite3.connect('/root/n8n_data/database.sqlite')
cur = con.cursor()

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

placeholders = ','.join(['?'] * len(delete_ids))

print("=== WORKFLOWS FOUND TO DELETE ===")
cur.execute(f"SELECT id, name, active FROM workflow_entity WHERE id IN ({placeholders})", delete_ids)
for r in cur.fetchall():
    print(r)

# Delete from workflow_entity
cur.execute(f"DELETE FROM workflow_entity WHERE id IN ({placeholders})", delete_ids)
print("Deleted from workflow_entity, count:", cur.rowcount)

# Delete from related tables if exist
for table, col in [('workflow_history', 'workflowId'), ('shared_workflow', 'workflowId'), ('workflow_tag_mapping', 'workflowId')]:
    try:
        cur.execute(f"DELETE FROM {table} WHERE {col} IN ({placeholders})", delete_ids)
        print(f"Deleted from {table}, count:", cur.rowcount)
    except Exception as e:
        print(f"Table {table} note:", e)

con.commit()

print("\n=== REMAINING ACTIVE WORKFLOWS IN N8N DATABASE ===")
cur.execute("SELECT id, name, active FROM workflow_entity")
for r in cur.fetchall():
    print("REMAINING:", r)

con.close()
