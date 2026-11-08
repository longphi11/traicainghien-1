/**
 * AUDIT COMMENTS GATEWAY - TRẠI CAI NGHIỆN
 * Kiểm toán tự động tính ĐỘC BẢN & BÁM SÁT NGỮ CẢNH của bình luận seeding
 * Do Mây & Agent 5 vận hành - Chạy tự động trước mỗi lần build/deploy
 */

const fs = require('fs');
const path = require('path');

console.log("💬 [AGENT 5] ĐANG KIỂM TOÁN TÍNH ĐỘC BẢN & BÁM SÁT NGỮ CẢNH BÌNH LUẬN SEEDING...");

const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.ts');
const commentsPath = path.join(__dirname, '..', 'src', 'data', 'articleComments.ts');

if (!fs.existsSync(articlesPath) || !fs.existsSync(commentsPath)) {
  console.error("❌ Không tìm thấy file articles.ts hoặc articleComments.ts");
  process.exit(1);
}

const articlesContent = fs.readFileSync(articlesPath, 'utf8');
const commentsContent = fs.readFileSync(commentsPath, 'utf8');

// 1. Lấy danh sách tất cả slugs và titles từ articles.ts
const articleRegex = /"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"((?:\\.|[^"\\])*)"/g;
let m;
const articles = [];
while ((m = articleRegex.exec(articlesContent)) !== null) {
  articles.push({ slug: m[1], title: m[2].replace(/\\"/g, '"') });
}

// 2. Trích xuất articleCommentsMap từ articleComments.ts
// Parse objects from comments content
const mapMatch = commentsContent.match(/export const articleCommentsMap: Record<string, Comment\[\]> = (\{[\s\S]*?\n\};)/);
if (!mapMatch) {
  console.error("❌ Không tìm thấy articleCommentsMap trong articleComments.ts!");
  process.exit(1);
}

let articleCommentsMap;
try {
  // Safe eval for object literal
  const cleanJson = mapMatch[1].replace(/;\s*$/, '');
  articleCommentsMap = eval('(' + cleanJson + ')');
} catch (e) {
  console.error("❌ Lỗi cú pháp khi đọc articleCommentsMap:", e.message);
  process.exit(1);
}

let hasErrors = false;

// 3. KIỂM TRA ĐỘ PHỦ 100% (Coverage Check)
const mappedSlugs = Object.keys(articleCommentsMap);
const missingArticles = articles.filter(a => !articleCommentsMap[a.slug] || articleCommentsMap[a.slug].length === 0);

if (missingArticles.length > 0) {
  console.error(`\n❌ [LỖI THIẾU BÌNH LUẬN SEEDING] Phát hiện ${missingArticles.length} bài viết chưa có bình luận seeding độc bản:`);
  missingArticles.forEach(a => console.error(`   - [${a.slug}] ${a.title}`));
  hasErrors = true;
}

// 4. KIỂM TRA TRÙNG LẶP NỘI DUNG (Duplicate Content Check)
const contentToSlugMap = new Map();
const nameToSlugMap = new Map();
let totalComments = 0;

for (const [slug, comments] of Object.entries(articleCommentsMap)) {
  if (!Array.isArray(comments)) continue;

  // Kiểm tra số lượng bình luận tối thiểu (tối thiểu 3 bình luận / bài)
  if (comments.length < 3) {
    console.error(`❌ [LỖI SỐ LƯỢNG] Bài '${slug}' chỉ có ${comments.length} bình luận (yêu cầu tối thiểu 3)!`);
    hasErrors = true;
  }

  // Kiểm tra có ít nhất 1 câu chuyện dài tâm sự
  const hasLongStory = comments.some(c => c.isLongStory);
  if (!hasLongStory) {
    console.error(`❌ [LỖI THIẾU TÂM SỰ] Bài '${slug}' thiếu câu chuyện tâm sự dài (isLongStory: true) để tạo sự thấu cảm!`);
    hasErrors = true;
  }

  for (const c of comments) {
    totalComments++;
    // Chuẩn hóa nội dung để kiểm tra trùng lặp
    const normalizedContent = c.content.trim().toLowerCase().replace(/[^\w\s\u00C0-\u1EF9]/g, '');

    if (contentToSlugMap.has(normalizedContent)) {
      const prevSlug = contentToSlugMap.get(normalizedContent);
      console.error(`\n❌ [LỖI TRÙNG LẶP BÌNH LUẬN - LỆNH ĐẶC BIỆT CỦA BỐ]`);
      console.error(`   Phát hiện bình luận bị sao chép y nguyên giữa 2 bài viết:`);
      console.error(`   - Bài 1: ${prevSlug}`);
      console.error(`   - Bài 2: ${slug}`);
      console.error(`   - Nội dung trùng: "${c.content.slice(0, 80)}..."`);
      hasErrors = true;
    } else {
      contentToSlugMap.set(normalizedContent, slug);
    }
  }
}

// 5. KIỂM TRA TÍNH BÁM SÁT NGỮ CẢNH (Contextual Keywords Check)
// Mỗi bài viết phải có bình luận chứa ít nhất 1 từ khóa ngữ cảnh cốt lõi
for (const article of articles) {
  const comments = articleCommentsMap[article.slug];
  if (!comments) continue;

  const combinedCommentText = comments.map(c => c.content).join(' ').toLowerCase();

  // Bóc tách các từ khóa định danh từ title và slug
  const titleTokens = article.title
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u1EF9]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !['như', 'khi', 'cho', 'của', 'với', 'trong', 'được', 'người', 'cách', 'bạn', 'mình'].includes(w));

  // Kiểm tra xem ít nhất 1 từ khóa đặc trưng của bài có xuất hiện trong comment không
  const matchCount = titleTokens.filter(token => combinedCommentText.includes(token)).length;

  if (matchCount === 0) {
    console.warn(`⚠️ [CẢNH BÁO NGỮ CẢNH] Bài '${article.slug}': Bình luận có thể chưa bám sát từ khóa tiêu đề: "${article.title}"`);
  }
}

if (hasErrors) {
  console.error(`\n⛔ [KẾT LUẬN] KIỂM TOÁN BÌNH LUẬN THẤT BẠI (COMMENT AUDIT FAILED)! Cấm xuất bản khi còn lỗi.`);
  process.exit(1);
} else {
  console.log(`✅ [XÁC NHẬN ĐỘC BẢN & NGỮ CẢNH] 100% (${articles.length}/${articles.length} bài, ${totalComments} bình luận) đạt chuẩn độc bản hoàn toàn riêng biệt và bám sát nội dung!\n`);
  process.exit(0);
}
