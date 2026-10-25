const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

// Locate service account key
const projectRoot = path.resolve(__dirname, '..');
const files = fs.readdirSync(projectRoot);
const keyFile = files.find(f => f.startsWith('traicainghien-bot-') && f.endsWith('.json'));

if (!keyFile) {
  console.error('❌ Không tìm thấy file khoá Google Service Account (traicainghien-bot-*.json)');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(path.join(projectRoot, keyFile), 'utf8'));

function createJwt(scopes) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsigned = b64(header) + '.' + b64(claim);
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsigned);
  const signature = sign.sign(key.private_key, 'base64url');
  return unsigned + '.' + signature;
}

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAccessToken() {
  const jwt = createJwt(['https://www.googleapis.com/auth/indexing']);
  const res = await request({
    hostname: 'oauth2.googleapis.com',
    path: '/token',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }, 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt);

  const parsed = JSON.parse(res.data);
  if (!parsed.access_token) {
    throw new Error('Lỗi lấy access token: ' + res.data);
  }
  return parsed.access_token;
}

async function notifyUrl(token, url, type = 'URL_UPDATED') {
  const res = await request({
    hostname: 'indexing.googleapis.com',
    path: '/v3/urlNotifications:publish',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }, JSON.stringify({ url, type }));

  return { status: res.status, body: res.data };
}

async function fetchSitemapUrls() {
  return new Promise((resolve, reject) => {
    https.get('https://www.traicainghien.com/sitemap.xml', (res) => {
      let xml = '';
      res.on('data', chunk => xml += chunk);
      res.on('end', () => {
        const matches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
        const urls = matches.map(m => m[1]);
        resolve(urls);
      });
    }).on('error', reject);
  });
}

async function main() {
  const args = process.argv.slice(2);
  console.log('🚀 MÂY SEO BOT - GOOGLE INDEXING AGENT');
  console.log('Khởi tạo kết nối với tài khoản:', key.client_email);

  const token = await getAccessToken();
  console.log('✅ Đã xác thực thành công với Google Cloud API\n');

  let urlsToNotify = [];

  if (args.length > 0 && args[0].startsWith('http')) {
    urlsToNotify = [args[0]];
    console.log(`📌 Yêu cầu index URL chỉ định: ${args[0]}`);
  } else {
    console.log('📡 Đang tải danh sách URL từ sitemap.xml...');
    urlsToNotify = await fetchSitemapUrls();
    console.log(`📋 Tìm thấy tổng cộng ${urlsToNotify.length} URL từ sitemap\n`);
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urlsToNotify.length; i++) {
    const url = urlsToNotify[i];
    process.stdout.write(`[${i + 1}/${urlsToNotify.length}] Báo Googlebot crawl: ${url} ... `);
    try {
      const res = await notifyUrl(token, url);
      if (res.status === 200) {
        console.log('✅ THÀNH CÔNG');
        successCount++;
      } else {
        console.log(`❌ LỖI (${res.status}): ${res.body}`);
        failCount++;
      }
    } catch (err) {
      console.log('❌ LỖI:', err.message);
      failCount++;
    }
    // Rate limit delay: 350ms between requests
    await sleep(350);
  }

  console.log('\n=======================================');
  console.log(`🎉 HOÀN THÀNH: Thành công: ${successCount} | Thất bại: ${failCount}`);
  console.log('Googlebot đã nhận thông báo và sẽ đưa vào hàng đợi ưu tiên lập chỉ mục.');
  console.log('=======================================');
}

main().catch(console.error);
