/**
 * Facebook Fanpage Publisher - Agent 9
 * Trại Cai Nghiện Automation Engine
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local if not already loaded
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        val = val.trim().replace(/^['"](.*)['"]$/, '$1');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const PAGE_ID = process.env.FB_PAGE_ID;
const PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

if (!PAGE_ID || !PAGE_TOKEN) {
  console.error('Lỗi: Thiếu FB_PAGE_ID hoặc FB_PAGE_ACCESS_TOKEN trong .env.local');
  process.exit(1);
}

function requestGraphApi(endpoint, method = 'POST', data = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v20.0/${endpoint}?access_token=${PAGE_TOKEN}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.error) {
            reject(json.error);
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Đăng bài viết kèm First Comment tự động
 */
async function publishPost({ message, firstComment, link }) {
  try {
    console.log('🚀 Đang đăng bài lên Fanpage Trại Cai Nghiện...');
    const postPayload = { message };
    if (link) postPayload.link = link;

    const postRes = await requestGraphApi(`${PAGE_ID}/feed`, 'POST', postPayload);
    console.log(`✅ Đã đăng bài thành công! Post ID: ${postRes.id}`);

    if (firstComment) {
      console.log('💬 Đang ghim bình luận đầu tiên điều hướng...');
      const commentRes = await requestGraphApi(`${postRes.id}/comments`, 'POST', { message: firstComment });
      console.log(`✅ Đã ghim bình luận thành công! Comment ID: ${commentRes.id}`);
    }

    return postRes;
  } catch (err) {
    console.error('❌ Lỗi khi xuất bản lên Facebook:', err);
    throw err;
  }
}

module.exports = { publishPost, requestGraphApi };
