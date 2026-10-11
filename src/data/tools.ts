export interface ToolItem {
  id: string;
  name: string;
  category: "App" | "Physical" | "Printable";
  categoryLabel: string;
  badge: string;
  description: string;
  highlights: string[];
  linkText: string;
  url: string;
  isFree: boolean;
}

export const tools: ToolItem[] = [
  {
    id: "opal-screen-time",
    name: "Opal: Ứng Dụng Khóa Màn Hình Nghiêm Ngặt",
    category: "App",
    categoryLabel: "Ứng dụng di động",
    badge: "Khuyên dùng số 1",
    description: "Ứng dụng giúp bạn chặn triệt để các ứng dụng gây nghiện (TikTok, Facebook, Game) theo khung giờ định sẵn với chế độ Deep Focus không thể mở khóa.",
    highlights: [
      "Chế độ 'Khóa cứng': Không thể phá vỡ kể cả khởi động lại máy",
      "Lập lịch tự động khóa từ 22h00 đêm đến 07h00 sáng",
      "Thống kê số giờ sự chú ý bạn đã giành lại được mỗi tuần",
    ],
    linkText: "Tải trên App Store / Google Play",
    url: "https://www.opal.so/",
    isFree: true,
  },
  {
    id: "forest-focus",
    name: "Forest: Trồng Cây Tập Trung Pomodoro",
    category: "App",
    categoryLabel: "Ứng dụng di động",
    badge: "Thực hành Pomodoro",
    description: "Mỗi khi cần tập trung làm việc 25-50 phút, bạn gieo một hạt mầm. Nếu thoát ra bấm điện thoại, cái cây sẽ chết. Nếu kiên trì, bạn sẽ có cả một khu rừng xanh tươi.",
    highlights: [
      "Ứng dụng cơ chế Game hóa (Gamification) lành mạnh",
      "Có thể hợp tác trồng cây cùng bạn bè để giám sát lẫn nhau",
      "Cây ảo được tích điểm để trồng cây thật ngoài đời tại Châu Phi",
    ],
    linkText: "Tải ứng dụng Forest",
    url: "https://www.forestapp.cc/",
    isFree: true,
  },
  {
    id: "habit-tracker-journal",
    name: "Sổ Tay Nhật Ký Streak & Trigger 90 Ngày",
    category: "Physical",
    categoryLabel: "Công cụ vật lý",
    badge: "Vật phẩm thực chiến",
    description: "Sổ tay bìa da thiết kế chuyên biệt cho người cai nghiện hành vi: ghi chép cảm xúc trước cơn thèm, theo dõi chuỗi ngày sạch và ghi lại bài học sau những lần vấp ngã.",
    highlights: [
      "Bảng theo dõi Streak 90 ngày trực quan bằng biểu đồ nhiệt",
      "Mẫu giải phẫu Trigger: Cảm xúc thật - Tín hiệu - Routine thay thế",
      "Giấy chống lóa mắt, khổ nhỏ gọn mang theo bên mình",
    ],
    linkText: "Xem chi tiết sổ tay",
    url: "https://tiki.vn/search?q=so+tay+habit+tracker",
    isFree: false,
  },
  {
    id: "dopamine-menu-template",
    name: "Bảng Dopamine Menu & 7 Ngày Reset (PDF Miễn Phí)",
    category: "Printable",
    categoryLabel: "Tài liệu tải về",
    badge: "Tải miễn phí",
    description: "Mẫu biểu in ra dán trước bàn làm việc gồm thực đơn các niềm vui tự nhiên lành mạnh (Khai vị, Món chính, Món tráng miệng) để thay thế khi cơn thèm xuất hiện.",
    highlights: [
      "Phân chia niềm vui: 5 phút, 15 phút, 30 phút và 1 tiếng",
      "Bảng theo dõi 7 ngày hạ liều lượng dopamine rẻ tiền (Kaizen 1%)",
      "In ra giấy A4 đơn giản, dễ áp dụng ngay lập tức",
    ],
    linkText: "Tải file PDF miễn phí",
    url: "#",
    isFree: true,
  },
];
