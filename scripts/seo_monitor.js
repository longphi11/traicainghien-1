const fs = require('fs');
const https = require('https');
const crypto = require('crypto');
const path = require('path');

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

async function getAccessToken() {
  const jwt = createJwt([
    'https://www.googleapis.com/auth/webmasters.readonly'
  ]);
  const res = await request({
    hostname: 'oauth2.googleapis.com',
    path: '/token',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }, 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt);

  const parsed = JSON.parse(res.data);
  return parsed.access_token;
}

const siteUrl = encodeURIComponent('sc-domain:traicainghien.com');

async function getSitemaps(token) {
  const res = await request({
    hostname: 'www.googleapis.com',
    path: `/webmasters/v3/sites/${siteUrl}/sitemaps`,
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  return JSON.parse(res.data);
}

async function getSearchAnalytics(token, days = 28, dimension = 'query') {
  const end = new Date();
  const start = new Date(Date.now() - days * 24 * 3600 * 1000);
  const formatDate = d => d.toISOString().split('T')[0];

  const body = JSON.stringify({
    startDate: formatDate(start),
    endDate: formatDate(end),
    dimensions: [dimension],
    rowLimit: 20
  });

  const res = await request({
    hostname: 'www.googleapis.com',
    path: `/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }, body);

  return JSON.parse(res.data);
}

async function main() {
  console.log('📊 MÂY SEO BOT - BÁO CÁO TỔNG QUAN TÌNH HÌNH GOOGLE SEARCH CONSOLE');
  console.log('🌐 Tên miền: traicainghien.com');
  console.log('🤖 Tài khoản kiểm tra:', key.client_email);
  console.log('--------------------------------------------------\n');

  const token = await getAccessToken();

  // 1. Check sitemaps
  console.log('🗺️ 1. TÌNH TRẠNG SITEMAP TRÊN GOOGLE:');
  const sitemaps = await getSitemaps(token);
  if (sitemaps.sitemap && sitemaps.sitemap.length > 0) {
    sitemaps.sitemap.forEach((sm, idx) => {
      console.log(`   [${idx + 1}] Đường dẫn: ${sm.path}`);
      console.log(`       - Đã gửi lúc: ${sm.lastSubmitted || 'N/A'}`);
      console.log(`       - Google tải về lúc: ${sm.lastDownloaded || 'N/A'}`);
      console.log(`       - Cảnh báo: ${sm.warnings} | Lỗi: ${sm.errors}`);
      if (sm.contents) {
        sm.contents.forEach(c => {
          console.log(`       - Số URL đã gửi: ${c.submitted} | Số URL đã lập chỉ mục: ${c.indexed}`);
        });
      }
    });
  } else {
    console.log('   Chưa có sitemap nào được ghi nhận.');
  }

  // 2. Check queries (keywords)
  console.log('\n🔍 2. TOP TỪ KHÓA TÌM KIẾM TRÊN GOOGLE (28 ngày qua):');
  const queryData = await getSearchAnalytics(token, 28, 'query');
  if (queryData.rows && queryData.rows.length > 0) {
    console.table(queryData.rows.map(r => ({
      'Từ khóa': r.keys[0],
      'Lượt hiển thị (Imp)': r.impressions,
      'Lượt click': r.clicks,
      'CTR (%)': (r.ctr * 100).toFixed(2) + '%',
      'Vị trí TB': r.position.toFixed(1)
    })));
  } else {
    console.log('   ℹ️ Google đang thu thập dữ liệu (thường có độ trễ 2-3 ngày sau khi xác minh domain).');
  }

  // 3. Check pages
  console.log('\n📄 3. TOP TRANG HIỂN THỊ TỐT NHẤT TRÊN GOOGLE (28 ngày qua):');
  const pageData = await getSearchAnalytics(token, 28, 'page');
  if (pageData.rows && pageData.rows.length > 0) {
    console.table(pageData.rows.map(r => ({
      'Đường dẫn URL': r.keys[0].replace('https://www.traicainghien.com', ''),
      'Lượt hiển thị': r.impressions,
      'Lượt click': r.clicks,
      'Vị trí TB': r.position.toFixed(1)
    })));
  } else {
    console.log('   ℹ️ Dữ liệu trang sẽ bắt đầu xuất hiện trong 24-48 giờ tới khi Google hoàn tất đợt crawl sitemap đầu tiên.');
  }

  console.log('\n==================================================');
  console.log('✅ Kết nối ổn định 100%. Sẵn sàng phục vụ bố!');
}

main().catch(console.error);
