"""
Publisher Bridge Service for n8n (Trại Cai Nghiện)
Runs locally on VPS host, listening on port 5005.
Receives webhook from n8n to execute omnichannel_dispatcher.py and returns clean JSON.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
import urllib.parse
import os
import sys

PORT = 5005
BIND_HOST = "0.0.0.0"

class PublisherHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "service": "traicainghien-publisher-bridge"}).encode())
            return
            
        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path != "/publish":
            self.send_response(404)
            self.end_headers()
            return

        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length) if content_length > 0 else b"{}"
        
        try:
            body = json.loads(post_data.decode("utf-8")) if post_data else {}
        except:
            body = {}
            
        # Topic can be in JSON body or query param
        topic = body.get("topic", "focus")
        if not topic:
            query = urllib.parse.parse_qs(parsed_url.query)
            topic = query.get("topic", ["focus"])[0]
            
        if topic not in ["focus", "habit"]:
            topic = "focus"

        print(f"[{self.date_time_string()}] Received publish request for topic: {topic}", flush=True)

        # Run omnichannel_dispatcher.py
        cmd = [
            sys.executable,
            "/root/traicainghien/scripts/omnichannel_dispatcher.py",
            f"--topic={topic}"
        ]

        try:
            proc = subprocess.run(
                cmd,
                cwd="/root/traicainghien",
                capture_output=True,
                text=True,
                timeout=180
            )
            
            output = proc.stdout
            err_output = proc.stderr
            returncode = proc.returncode

            # Extract live website url and title if possible
            website_url = ""
            for line in output.splitlines():
                if "traicainghien.com/bai-viet/" in line:
                    website_url = line.strip().split()[-1]
                    break

            response_data = {
                "status": "success" if returncode == 0 else "error",
                "returncode": returncode,
                "topic": topic,
                "website_url": website_url,
                "stdout_snippet": output[-800:] if output else "",
                "stderr_snippet": err_output[-400:] if err_output else ""
            }

            self.send_response(200 if returncode == 0 else 500)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode("utf-8"))

        except subprocess.TimeoutExpired:
            self.send_response(504)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "message": "Execution timed out (180s)"}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode())

def run():
    server_address = (BIND_HOST, PORT)
    httpd = HTTPServer(server_address, PublisherHandler)
    print(f"🚀 Publisher Bridge Service running on {BIND_HOST}:{PORT}...", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

if __name__ == "__main__":
    run()
