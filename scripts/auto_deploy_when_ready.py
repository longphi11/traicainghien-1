import subprocess
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Bắt đầu tiến trình theo dõi và tự động nạp n8n ngay khi firewall sẵn sàng...")
for minute in range(1, 15):
    print(f"Kiểm tra kết nối tới VPS lần {minute}...")
    res = subprocess.run('curl.exe -s -m 4 -A "Mozilla/5.0" http://103.157.218.111:60000/C1sco1234', shell=True, capture_output=True, text=True)
    if "OK" in res.stdout:
        print("🎉 Knock thành công! Đang tiến hành nạp n8n workflow ngay lập tức...")
        import scripts.deploy_flow_01_repaired as deployer
        success = deployer.attempt_deploy()
        if success:
            print("=== HOÀN TẤT NẠP N8N WORKFLOW TRÊN VPS! ===")
            sys.exit(0)
    time.sleep(30)

print("Đã hết thời gian chờ tự động.")
