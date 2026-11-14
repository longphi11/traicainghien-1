import subprocess
import paramiko
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("1. Knocking port 60000...")
cmd_knock = 'curl.exe -s -m 5 -A "Mozilla/5.0" http://103.157.218.111:60000/C1sco1234'
subprocess.run(cmd_knock, shell=True)
time.sleep(2)

print("2. Connecting SSH...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('103.157.218.111', port=11985, username='root', password='TCN@Root2026#Secure', timeout=10)
print("SSH Connected!")

sftp = ssh.open_sftp()
sftp.put('scripts/daily_news_dispatcher.py', '/root/traicainghien/scripts/daily_news_dispatcher.py')
print("Uploaded daily_news_dispatcher.py to /root/traicainghien/scripts/")
sftp.close()

# Update crontab to run daily_news_dispatcher at 08:30, 15:00, 20:30 VN time
# 08:30 VN = 01:30 UTC -> 30 1 * * *
# 15:00 VN = 08:00 UTC -> 0 8 * * *
# 20:30 VN = 13:30 UTC -> 30 13 * * *
cron_lines = """0 3 * * * cd /root/traicainghien && python3 scripts/omnichannel_dispatcher.py --topic focus >> /root/traicainghien/cron_focus.log 2>&1
0 14 * * * cd /root/traicainghien && python3 scripts/omnichannel_dispatcher.py --topic habit >> /root/traicainghien/cron_habit.log 2>&1
30 23 * * * cd /root/traicainghien && python3 scripts/telegram_reporter.py --type morning >> /root/traicainghien/cron_morning.log 2>&1
30 15 * * * cd /root/traicainghien && python3 scripts/telegram_reporter.py --type audit >> /root/traicainghien/cron_audit.log 2>&1
30 1 * * * cd /root/traicainghien && python3 scripts/daily_news_dispatcher.py >> /root/traicainghien/cron_daily_news.log 2>&1
0 8 * * * cd /root/traicainghien && python3 scripts/daily_news_dispatcher.py >> /root/traicainghien/cron_daily_news.log 2>&1
30 13 * * * cd /root/traicainghien && python3 scripts/daily_news_dispatcher.py >> /root/traicainghien/cron_daily_news.log 2>&1
"""

sftp = ssh.open_sftp()
with sftp.file('/root/cron_jobs.txt', 'w') as f:
    f.write(cron_lines)
sftp.close()

stdin, stdout, stderr = ssh.exec_command('crontab /root/cron_jobs.txt && crontab -l')
print("Active VPS Crontab:\n" + stdout.read().decode('utf-8'))
ssh.close()
print("All synced to VPS successfully!")
