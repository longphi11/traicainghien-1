import urllib.request
import time
import paramiko
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Knock port
knock_url = 'http://vn1.1921992.xyz:60000/C1sco1234'
req = urllib.request.Request(knock_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    urllib.request.urlopen(req, timeout=5)
    print('Knock sent successfully')
except Exception as e:
    print('Knock note:', e)

time.sleep(2)

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('vn1.1921992.xyz', port=11985, username='root', password='TCN@Root2026#Secure', timeout=15)
sftp = ssh.open_sftp()

# Upload scripts
sftp.put('scripts/telegram_reporter.py', '/root/traicainghien/scripts/telegram_reporter.py')
sftp.put('scripts/omnichannel_dispatcher.py', '/root/traicainghien/scripts/omnichannel_dispatcher.py')
print('Uploaded updated scripts to VPS')

# Setup crontab
# 30 23 * * * = 23:30 UTC = 06:30 AM VN time
# 0 3 * * *   = 03:00 UTC = 10:00 AM VN time
# 0 14 * * *  = 14:00 UTC = 21:00 PM VN time
# 30 15 * * * = 15:30 UTC = 22:30 PM VN time
cron_content = """0 3 * * * cd /root/traicainghien && python3 scripts/omnichannel_dispatcher.py --topic focus >> /root/traicainghien/cron_focus.log 2>&1
0 14 * * * cd /root/traicainghien && python3 scripts/omnichannel_dispatcher.py --topic habit >> /root/traicainghien/cron_habit.log 2>&1
30 23 * * * cd /root/traicainghien && python3 scripts/telegram_reporter.py --type morning >> /root/traicainghien/cron_morning.log 2>&1
30 15 * * * cd /root/traicainghien && python3 scripts/telegram_reporter.py --type audit >> /root/traicainghien/cron_audit.log 2>&1
"""

with sftp.open('/root/cron_jobs.txt', 'w') as f:
    f.write(cron_content)

stdin, stdout, stderr = ssh.exec_command('crontab /root/cron_jobs.txt')
stdout.channel.recv_exit_status()

stdin, stdout, stderr = ssh.exec_command('crontab -l')
print('Active VPS Crontab:\n' + stdout.read().decode())

ssh.close()
