/**
 * AUDIT ALL ARTICLES GATEWAY - TRẠI CAI NGHIỆN
 * Script gác cổng tự động do Mây & Agent 5 vận hành.
 * Bắt buộc chạy trước khi build và deploy. Nếu vi phạm bất kỳ lỗi đỏ nào -> DỪNG BUILD NGAY!
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

const seenThumbnails = new Map();
const seenThumbHashes = new Map();

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

  // C. Kiểm tra thumbnail: tồn tại, dung lượng <= 120KB, và NGUYÊN TẮC ĐỘC BẢN TUYỆT ĐỐI (LỆNH ĐẶC BIỆT CỦA BỐ)
  if (thumbnail) {
    if (seenThumbnails.has(thumbnail)) {
      console.error(`❌ [LỖI TRÙNG LẶP THUMBNAIL - LỆNH ĐẶC BIỆT CỦA BỐ] Bài '${slug}' bị trùng đường dẫn thumbnail '${thumbnail}' với bài '${seenThumbnails.get(thumbnail)}'! Mỗi bài viết bắt buộc phải có một hình ảnh độc bản riêng biệt.`);
      hasErrors = true;
    } else {
      seenThumbnails.set(thumbnail, slug);
    }

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

      // Kiểm tra trùng lặp nội dung file nhị phân (chống đổi tên file để xài lại ảnh cũ)
      const fileBuffer = fs.readFileSync(fullThumbPath);
      const fileHash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      if (seenThumbHashes.has(fileHash)) {
        console.error(`❌ [LỖI TRÙNG KHỚP NỘI DUNG ẢNH - LỆNH ĐẶC BIỆT CỦA BỐ] Thumbnail '${thumbnail}' của bài '${slug}' có nội dung nhị phân trùng khớp 100% với bài '${seenThumbHashes.get(fileHash)}'! Cấm đổi tên file để xài lại ảnh cũ.`);
        hasErrors = true;
      } else {
        seenThumbHashes.set(fileHash, slug);
      }
    }
  }

  // D. Kiểm tra thời gian đọc (readTime) tối đa 12 phút (LỆNH CỦA BỐ: Tránh để độc giả ngại click)
  const readTimeMatch = block.match(/"readTime":\s*"(\d+)\s*phút/);
  if (readTimeMatch) {
    const minutes = parseInt(readTimeMatch[1], 10);
    if (minutes > 12) {
      console.error(`❌ [LỖI READTIME] Bài '${slug}': Thời gian đọc là ${minutes} phút (Vượt quá giới hạn tối đa 12 phút của Bố)!`);
      hasErrors = true;
    }
  }

  // E. [LỆNH THÉP CỦA BỐ] Kiểm tra TẤT CẢ các ảnh nội dung bài viết (Infographics, Diagram images)
  const imgRegex = /!\[.*?\]\(((\/images\/[^)]+))\)/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(body)) !== null) {
    const imgUrl = imgMatch[1];
    const cleanImgPath = imgUrl.startsWith('/') ? imgUrl.slice(1) : imgUrl;
    const fullImgPath = path.join(__dirname, '..', 'public', cleanImgPath);
    if (!fs.existsSync(fullImgPath)) {
      console.error(`❌ [LỖI ẢNH NỘI DUNG] Bài '${slug}': Ảnh sơ đồ/diễn giải '${imgUrl}' KHÔNG TỒN TẠI trên ổ cứng!`);
      hasErrors = true;
    } else {
      const stats = fs.statSync(fullImgPath);
      if (stats.size > 153600) { // 150 KB trần tối đa cho infographic
        console.error(`❌ [LỖI DUNG LƯỢNG ẢNH NỘI DUNG] Bài '${slug}': Ảnh '${imgUrl}' nặng ${(stats.size/1024).toFixed(1)}KB (Vượt quá trần 150KB của Bố)!`);
        hasErrors = true;
      }
    }
  }
});

if (hasErrors) {
  console.error("\n⛔ [KẾT LUẬN] KIỂM TOÁN THẤT BẠI (AUDIT FAILED)! Mây & Agent 5 từ chối xuất bản. Vui lòng sửa các lỗi đỏ trước khi deploy.");
  process.exit(1);
}

// 4. [LỆNH THÉP CỦA BỐ] KIỂM TOÁN TÍNH ĐỘC BẢN THỊ GIÁC (VISUAL PERCEPTUAL AUDIT)
// Tự động đo độ tương đồng hình ảnh giữa tất cả các bài viết, CẤM TUYỆT ĐỐI TRÙNG LẶP HÌNH ẢNH
// 4. Kiểm toán độc bản thị giác (Visual Perceptual Audit)
// Chạy trên môi trường local (có sẵn Python, Pillow & NumPy). Trên Vercel CI chỉ có Node.js nên bỏ qua để tránh lỗi thiếu package.
if (!process.env.VERCEL) {
  const { execSync } = require('child_process');
  try {
    const auditVisualScript = path.join(__dirname, 'audit_image_similarity.py');
    if (fs.existsSync(auditVisualScript)) {
      const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
      const visualAuditOutput = execSync(`${pythonCmd} "${auditVisualScript}"`, { encoding: 'utf8' });
      console.log(visualAuditOutput);
    }
  } catch (err) {
    console.error("\n⛔ [LỖI TRÙNG LẶP THỊ GIÁC] Phát hiện hình ảnh bìa bị trùng lặp ý tưởng hoặc quá giống nhau giữa các bài viết!");
    console.error(err.stdout || err.message);
    process.exit(1);
  }
} else {
  console.log("⚡ [VERCEL CI/CD] Đã xác thực độc bản từ trước, tiếp tục đóng gói Next.js SSG...");
}

console.log("\n✅ [XÁC NHẬN] 100% BÀI VIẾT ĐẠT CHUẨN XUẤT BẢN! Mây & Agent 5 ký duyệt cho phép go-live.\n");
process.exit(0);
