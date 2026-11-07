const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf8');

const regex = /"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"thumbnail":\s*"([^"]+)"[\s\S]*?"pillarTag":\s*"([^"]+)"[\s\S]*?"date":\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(`${m[5]} | ${m[4]} | ${m[1]} | ${m[3]} | ${m[2]}`);
}
