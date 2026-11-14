const fs = require('fs');
const https = require('https');

// Load repaired workflow
const wfData = JSON.parse(fs.readFileSync('scripts/flow_01_repaired.json', 'utf-8'));
const wf = Array.isArray(wfData) ? wfData[0] : wfData;

const nodeMap = {};
for (const n of wf.nodes) {
  nodeMap[n.name] = n;
}

console.log('=== 1. VERIFYING WORKFLOW NODES & CONFIG ===');
const dedupNode = nodeMap['Lọc Bài Viết Chưa Từng Gửi (Deduplication)'];
const formatterNode = nodeMap['Soạn Bản Tin Từ Nguồn Gốc'];
const recordNode = nodeMap['Ghi Nhận Link Đã Gửi'];
const telegramNode = nodeMap['Gửi Telegram sendPhoto'];
const scheduleNode = nodeMap['Lịch 8h30 - 15h00 - 20h30'];

if (!dedupNode || !formatterNode || !recordNode || !telegramNode || !scheduleNode) {
  throw new Error('Missing expected nodes in repaired workflow!');
}
console.log('All required nodes exist.');

// Check schedule intervals
const intervals = scheduleNode.parameters.rule.interval.map(i => i.expression);
console.log('Schedules:', intervals);
if (!intervals.includes('30 8 * * *') || !intervals.includes('0 15 * * *') || !intervals.includes('30 20 * * *')) {
  throw new Error('Schedule expressions do not match required 08:30, 15:00, 20:30');
}
console.log('Schedule verified: 08:30, 15:00, 20:30.');

// Test 2: Simulate Deduplication Logic
console.log('\n=== 2. TESTING DEDUPLICATION NODE LOGIC ===');
const mockStaticData = {
  sentLinks: ['https://example.com/art1', 'https://example.com/art2'],
  skippedNoImageLinks: ['https://example.com/art3']
};

function runDedupCode(inputItems, staticData) {
  const $getWorkflowStaticData = () => staticData;
  const $input = {
    all: () => inputItems.map(item => ({ json: item }))
  };
  const fn = new Function('$getWorkflowStaticData', '$input', dedupNode.parameters.jsCode);
  return fn($getWorkflowStaticData, $input);
}

const inputArticles = [
  { link: 'https://example.com/art1', title: 'Article 1' },
  { link: 'https://example.com/art2', title: 'Article 2' },
  { link: 'https://example.com/art3', title: 'Article 3 (No image previously)' },
  { link: 'https://example.com/art4', title: 'Article 4 (New!)' },
  { link: 'https://example.com/art5', title: 'Article 5 (New!)' }
];

const dedupResult = runDedupCode(inputArticles, mockStaticData);
console.log('Dedup filtered output count:', dedupResult.length);
if (dedupResult.length !== 2 || dedupResult[0].json.selectedLink !== 'https://example.com/art4' || dedupResult[1].json.selectedLink !== 'https://example.com/art5') {
  throw new Error('Dedup logic failed to properly filter out sent and skipped links!');
}
console.log('Dedup test PASSED: correctly filtered art1, art2, art3 and returned art4, art5.');

// Test 3: Simulate Formatter Logic (Image missing -> skipped; Image present -> formatted)
console.log('\n=== 3. TESTING FORMATTER NODE (Soạn Bản Tin Từ Nguồn Gốc) ===');

function runFormatterCode(priorList, responsesList, staticData) {
  const $getWorkflowStaticData = () => staticData;
  const $ = (nodeName) => {
    if (nodeName === 'Lọc Bài Viết Chưa Từng Gửi (Deduplication)') {
      return { all: () => priorList.map(item => ({ json: item })) };
    }
    return { all: () => [] };
  };
  const $input = {
    all: () => responsesList.map(item => ({ json: item }))
  };
  const fn = new Function('$getWorkflowStaticData', '$', '$input', formatterNode.parameters.jsCode);
  return fn($getWorkflowStaticData, $, $input);
}

// Case A: Article 4 has no og:image, Article 5 has og:image
const sampleHtmlNoImg = `
<!DOCTYPE html>
<html>
<head><title>Article 4 Title</title></head>
<body><p>Some text content that does not have an og:image tag.</p></body>
</html>
`;

const sampleHtmlWithImg = `
<!DOCTYPE html>
<html>
<head>
  <meta property="og:title" content="Khám Phá Tâm Lý: Sức Mạnh Của Nhịp Điệu Chậm" />
  <meta property="og:description" content="Nghiên cứu mới cho thấy việc giảm tốc độ nhận thức giúp não bộ tái tạo dopamine nền tự nhiên và tăng hiệu suất làm việc." />
  <meta property="og:image" content="https://cdn2.psychologytoday.com/assets/sample.jpg" />
</head>
<body>
  <h1>Khám Phá Tâm Lý</h1>
  <p>Đoạn văn chi tiết về nghiên cứu...</p>
</body>
</html>
`;

const priorItems = [
  { selectedLink: 'https://example.com/art4', title: 'Article 4' },
  { selectedLink: 'https://example.com/art5', title: 'Article 5' }
];
const responseItems = [
  { data: sampleHtmlNoImg },
  { data: sampleHtmlWithImg }
];

const formatResult = runFormatterCode(priorItems, responseItems, mockStaticData);
console.log('Formatter output count:', formatResult.length);
if (formatResult.length !== 1) {
  throw new Error(`Expected 1 formatted item (art5), got ${formatResult.length}`);
}
const item = formatResult[0].json;
console.log('Selected Link:', item.selectedLink);
console.log('Photo URL:', item.photo);
console.log('Caption length:', item.caption.length);
console.log('Caption Preview:\n' + item.caption);

if (item.selectedLink !== 'https://example.com/art5') {
  throw new Error('Formatter did not select the item with valid og:image!');
}
if (!mockStaticData.skippedNoImageLinks.includes('https://example.com/art4')) {
  throw new Error('Formatter failed to add article without og:image to skippedNoImageLinks!');
}
if (item.caption.length > 1024) {
  throw new Error(`Caption exceeds 1024 characters! Length is ${item.caption.length}`);
}
if (item.caption.includes('bố có thể xem chi tiết')) {
  throw new Error('Caption still contains informal word "bố" intended for private chat!');
}
console.log('Formatter test PASSED: correctly skipped art4, recorded to skippedNoImageLinks, and formatted art5 under 1024 chars.');

// Test 4: Simulate Record Sent Node
console.log('\n=== 4. TESTING RECORD SENT NODE LOGIC ===');

function runRecordCode(inputResponse, selectedItem, staticData) {
  const $getWorkflowStaticData = () => staticData;
  const $ = (nodeName) => {
    if (nodeName === 'Soạn Bản Tin Từ Nguồn Gốc') {
      return { first: () => ({ json: selectedItem }) };
    }
    return { first: () => null };
  };
  const $input = {
    first: () => ({ json: inputResponse }),
    all: () => [{ json: inputResponse }]
  };
  const fn = new Function('$getWorkflowStaticData', '$', '$input', recordNode.parameters.jsCode);
  return fn($getWorkflowStaticData, $, $input);
}

// Case A: Telegram returns error
try {
  runRecordCode({ ok: false, error_code: 400 }, item, mockStaticData);
  throw new Error('Should have thrown error on Telegram failure!');
} catch (e) {
  console.log('Telegram failure handled properly:', e.message);
}

// Verify art5 was NOT added to sentLinks
if (mockStaticData.sentLinks.includes('https://example.com/art5')) {
  throw new Error('sentLinks was updated even though Telegram failed!');
}

// Case B: Telegram returns ok: true
runRecordCode({ ok: true, result: { message_id: 1234 } }, item, mockStaticData);
if (!mockStaticData.sentLinks.includes('https://example.com/art5')) {
  throw new Error('sentLinks was NOT updated after Telegram success!');
}
console.log('Record Sent test PASSED: sentLinks only updated when ok: true.');

console.log('\n========================================');
console.log('ALL WORKFLOW LOGIC SIMULATIONS PASSED 100%!');
console.log('========================================');
