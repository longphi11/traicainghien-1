const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function getEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const pageId = envContent.match(/FB_PAGE_ID=(.*)/)[1].trim();
  const token = envContent.match(/FB_PAGE_ACCESS_TOKEN=(.*)/)[1].trim();
  return { pageId, token };
}

async function publishLatestArticle() {
  const { pageId, token } = getEnv();

  const caption = `ĐỪNG "FLEX" ĐỌC SÁCH: VÌ SAO ĐỌC 50 CUỐN ĐỜI VẪN TRÌ TRỆ?

Đã bao giờ bạn bắt gặp một bức ảnh check-in quán cà phê với chồng sách mới thơm phức, caption: "Mục tiêu năm nay: 50 cuốn sách. Tri thức là sức mạnh!"?

Hoặc chính bạn, hào hứng mua về cả chồng sách kỹ năng, tâm lý học đang sốt trên mạng, đọc vài chục trang đầu thấy hưng phấn tột độ: "Đọc xong cuốn này đời mình chắc chắn đổi khác!"

Thế nhưng, đời thực không bao giờ lật trang dễ dàng như một cuốn sách giấy.

Sáng hôm sau chuông báo thức reo, bạn vẫn tắt đi ngủ cố thêm 4 lần. Bạn vẫn lao vào ngày mới trong sự cuống cuồng, vẫn lướt vô thức hàng chục video ngắn, các dự án quan trọng vẫn nằm yên đó, và khi đối diện với bực bội đời thường, bạn vẫn phản ứng bằng sự cáu gắt y hệt như trước đây.

Chồng sách trên kệ bắt đầu phủ bụi. Đọc đến cuốn thứ 20, thứ 30, nhưng tài khoản ngân hàng không đổi, năng lực hành động không tăng, sự lo âu vẫn bóp nghẹt lồng ngực...

Tại sao việc đọc sách — một hành vi vốn được tôn sùng là cao quý — lại có thể biến thành một cạm bẫy dopamine rẻ tiền ngụy trang dưới tấm áo tri thức?

---

🧠 CẠM BẪY 'THƯỢNG ĐẲNG TRI THỨC' (COLLECTOR'S FALLACY)
Tâm lý học hành vi chỉ ra: Não bộ tiến hóa để tiết dopamine khi tích lũy tài nguyên. Thời hiện đại, khi bạn mua một cuốn sách hay đọc qua một khái niệm sâu sắc, não bộ tự động đánh lừa rằng bạn ĐÃ GIẢI QUYẾT XONG vấn đề ngoài đời thực.

Nhưng sự thật là: Thông tin (Information) chưa bao giờ là Trí tuệ (Wisdom). Việc đọc giải pháp hoàn toàn khác với năng lực thực thi giải pháp đó.

Hơn nữa, một cuốn sách hay cũng chỉ là một góc nhìn chủ quan của tác giả. Đọc nhiều không chứng minh bạn thông thái hơn người khác — bạn chỉ đơn giản là có cơ duyên tiếp xúc với thông tin đó sớm hơn một chút.

---

🌿 QUY TRÌNH 4 BƯỚC TIÊU HÓA TRI THỨC THỰC CHIẾN:
1. Đọc theo nỗi đau & câu hỏi tự thân: Đừng chạy theo trend đám đông. Hãy đọc cuốn sách đang trả lời đúng bế tắc, nỗi đau rỉ máu của chính bạn (mất tập trung, khủng hoảng hiện sinh, hay kiệt sức cảm xúc).
2. Sơ đồ hóa dòng chảy ý niệm: Thay vì gạch chân tràn lan, hãy gấp sách lại và đúc kết 1 - 2 góc nhìn đắt giá nhất bằng ngôn từ của chính mình.
3. Đưa ra quan sát thực địa: Biến đời sống thành phòng thí nghiệm sống. Đối chiếu lý thuyết sách nói với hành vi của con người bằng xương bằng thịt ngoài đời.
4. Kỹ thuật Feynman: Đem tri thức ra trò chuyện và ứng dụng bằng ngôn ngữ mộc mạc nhất.

---

🌿 Lời nhắn từ Trại Cai Nghiện:
Một người cả năm chỉ đọc duy nhất 1 cuốn sách, nhưng nghiền ngẫm, thực hành và sống tử tế hơn với gia đình, vẫn sâu sắc hơn kẻ đọc 50 cuốn chỉ để chụp ảnh khoe mẽ.

Đọc sách là cuộc hẹn hò riêng tư và tĩnh lặng nhất giữa bạn với tâm hồn mình.

👉 Mời bạn đọc trọn vẹn bài phân tích sâu 2.500 từ và xem infographic chi tiết tại bình luận đầu tiên bên dưới.

#TraiCaiNghien #DocSachThucChien #HieuHanhVi #ThoiQuenTot #FeynmanTechnique #DeepWork`;

  const imgPath = path.resolve(__dirname, '../public/images/articles/dung-flex-doc-sach-trai-cai-nghien.webp');
  const fileBuffer = fs.readFileSync(imgPath);
  const blob = new Blob([fileBuffer], { type: 'image/webp' });

  const form = new FormData();
  form.append('source', blob, 'dung-flex-doc-sach-trai-cai-nghien.webp');
  form.append('caption', caption);

  console.log('🚀 Đang đăng bài kèm ảnh lên Fanpage Trại Cai Nghiện...');
  const res = await fetch(`https://graph.facebook.com/v20.0/${pageId}/photos?access_token=${token}`, {
    method: 'POST',
    body: form
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  console.log(`✅ Đã đăng bài thành công! Post ID: ${data.id || data.post_id}`);
  const targetPostId = data.post_id || data.id;

  // First comment
  const firstComment = `🌿 Đọc toàn bộ bài phân tích 2.500 từ và xem Sơ đồ 4 bước tiêu hóa tri thức tại:
👉 https://traicainghien.com/bai-viet/dung-flex-doc-sach-vi-sao-doc-nhieu-doi-van-tri-tre

Làm bài trắc nghiệm nhận diện 25 câu hỏi tâm lý học hành vi miễn phí tại:
👉 https://traicainghien.com/trac-nghiem`;

  console.log('💬 Đang ghim bình luận đầu tiên...');
  const commentRes = await fetch(`https://graph.facebook.com/v20.0/${targetPostId}/comments?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: firstComment })
  });

  const commentData = await commentRes.json();
  console.log(`✅ Đã ghim bình luận thành công! Comment ID: ${commentData.id}`);
  console.log('🎉 Hoàn tất toàn bộ quy trình xuất bản Facebook!');
}

publishLatestArticle().catch(err => {
  console.error('❌ Lỗi:', err.message);
  process.exit(1);
});
