const fs = require('fs');

// We can read src/data/articles.ts
const code = fs.readFileSync('src/data/articles.ts', 'utf8');

// Simple parser for rawArticles array
const marker = 'const rawArticles: Article[] = [';
const startIdx = code.indexOf(marker);
const endMarker = 'function parseArticleDate';
const endIdx = code.indexOf(endMarker);

// Find each article by splitting or matching
const articlesJsonStr = code.slice(startIdx + marker.length, code.lastIndexOf('];', endIdx)).trim();

// To be safe and accurate, let's write a small script to evaluate or regex extract slug, title, and content word count
const regex = /\{\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"[\s\S]*?"content":\s*"([\s\S]*?)"\s*\n\s*\}/g;

let match;
const results = [];

function countWords(str) {
  // unescape newlines and quotes
  const unescaped = str.replace(/\\n/g, ' ').replace(/\\"/g, '"');
  const clean = unescaped.replace(/[#*`$\-\n\r\[\]\(\)\>\<\=\|]/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.split(' ').filter(w => w.length > 0).length;
}

while ((match = regex.exec(articlesJsonStr)) !== null) {
  const slug = match[1];
  const title = match[2];
  const content = match[3];
  const words = countWords(content);
  results.push({ slug, title, words });
}

console.log("Total articles parsed:", results.length);
console.log("\n--- THỐNG KÊ SỐ TỪ CÁC BÀI VIẾT ---");
results.forEach((r, idx) => {
  const status = r.words >= 2400 ? "✅ ĐẠT CHUẨN" : "⚠️ CẦN NÂNG CẤP (" + r.words + " từ)";
  console.log(`${idx + 1}. [${r.slug}]: ${r.words} từ - ${status}`);
});

const underTarget = results.filter(r => r.words < 2400);
console.log(`\nTổng số bài dưới chuẩn 2.500 từ: ${underTarget.length} / ${results.length}`);
