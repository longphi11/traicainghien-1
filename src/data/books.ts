export interface Book {
  id: string;
  title: string;
  originalTitle: string;
  author: string;
  category: "Neurobiology" | "Habit" | "Mindset" | "Society";
  categoryLabel: string;
  badge: string;
  coverColor: string;
  oneLiner: string;
  coreLessons: string[];
  quote: string;
  affiliateUrl: string;
}

export const books: Book[] = [
  {
    id: "dopamine-nation",
    title: "Giải Mã Dopamine (Dopamine Nation)",
    originalTitle: "Dopamine Nation: Finding Balance in the Age of Indulgence",
    author: "Dr. Anna Lembke (Đại học Stanford)",
    category: "Neurobiology",
    categoryLabel: "Sinh học thần kinh",
    badge: "Kinh điển về não bộ",
    coverColor: "from-amber-700 to-amber-900",
    oneLiner: "Cuốn sách bóc trần cơ chế chiếc bập bênh Khoái cảm - Nỗi đau và lý do tại sao chúng ta rơi vào trạng thái thiếu hụt dopamine thứ phát.",
    coreLessons: [
      "Khoái cảm và nỗi đau được xử lý tại cùng một vùng não bộ và luôn tìm cách cân bằng nội môi.",
      "Càng kích thích dopamine rẻ tiền, bầy tiểu yêu đè nặng bên nỗi đau càng đông.",
      "Sự thật triệt để (Radical Honesty) và kiêng khem có kiểm soát là cách duy nhất để lập lại cân bằng.",
    ],
    quote: "Trong một thế giới thừa mứa kích thích, việc học cách nói 'không' và đối diện với sự buồn chán chính là cánh cửa dẫn tới tự do.",
    affiliateUrl: "https://tiki.vn/search?q=dopamine+nation",
  },
  {
    id: "atomic-habits",
    title: "Thói Quen Nguyên Tử (Atomic Habits)",
    originalTitle: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    category: "Habit",
    categoryLabel: "Xây dựng thói quen",
    badge: "Sách gối đầu giường",
    coverColor: "from-emerald-700 to-emerald-900",
    oneLiner: "Không cần thay đổi cuộc đời bằng những cú sốc vĩ đại, hãy cải thiện 1% mỗi ngày và thiết kế lại môi trường sống vi mô.",
    coreLessons: [
      "Thói quen dựa trên căn tính: Mục tiêu không phải là đọc sách, mà là trở thành người đọc sách.",
      "4 Quy luật đảo ngược để bẻ gãy thói quen xấu: Vô hình, Kém hấp dẫn, Khó khăn, Không thỏa mãn.",
      "Môi trường quyết định hành vi mạnh hơn ý chí trần trụi rất nhiều.",
    ],
    quote: "Bạn không vươn lên tới tầm của những mục tiêu bạn đặt ra. Bạn rơi xuống ngang bằng với trình độ của các hệ thống bạn thiết kế.",
    affiliateUrl: "https://tiki.vn/search?q=thoi+quen+nguyen+tu",
  },
  {
    id: "the-comfort-crisis",
    title: "Khủng Hoảng Của Sự Tiện Nghi (The Comfort Crisis)",
    originalTitle: "The Comfort Crisis: Embrace Discomfort to Reclaim Your Wild",
    author: "Michael Easter",
    category: "Society",
    categoryLabel: "Tiến hóa & Thể chất",
    badge: "Thức tỉnh lối sống",
    coverColor: "from-stone-700 to-stone-900",
    oneLiner: "Bộ não thời đồ đá sống trong thế giới hiện đại siêu tiện nghi khiến chúng ta mắc chứng sợ buồn chán và mất dần bản lĩnh sinh tồn.",
    coreLessons: [
      "Con người hiện đại không thể chịu đựng nổi 30 giây rảnh rỗi mà không với tay lấy điện thoại.",
      "Sự buồn chán không phải căn bệnh cần chữa cháy; nó là khoảng lặng nuôi dưỡng sáng tạo.",
      "Khó chịu tự nguyện (Misogi): Đón nhận thử thách khó khăn để rèn luyện tinh thần kiên cường.",
    ],
    quote: "Chúng ta đang tự giam mình trong chiếc lồng êm ấm của sự tiện nghi, để rồi trả giá bằng một tâm hồn mỏng manh dễ vỡ.",
    affiliateUrl: "https://tiki.vn/search?q=the+comfort+crisis",
  },
  {
    id: "thoi-dai-chu-y",
    title: "Thời Đại Của Sự Chú Ý",
    originalTitle: "The Attention Merchants / Twilight of Attention",
    author: "Chris Hayes / Tim Wu",
    category: "Society",
    categoryLabel: "Kinh tế & Công nghệ",
    badge: "Vạch trần thuật toán",
    coverColor: "from-blue-700 to-blue-900",
    oneLiner: "Sự chú ý của bạn là mỏ dầu đắt giá nhất hành tinh và các thuật toán được sinh ra để xâu xé từng giây từng phút trong đời bạn.",
    coreLessons: [
      "Mô hình kinh doanh của mạng xã hội là giữ mắt bạn trên màn hình càng lâu càng tốt.",
      "Tâm trí bị xé nhỏ thành từng mảnh vụn, phá hủy hoàn toàn khả năng tư duy sâu.",
      "Cai nghiện không đơn thuần là bỏ điện thoại, đó là cuộc chiến giành lại chủ quyền cuộc đời.",
    ],
    quote: "Nếu bạn không trả tiền cho sản phẩm, chính sự chú ý và thời gian của bạn là món hàng được đem bán.",
    affiliateUrl: "https://tiki.vn/search?q=thoi+dai+chu+y",
  },
  {
    id: "ikigai",
    title: "Ikigai: Đi Tìm Lý Do Thức Dậy Mỗi Sáng",
    originalTitle: "Ikigai: The Japanese Secret to a Long and Happy Life",
    author: "Héctor García & Francesc Miralles",
    category: "Mindset",
    categoryLabel: "Lẽ sống & Hiện sinh",
    badge: "Triết lý Á Đông",
    coverColor: "from-rose-700 to-rose-900",
    oneLiner: "Bỏ thói quen xấu không phải bằng cấm đoán khổ hạnh, mà bằng cách gieo một hạt mầm lẽ sống mới rực rỡ để bóng tối tự lùi xa.",
    coreLessons: [
      "Khoảng trống hiện sinh là mảnh đất màu mỡ nhất khiến con người tìm đến dopamine rẻ tiền.",
      "Trạng thái dòng chảy (Flow State): Đắm mình trọn vẹn trong từng công việc nhỏ bé.",
      "Quy tắc Hara Hachi Bu: Ăn no 80%, sống điều độ và biết điểm dừng an yên.",
    ],
    quote: "Chỉ khi bạn tìm thấy điều khiến trái tim mình rung động mỗi sớm mai, bạn mới thôi tìm kiếm sự kích thích giả tạo trong đêm tối.",
    affiliateUrl: "https://tiki.vn/search?q=ikigai+tieng+viet",
  },
  {
    id: "the-power-of-habit",
    title: "Sức Mạnh Của Thói Quen (The Power of Habit)",
    originalTitle: "The Power of Habit: Why We Do What We Do in Life and Business",
    author: "Charles Duhigg",
    category: "Habit",
    categoryLabel: "Xây dựng thói quen",
    badge: "Cơ chế hành vi",
    coverColor: "from-teal-700 to-teal-900",
    oneLiner: "Không thể triệt tiêu một thói quen xấu; hãy giữ nguyên Tín hiệu và Phần thưởng, chỉ thay thế mắt xích Hành vi (Routine).",
    coreLessons: [
      "Vòng lặp thói quen: Tín hiệu (Cue) -> Khao khát (Craving) -> Phản hồi (Routine) -> Phần thưởng (Reward).",
      "Quy tắc vàng: Tìm ra nhu cầu cảm xúc thật đằng sau cơn thèm để thay thế bằng hành vi lành mạnh.",
      "Thói quen nòng cốt (Keystone Habits) tạo đà thay đổi dây chuyền cho toàn bộ lối sống.",
    ],
    quote: "Bạn không thể dập tắt cơn thèm khát bằng cách làm ngơ nó; bạn phải thấu hiểu phần thưởng mà tâm trí bạn đang khao khát.",
    affiliateUrl: "https://tiki.vn/search?q=suc+manh+cua+thoi+quen",
  },
];
