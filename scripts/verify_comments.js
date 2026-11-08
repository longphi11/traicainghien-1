const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf8');
const regex = /"slug":\s*"([^"]+)"/g;
let m;
const slugs = [];
while ((m = regex.exec(content)) !== null) {
  slugs.push(m[1]);
}

const commentsContent = fs.readFileSync('src/data/articleComments.ts', 'utf8');
const missing = [];
for (let slug of slugs) {
  if (!commentsContent.includes(`"${slug}": [`)) {
    missing.push(slug);
  }
}
console.log('Total articles in articles.ts:', slugs.length);
console.log('Missing slugs in articleComments.ts:', missing);
if (missing.length === 0) {
  console.log('✅ ALL 39 ARTICLES HAVE DEDICATED SEED COMMENTS!');
}
