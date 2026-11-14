const fs = require('fs');
const content = fs.readFileSync('src/data/articles.ts', 'utf8');

// match all id, title, slug, date
const regex = /"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"date":\s*"([^"]+)"/g;
let m;
const articles = [];
while ((m = regex.exec(content)) !== null) {
  articles.push({ id: m[1], title: m[2], slug: m[3], date: m[4] });
}

console.log("Total articles:", articles.length);
console.log("Last 10 articles:");
console.log(JSON.stringify(articles.slice(-10), null, 2));
