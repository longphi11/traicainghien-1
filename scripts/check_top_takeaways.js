const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf8');

const regex = /"slug":\s*"([^"]+)"[\s\S]*?"content":\s*"([\s\S]*?)"\s*\n\s*\}/g;
let match;
const keyTakeawaysAtTop = [];

while ((match = regex.exec(content)) !== null) {
  const slug = match[1];
  const body = match[2];
  const first120 = body.slice(0, 120);
  if (first120.includes('NHỮNG ĐIỂM CHÍNH') || first120.includes('NH?NG')) {
    keyTakeawaysAtTop.push(slug);
  }
}
console.log('Articles with Key Takeaways at top:', keyTakeawaysAtTop);
console.log('Count:', keyTakeawaysAtTop.length);
