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
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

export const addictionSystemProducts: AddictionSystemProduct[] = [
  {
    id: "30d-reset",
    badge: "Chương Trình Chuyển Hóa Cốt Lõi",
    badgeColor: "emerald",
    isPopular: true,
    title: "30D Reset: Tái Thiết Lập Nhịp Sống & Tâm Trí",
    tagline: "30 Ngày Cai Nghiện Dopamine Rẻ Tiền & Tìm Lại Quyền Làm Chủ Cuộc Đời",
    description: "Không ép bạn tu khổ hạnh hay nhìn vào tường 24 giờ. Đây là lộ trình 30 ngày từng bước hạ nhiệt kích thích siêu ngưỡng bằng phương pháp Kaizen 1%, nghỉ ngơi không tội lỗi và cài đặt lại hệ thống thói quen buổi sáng theo tinh thần Ikigai.",
    highlights: [
      "4 Tuần bóc tách từ gốc rễ: Nhận diện Trigger -> Tăng lực cản Ma sát (Friction) -> Xây dựng Dopamine Menu -> Neo đậu lẽ sống",
      "Giao thức chống 'Ăn bù kích thích' (Rebound Trap) độc quyền dựa trên y văn Anna Lembke",
      "Bài tập thực hành vi mô mỗi ngày 10-15 phút, người bận rộn cũng dễ dàng duy trì",
      "Nhật ký tự soi chiếu theo tinh thần Wabi Sabi: Tha thứ hoàn toàn khi trượt chân",
    ],
    duration: "30 Ngày thực hành",
    format: "Lộ trình tự rèn luyện (DIY) hoặc Có bạn đồng hành",
    targetAudience: "Người mất tập trung, cạn kiệt năng lượng, lướt điện thoại đêm muộn và hay trì hoãn các mục tiêu lớn",
    ctaText: "Khám phá lộ trình 30D Reset",
    ctaHref: "/he-thong-cai-nghien#30d-reset",
  },
  {
    id: "digital-detox-protocol",
    badge: "Hồi Phục Tình Dục Kỹ Thuật Số",
    badgeColor: "rose",
    title: "The Pure Mind: Thoát Khỏi Ma Trận Pỏn & Khoái Cảm Ảo",
    tagline: "Hệ Thống Khoa Học Hành Vi Toàn Diện Để Khôi Phục Sinh Lực & Cảm Xúc Thực",
    description: "Porn và thủ dâm quá độ là chiếc bẫy dopamine độc hại nhất của thời đại số, bào mòn sinh lực, gây chai sạn cảm xúc và hủy hoại các mối quan hệ đời thực. Khóa huấn luyện cung cấp chiếc khiên bảo vệ tâm lý, giải mã cơn thèm và hàn gắn sự tự tin từ bên trong.",
    highlights: [
      "Giải mã cơ chế 'Coolidge Effect' và lý do não bộ bị cuốn vào vòng lặp kích thích vô tận",
      "Giao thức SOS Cấp cứu: 3 phút cắt đứt xung động thèm muốn ngay tại thời điểm nguy hiểm nhất",
      "Xóa tan mặc cảm tội lỗi & nỗi xấu hổ thầm kín — chuyển hóa năng lượng sinh học sang tập gym, sự nghiệp và sáng tạo",
      "Thiết lập bộ lọc môi trường số (Digital Environment Shield) ngăn chặn triệt để các ngòi nổ kích thích",
    ],
    duration: "Lộ trình 60 ngày hồi phục",
    format: "Tài liệu chuyên sâu, Bài tập CBT & Không gian bảo mật 100%",
    targetAudience: "Những ai đang vật lộn trong bóng tối với phim khiêu dâm, kiệt quệ ý chí và muốn lấy lại bản lĩnh đàn ông đích thực",
    ctaText: "Tìm hiểu hệ thống Pure Mind",
    ctaHref: "/he-thong-cai-nghien#pure-mind",
  },
  {
    id: "deep-focus-system",
    badge: "Thiết Kế Năng Suất & Trị Não Phân Tâm",
    badgeColor: "blue",
    title: "Deep Flow: Năng Suất Dành Cho Não Bộ Dễ Phân Tâm",
    tagline: "Xây Dựng Hệ Thống Tập Trung Sâu Cho Người Có Xu Hướng ADHD & Quá Tải Nhận Thức",
    description: "Nếu bạn không thể ngồi yên 15 phút, liên tục nhảy tab trình duyệt và cảm thấy các phương pháp quản lý thời gian truyền thống (như To-do list cứng nhắc) đều thất bại... Bạn không hề kém cỏi! Bạn chỉ cần một hệ thống được may đo riêng cho cách não bộ phân tâm vận hành.",
    highlights: [
      "Khung giờ làm việc Time-boxing trực quan: Biến công việc khô khan thành trò chơi chinh phục",
      "Chiến thuật 'Hộp chứa xao nhãng' (Distraction Inbox): Gom sạch ý nghĩ vẩn vơ để não được thảnh thơi",
      "Thiết kế bàn làm việc & màn hình máy tính theo phong cách Zen Minimalist: Loại bỏ 90% rác thị giác",
      "Khai phóng trạng thái Dòng Chảy (Flow State) để hoàn thành khối lượng việc 8 tiếng chỉ trong 3 tiếng",
    ],
    duration: "Hệ thống áp dụng trọn đời",
    format: "Bộ công cụ mẫu (Notion/Sổ tay) & Video bài giảng thực chiến",
    targetAudience: "Freelancer, Creator, người làm văn phòng hay nhảy việc, khó tập trung sâu và dễ bị choáng ngợp bởi deadline",
    ctaText: "Xây dựng hệ thống Deep Flow",
    ctaHref: "/he-thong-cai-nghien#deep-flow",
  },
  {
    id: "inner-circle-bootcamp",
    badge: "Đồng Hành Trực Tiếp Có Cam Kết",
    badgeColor: "amber",
    title: "VIP Bootcamp: 21 Ngày Tái Sinh Cùng Bộ Tộc",
    tagline: "Sức Mạnh Bộ Tộc (The Culture Code) — Không Còn Phải Chiến Đấu Đơn Độc Trong Đêm Tối",
    description: "Thay đổi một mình rất dễ bỏ cuộc khi cơn thèm ập đến lúc nửa đêm. Trong VIP Bootcamp, bạn được đồng hành cùng một nhóm nhỏ những người cùng chí hướng, có người điểm danh streak mỗi sáng và hỗ trợ tâm lý 24/7.",
    highlights: [
      "Ghép cặp Accountability Partner (Bạn đồng hành chịu trách nhiệm) giám sát chéo mỗi ngày",
      "Zoom vòng tròn chia sẻ cuối tuần (Offline/Online Circle): Nói thật triệt để mà không sợ bị phán xét",
      "Kế hoạch can thiệp cá nhân hóa 1-on-1 dựa trên kết quả bài Trắc nghiệm 20 câu",
      "Hợp đồng cam kết tài chính (Commitment Contract) tạo đòn bẩy tâm lý không thể thoái thác",
    ],
    duration: "21 Ngày đồng hành chuyên sâu",
    format: "Nhóm nhỏ giới hạn số lượng (Dưới 15 người/khóa)",
    targetAudience: "Những ai đã thử cai nghiện nhiều lần một mình nhưng thất bại, cần kỷ luật tập thể và môi trường an toàn",
    ctaText: "Đăng ký danh sách chờ (Waitlist)",
    ctaHref: "/he-thong-cai-nghien#bootcamp",
  },
];
