export interface AddictionSystemProduct {
  id: string;
  badge: string;
  badgeColor: "amber" | "rose" | "emerald" | "blue";
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  duration: string;
  format: string;
  targetAudience: string;
  price?: string;
  originalPrice?: string;
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

export const addictionSystemProducts: AddictionSystemProduct[] = [
  {
    id: "radar-dopamine-reset",
    badge: "Phao Cứu Hộ Miễn Phí",
    badgeColor: "emerald",
    price: "Miễn Phí (0đ)",
    originalPrice: "199.000đ",
    title: "Radar Bóc Tách Xao Nhãng & Dopamine Reset Kit",
    tagline: "Bản Định Vị Ma Trận Thời Gian & 7 Ngày Sơ Cứu Não Phân Mảnh",
    description: "Dành cho người thường xuyên cảm thấy một ngày trôi qua vô nghĩa mà không hiểu thời gian biến đi đâu. Kết hợp trắc nghiệm 25 câu bóc tách tỷ lệ lãng phí ở góc phần tư Q4 (Dopamine rẻ tiền) và bộ tài liệu hướng dẫn hạ nhiệt kích thích số tức thì trong 7 ngày.",
    highlights: [
      "Trắc nghiệm 25 câu bóc tách chính xác mức độ nhiễm độc số & kiểu mẫu trì hoãn của riêng bạn",
      "Phân loại thời gian theo Ma trận Q1-Q4 của FranklinCovey: Nhận diện bẫy khẩn cấp giả tạo",
      "Cẩm nang PDF 7 Ngày Dopamine Reset: 5 việc vi mô cần làm ngay để cắt đứt 80% cơn thèm vô thức",
      "Hoàn toàn miễn phí — không yêu cầu thẻ tín dụng, nhận kết quả và tài liệu ngay tức thì",
    ],
    duration: "7 Ngày thực hành mở đầu",
    format: "Trắc nghiệm tương tác + Cẩm nang PDF gửi qua Email",
    targetAudience: "Người mới bắt đầu, cảm thấy não bộ luôn bồn chồn, lướt điện thoại vô thức và mất phương hướng",
    ctaText: "Làm Trắc Nghiệm & Nhận Bộ Kit 0đ",
    ctaHref: "/trac-nghiem",
  },
  {
    id: "the-calm-brain-system",
    badge: "Hệ Thống Tác Chiến Số",
    badgeColor: "blue",
    price: "69.000 VNĐ",
    originalPrice: "149.000đ",
    title: "The Calm Brain System: Notion Trị Não Phân Mảnh",
    tagline: "Hệ Thống Quản Trị Năng Lượng & Deep Work 1 Trang Cho Tâm Trí Xu Hướng ADHD",
    description: "Nếu bạn đã thử hàng chục app quản lý công việc nhưng đều bỏ dở sau vài ngày vì bị ngợp, bạn không hề kém cỏi! The Calm Brain System được thiết kế tối giản tuyệt đối: gom sạch mọi xao nhãng vào Hộp Xả Rác Tâm Trí và chỉ hiển thị đúng 1 Hòn Đá Tảng quan trọng nhất trong ngày.",
    highlights: [
      "Dashboard Notion 1 trang Zen Minimalist: Loại bỏ 90% tính năng thừa thãi gây quá tải thị giác",
      "Cơ chế 'Hộp Xả Rác Tâm Trí' (Brain Dump Inbox): Gom sạch ý nghĩ vẩn vơ để đầu óc thảnh thơi làm việc",
      "Khu vực 'Khối Đá Tảng' (The Big Rocks): Neo chặt sự chú ý vào đúng 1 mục tiêu cốt lõi mỗi ngày",
      "Tích hợp đồng hồ Focus Pomodoro mộc mạc và playlist âm thanh tiếp đất (Grounding)",
      "Quét mã VietQR nhận link Duplicate Notion ngay lập tức trong 30 giây",
    ],
    duration: "Áp dụng trọn đời",
    format: "Notion Dashboard mẫu sẵn + Video hướng dẫn thiết lập 5 phút",
    targetAudience: "Freelancer, sinh viên, người làm việc trí óc hay nhảy tab, khó tập trung sâu và dễ quá tải thông tin",
    ctaText: "Sở Hữu Notion Calm Brain (69k)",
    ctaHref: "/trac-nghiem?focus=notion",
  },
  {
    id: "dopamine-menu-toolkit",
    badge: "Sơ Cứu Cơn Thèm",
    badgeColor: "amber",
    price: "99.000 VNĐ",
    originalPrice: "199.000đ",
    title: "Dopamine Menu & Sổ Tay Đảo Chiều Trì Hoãn",
    tagline: "40 Nguồn Năng Lượng Tự Nhiên Thay Thế Phản Xạ Quẹt Điện Thoại Vô Thức",
    description: "Bộ não nghiện lướt short video không phải vì nó hư hỏng, mà vì nó đang kiệt sức và cần một liều xả stress nhanh. Dopamine Menu cung cấp thực đơn các hoạt động giải tỏa tự nhiên được phân loại khoa học (món khai vị 2 phút, món chính 20 phút, món tráng miệng) để bạn luôn có phương án lành mạnh sẵn sàng thay thế.",
    highlights: [
      "Khoa học thần kinh về Dopamine Baseline: Hiểu rõ cơ chế 'đói dopamine' để thôi tự dằn vặt",
      "Bảng Dopamine Menu 4 nhóm: Khai vị (2-5 phút), Món chính (20-30 phút), Món kèm và Món tráng miệng",
      "Quy tắc 2 Phút Vượt Rào Cản Amygdala: Mẹo sinh học bẻ gãy cơn lười khi bắt đầu ngồi vào bàn",
      "File PDF thiết kế mỹ cảm Zen Watercolor có thể in ra treo đầu giường hoặc dán góc bàn làm việc",
    ],
    duration: "Sử dụng hàng ngày",
    format: "Ebook PDF tương tác 45 trang + Bảng Dopamine Menu in khổ A4",
    targetAudience: "Người hay buồn chán là với tay lấy điện thoại, nghiện TikTok/Reels và không biết làm gì khi rảnh",
    ctaText: "Tải Trọn Bộ Dopamine Menu (99k)",
    ctaHref: "/trac-nghiem?focus=dopamine-menu",
  },
  {
    id: "14-ngay-thoi-luot",
    badge: "Thử Thách Kỷ Luật Nhẹ",
    badgeColor: "rose",
    price: "149.000 VNĐ",
    originalPrice: "299.000đ",
    title: "Thử Thách 14 Ngày Thôi Lướt & Trở Về Đời Thực",
    tagline: "14 Audio Đồng Hành Cùng Mây & Hành Động Vi Mô 1% Để Thoát Bẫy Sáng - Đêm",
    description: "Học từ tinh thần 'Thôi Né' bình dị và phương pháp chữa lành không phán xét. Mỗi sáng bạn nhận được 1 tập audio 5 phút từ Mây (giọng đọc ấm áp, không giáo điều) cùng đúng 1 bài tập vi mô để phá vỡ thói quen mở mắt ra là lướt điện thoại và ôm máy đến tận 2h sáng.",
    highlights: [
      "14 Tập Audio Podcast độc quyền từ Mây: Vỗ về tâm trí, gỡ bỏ mặc cảm tội lỗi và thắp sáng động lực",
      "Quy tắc Sạc Pin 2 Mét: Giao thức vật lý đơn giản nhất để giành lại giấc ngủ sâu tự nhiên",
      "Làm chủ 60 phút buổi sáng không màn hình: Đánh thức giác quan với ánh nắng và không khí trong lành",
      "Sổ tay ghi chép Wabi Sabi: Học cách tha thứ và đứng dậy nhẹ nhàng mỗi khi lỡ trượt chân",
    ],
    duration: "14 Ngày chuyển hóa",
    format: "14 Audio Podcast mỗi sáng + Thẻ bài tập vi mô 1% qua Email/Zalo",
    targetAudience: "Người ôm điện thoại lúc nửa đêm cay xè mắt, sáng dậy mệt mỏi đờ đẫn và muốn tìm lại nhịp sống an lành",
    ctaText: "Tham Gia Thử Thách 14 Ngày (149k)",
    ctaHref: "/trac-nghiem?focus=14-days",
  },
  {
    id: "28-ngay-tai-lap-he-than-kinh",
    badge: "Giao Thức Chuyển Hóa Cốt Lõi",
    badgeColor: "emerald",
    isPopular: true,
    price: "390.000 VNĐ",
    originalPrice: "790.000đ",
    title: "28 Ngày Tái Lập Hệ Thần Kinh: Kỷ Luật Không Cần Gồng",
    tagline: "Giao Thức Tái Lập Dopamine Nền, Giải Phóng Sương Mù Não & Làm Chủ 4 Giờ Deep Work",
    description: "Không ép bạn tu khổ hạnh hay biệt lập xã hội. Đây là giao thức 4 tuần được thiết kế bài bản kết hợp giữa y văn Dopamine Reset (Anna Lembke), 4 Nguyên tắc thực thi 4DX và 7 Thói quen tự chủ của FranklinCovey. Giúp bạn từng bước hạ nhiệt kích thích siêu ngưỡng và xây dựng sự tự tin trường tồn từ bên trong.",
    highlights: [
      "Lộ trình 4 Tuần chuẩn y văn: Tuần 1 Nhận diện → Tuần 2 Tăng ma sát → Tuần 3 Tái tạo → Tuần 4 Neo đậu lẽ sống",
      "Ứng dụng 4DX cá nhân: Xác định mục tiêu tối quan trọng (WIG) và theo dõi chỉ số dẫn dắt (Lead Measures)",
      "Giao thức chống 'Ăn bù kích thích' (Rebound Trap): Khắc phục triệt để tình trạng tái nghiện sau vài ngày cố gắng",
      "Khôi phục năng lực làm việc sâu (Deep Work): Hoàn thành khối lượng việc 8 tiếng chỉ trong 3-4 tiếng tập trung cao độ",
      "Tặng kèm trọn bộ: The Calm Brain System (Notion) + Ebook Dopamine Menu",
    ],
    duration: "28 Ngày rèn luyện chuyên sâu",
    format: "Video Essay Faceless độc quyền + Workbook tự phản tư + Bảng điểm 4DX cá nhân",
    targetAudience: "Người đã cố gắng bỏ thói quen xấu nhiều lần nhưng thất bại, mất niềm tin vào bản thân và cần một hệ thống khoa học toàn diện",
    ctaText: "Bắt Đầu 28 Ngày Tái Sinh (390k)",
    ctaHref: "/trac-nghiem?focus=28-days",
  },
  {
    id: "dong-chay-tinh-lang-ikigai",
    badge: "Kiến Trúc Sống Trọn Đời",
    badgeColor: "amber",
    price: "490.000 VNĐ",
    originalPrice: "990.000đ",
    title: "Dòng Chảy Tĩnh Lặng: Hệ Thống Ikigai & Năng Lượng Trọn Đời",
    tagline: "Triết Lý Sea Change — Sửa Đúng 1 Thói Quen Cốt Tử Mỗi Tháng Để Sống Có Chủ Đích",
    description: "Học từ triết lý tối giản của Zen Habits và cuốn sách Bẫy Tiện Nghi (The Comfort Crisis). Thay vì gồng mình sửa đổi mọi thứ cùng lúc để rồi kiệt sức, bạn được trang bị một hệ điều hành sống trọn đời: làm bạn với sự khó chịu lành mạnh, nuôi dưỡng 5 nguồn năng lượng sinh học và sống một cuộc đời sâu sắc, có ý nghĩa.",
    highlights: [
      "Phương pháp 'Sea Change' của Leo Babauta: Bẻ gãy từng thói quen then chốt theo chu kỳ 30 ngày bền vững",
      "Quản trị 5 nguồn năng lượng sinh học (The 5 Choices): Giấc ngủ, Vận động tiếp đất, Dinh dưỡng, Tĩnh lặng và Kết nối sâu",
      "Thiết lập lối sống Zen Minimalist: Tối giản không gian sống, giải phóng rác số và tinh lọc các mối quan hệ",
      "Vòng tròn đồng hành ẩn danh 'Góc Tĩnh Lặng': Check-in hàng tuần cùng những người bạn cùng chí hướng",
      "Đặc quyền truy cập trọn đời toàn bộ tài nguyên, template và các bản cập nhật mới của Trại Cai Nghiện",
    ],
    duration: "Đồng hành & Ứng dụng trọn đời",
    format: "Toàn bộ tài nguyên số + Audio Masterclass + Không gian đồng hành độc quyền",
    targetAudience: "Những ai muốn tái thiết toàn diện phong cách sống, xây dựng kỷ luật tự thân bền vững và trở về phiên bản tốt nhất của chính mình",
    ctaText: "Nhận Hệ Điều Hành Trọn Đời (490k)",
    ctaHref: "/trac-nghiem?focus=ikigai-lifestyle",
  },
];
