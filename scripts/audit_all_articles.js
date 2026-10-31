/**
 * AUDIT ALL ARTICLES GATEWAY - TRẠI CAI NGHIỆN
 * Script gác cổng tự động do Mây & Agent 5 vận hành.
 * Bắt buộc chạy trước khi build và deploy. Nếu vi phạm bất kỳ lỗi đỏ nào -> DỪNG BUILD NGAY!
 */

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.ts');
if (!fs.existsSync(articlesPath)) {
  console.error("❌ Không tìm thấy file articles.ts");
  process.exit(1);
}

const content = fs.readFileSync(articlesPath, 'utf8');

// Parse articles array roughly from file text
const articles = [];
const regex = /\{\s*"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"thumbnail":\s*"([^"]+)"[\s\S]*?"content":\s*"([\s\S]*?)(?="\s*,\s*(?:"sources"|"tags"|\}\s*,\s*\{|\}\s*\]))/g;

let match;
let count = 0;

console.log("🛡️ [MÂY & AGENT 5] ĐANG KHỞI CHẠY KIỂM TOÁN TẤT CẢ BÀI VIẾT TRƯỚC KHI XUẤT BẢN...\n");

let hasErrors = false;

// 1. Kiểm tra Text Art / ASCII Diagram / Mermaid / LaTeX / Code blocks
const forbiddenPatterns = [
  { name: 'Khối mã Mermaid', regex: /```mermaid/i },
  { name: 'Khối mã code (```)', regex: /```/ },
  { name: 'Ký tự mũi tên LaTeX ($\\rightarrow$)', regex: /\$\\rightarrow\$/ },
  { name: 'Công thức toán LaTeX ($$...$$)', regex: /\$\$.*?\$\$/ },
  { name: 'Công thức toán LaTeX inline ($...$)', regex: /\$[a-zA-Z0-9\^_\\\{\}\+\-\*\/=]{2,}\$/ },
  { name: 'Ký tự lỗi font / glyph rỗng (□)', regex: /□/ },
  { name: 'ASCII Art / Text diagram', regex: /[▲▼│╭╮╰╯─┌┐└┘├┤┬┴┼►]/ }
];

for (const fp of forbiddenPatterns) {
  if (fp.regex.test(content)) {
    console.error(`❌ [LỖI ĐỎ CẤM] Phát hiện '${fp.name}' trong articles.ts! Bắt buộc dùng hình ảnh picture hoặc unicode chuẩn.`);
    hasErrors = true;
  }
}

// 2. Kiểm tra Cú pháp Bảng Markdown thô (| :--- |)
if (/\|.*?\|.*?\|\s*\\n\s*\|.*?:---.*?\|/.test(content) || /\| :--- \|/.test(content) || /\|:---/.test(content)) {
  console.error("❌ [LỖI ĐỎ] Phát hiện cú pháp Bảng Markdown thô (| :--- |) chưa được chuẩn hóa thành văn phong so sánh!");
  hasErrors = true;
}

// 3. Kiểm tra từng bài viết
const articleBlocks = content.split(/\{\s*"slug":/);
articleBlocks.shift(); // remove header before first article

console.log(`🔍 Tìm thấy ${articleBlocks.length} bài viết trong kho tri thức.`);

articleBlocks.forEach((block, index) => {
  const slugMatch = block.match(/^\s*"([^"]+)"/);
  const titleMatch = block.match(/"title":\s*"((?:\\.|[^"\\])*)"/);
  const thumbMatch = block.match(/"thumbnail":\s*"([^"]+)"/);
  const contentMatch = block.match(/"content":\s*"([\s\S]*?)"\s*,\s*(?:"sources"|"tags"|"date"|"readTime"|\})/);

  const slug = slugMatch ? slugMatch[1] : `Bài #${index + 1}`;
  const rawTitle = titleMatch ? titleMatch[1] : "Không rõ tiêu đề";
  const title = rawTitle.replace(/\\"/g, '"');
  const thumbnail = thumbMatch ? thumbMatch[1] : "";
  const body = contentMatch ? contentMatch[1] : "";

  // A. Kiểm tra độ dài tiêu đề
  if (title.length < 35 || title.length > 70) {
    console.warn(`⚠️ [CẢNH BÁO TIÊU ĐỀ] Bài '${slug}': Tiêu đề '${title}' có độ dài ${title.length} ký tự (Khuyến nghị 50-62 ký tự).`);
  }

  // B. Kiểm tra vị trí khối NHỮNG ĐIỂM CHÍNH
  if (body.includes("NHỮNG ĐIỂM CHÍNH") || body.includes("KEY TAKEAWAYS")) {
    const mainTakeawaysIdx = body.search(/NHỮNG ĐIỂM CHÍNH|KEY TAKEAWAYS/);
    const bodyLen = body.length;
    // Khối này phải nằm ở 25% cuối của bài viết
    if (mainTakeawaysIdx < bodyLen * 0.70) {
      console.error(`❌ [LỖI ĐỎ VỊ TRÍ] Bài '${slug}': Khối 'NHỮNG ĐIỂM CHÍNH' đặt quá sớm (${Math.round((mainTakeawaysIdx/bodyLen)*100)}% bài). Bắt buộc đặt ở cuối bài!`);
      hasErrors = true;
    }
  }

  // C. Kiểm tra thumbnail có tồn tại trên disk và dung lượng <= 120KB không
  if (thumbnail) {
    const cleanThumbPath = thumbnail.startsWith('/') ? thumbnail.slice(1) : thumbnail;
    const fullThumbPath = path.join(__dirname, '..', 'public', cleanThumbPath);
    if (!fs.existsSync(fullThumbPath)) {
      console.error(`❌ [LỖI THUMBNAIL] Bài '${slug}': File ảnh '${thumbnail}' không tồn tại trên ổ cứng!`);
      hasErrors = true;
    } else {
      const stats = fs.statSync(fullThumbPath);
      if (stats.size > 122880) { // 120 KB
        console.error(`❌ [LỖI DUNG LƯỢNG ẢNH] Bài '${slug}': Thumbnail '${thumbnail}' nặng ${(stats.size/1024).toFixed(1)}KB (Vượt quá trần 120KB của Bố)!`);
        hasErrors = true;
      }
    }
  }
});

if (hasErrors) {
  console.error("\n⛔ [KẾT LUẬN] KIỂM TOÁN THẤT BẠI (AUDIT FAILED)! Mây & Agent 5 từ chối xuất bản. Vui lòng sửa các lỗi đỏ trước khi deploy.");
  process.exit(1);
} else {
  console.log("\n✅ [XÁC NHẬN] 100% BÀI VIẾT ĐẠT CHUẨN XUẤT BẢN! Mây & Agent 5 ký duyệt cho phép go-live.\n");
  process.exit(0);
}
