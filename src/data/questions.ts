export interface Question {
  id: number;
  question: string;
  scenario: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const assessmentQuestions: Question[] = [
  {
    id: 1,
    question: "Thói quen buổi tối trước khi đi ngủ của bạn là gì?",
    scenario: "Khi bạn đã nằm lên giường và tắt đèn phòng...",
    options: [
      { text: "Để điện thoại xa giường, nhắm mắt ngủ ngay trong 15-20 phút.", score: 0 },
      { text: "Xem tin tức hoặc nhắn tin khoảng 15 phút rồi cất máy đi ngủ.", score: 1 },
      { text: "Lướt mạng xã hội/video ngắn 30-60 phút, nhiều hôm mỏi mắt mới dừng.", score: 2 },
      { text: "Lướt vô thức đến 1-2h sáng, máy nóng pin yếu, tự nhủ 'nốt cái này' nhiều lần.", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Phản xạ đầu tiên của bạn khi thức dậy vào buổi sáng?",
    scenario: "Chuông báo thức vừa reo hoặc mắt vừa mở ra...",
    options: [
      { text: "Rời khỏi giường, vươn vai uống nước hoặc tập thể dục nhẹ.", score: 0 },
      { text: "Tắt chuông, nằm tĩnh tâm hoặc nghĩ về lịch trình trong ngày.", score: 1 },
      { text: "Với tay lấy điện thoại xem thông báo, tin nhắn trong 5-10 phút.", score: 2 },
      { text: "Cầm máy lướt TikTok/Facebook/Reels ngay trên giường từ 20-45 phút trước khi chịu dậy.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Khả năng chịu đựng sự buồn chán trong ngày của bạn ra sao?",
    scenario: "Khi đứng đợi thang máy, dừng đèn đỏ, hoặc ngồi đợi bạn ở quán nước...",
    options: [
      { text: "Thoải mái nhìn ngắm xung quanh hoặc thả lỏng tâm trí.", score: 0 },
      { text: "Đôi khi thấy sốt ruột nhưng vẫn có thể đứng yên không cần màn hình.", score: 1 },
      { text: "Phần lớn sẽ rút điện thoại ra kiểm tra gì đó cho đỡ trống trải.", score: 2 },
      { text: "Không chịu nổi 15 giây rảnh rỗi mà không bấm điện thoại.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Khi bạn cần làm việc sâu hoặc đọc một cuốn sách:",
    scenario: "Bạn ngồi vào bàn để hoàn thành một nhiệm vụ đòi hỏi sự tập trung...",
    options: [
      { text: "Tập trung liên tục 45-60 phút một cách dễ dàng.", score: 0 },
      { text: "Sau khoảng 25-30 phút mới cảm thấy hơi xao nhãng.", score: 1 },
      { text: "Làm được 10-15 phút là tay tự động mở tab mới hoặc với lấy điện thoại.", score: 2 },
      { text: "Đọc 1 trang sách thấy chữ nhảy múa, bồn chồn, mở điện thoại ngay sau 3 phút.", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Khi ngồi ăn cơm một mình:",
    scenario: "Bữa trưa hoặc bữa tối khi chỉ có một mình bạn...",
    options: [
      { text: "Ăn trong yên tĩnh, cảm nhận trọn vẹn hương vị món ăn.", score: 0 },
      { text: "Đôi lúc nghe nhạc nhẹ hoặc trò chuyện nếu có ai đó gần.", score: 1 },
      { text: "Thường xuyên vừa ăn vừa lướt mạng xã hội.", score: 2 },
      { text: "Bắt buộc phải có video YouTube/phim/Reels thì mới nuốt nổi bát cơm.", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Tâm trạng của bạn trong ngày thường như thế nào?",
    scenario: "Khoảng thời gian giữa buổi chiều hoặc sau giờ tan làm...",
    options: [
      { text: "Ổn định, tỉnh táo và có năng lượng tích cực.", score: 0 },
      { text: "Thỉnh thoảng mệt mỏi nhưng nghỉ ngơi là hồi phục.", score: 1 },
      { text: "Hay cáu gắt vô cớ, dễ mất kiên nhẫn với người thân xung quanh.", score: 2 },
      { text: "Luôn cảm thấy u uất ngấm ngầm, đầu óc nặng nề, trống rỗng và bồn chồn.", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Hành vi tìm kiếm sự xoa dịu khi gặp căng thẳng (Stress):",
    scenario: "Mỗi khi bị áp lực công việc, tranh cãi với ai đó, hoặc cảm thấy cô đơn...",
    options: [
      { text: "Đi dạo, hít thở sâu, chia sẻ với bạn bè hoặc viết nhật ký.", score: 0 },
      { text: "Dành thời gian nghỉ ngơi, nghe một bản nhạc yêu thích.", score: 1 },
      { text: "Tìm đến đồ ngọt, đồ ăn nhanh hoặc mua sắm online vài món nhỏ.", score: 2 },
      { text: "Lập tức trốn vào phim khiêu dâm (porn), cày game, mua sắm bốc đồng hoặc lướt video hàng giờ.", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Bạn cảm thấy thế nào khi vô tình để quên điện thoại hoặc mất mạng?",
    scenario: "Điện thoại hết pin hoặc mạng chập chờn trong 2-3 tiếng...",
    options: [
      { text: "Thấy nhẹ nhõm, tận hưởng không gian tĩnh lặng.", score: 0 },
      { text: "Hơi bất tiện vì liên lạc nhưng không thấy hoảng loạn.", score: 1 },
      { text: "Bứt rứt, liên tục sờ vào túi quần kiểm tra.", score: 2 },
      { text: "Hoang mang, lo âu tột độ (hội chứng FOMO), như bị ngắt khỏi thế giới.", score: 3 },
    ],
  },
  {
    id: 9,
    question: "Cảm nhận về các niềm vui bình dị trong cuộc sống thực tế:",
    scenario: "Đi dạo dưới bóng cây, ngắm hoàng hôn, trò chuyện trực tiếp cùng người thân...",
    options: [
      { text: "Rất trân trọng và cảm nhận được sự ấm áp, sâu sắc.", score: 0 },
      { text: "Vẫn thấy vui dù đôi lúc đầu óc có nghĩ đến việc khác.", score: 1 },
      { text: "Thấy hơi nhạt nhẽo, tâm trí luôn thúc giục tìm kiếm thứ gì kích thích hơn.", score: 2 },
      { text: "Hoàn toàn chai sạn cảm xúc, không thấy niềm vui nào ngoài dopamine trên màn hình.", score: 3 },
    ],
  },
  {
    id: 10,
    question: "Bạn đã từng cố gắng thay đổi thói quen xấu chưa?",
    scenario: "Những lần bạn tự nhủ 'từ ngày mai sẽ ngủ sớm, bớt bấm máy'...",
    options: [
      { text: "Tôi kiểm soát tốt thời gian sử dụng thiết bị của mình.", score: 0 },
      { text: "Đã thử và duy trì được một vài thói quen tốt cơ bản.", score: 1 },
      { text: "Thử vài lần nhưng chỉ được 2-3 ngày là tái nghiện lại như cũ.", score: 2 },
      { text: "Rất nhiều lần thất bại, rơi vào cảm giác bất lực, tự trách mình yếu kém và buông xuôi.", score: 3 },
    ],
  },
];

export interface AssessmentResult {
  level: "balance" | "mild" | "severe";
  title: string;
  badge: string;
  color: string;
  description: string;
  scientificInsight: string;
  actionKaizen: string;
}

export function calculateResult(score: number): AssessmentResult {
  if (score <= 8) {
    return {
      level: "balance",
      title: "Cân Bằng Sinh Học & Làm Chủ Sự Chú Ý",
      badge: "Mức độ: An toàn & Ổn định (Xanh)",
      color: "emerald",
      description: "Hệ thống dopamine của bạn đang ở trạng thái cân bằng nội môi lành mạnh. Bạn có khả năng kết nối tốt với thực tại và biết cách bảo vệ sự tập trung của mình.",
      scientificInsight: "Chiếc bập bênh khoái cảm - nỗi đau của bạn không bị lệch. Bạn vẫn cảm nhận trọn vẹn những niềm vui giản dị từ cuộc sống đời thường.",
      actionKaizen: "Duy trì thói quen hiện tại và tiếp tục bảo vệ 60 phút buổi sáng không chạm vào màn hình (theo Laura Vanderkam).",
    };
  } else if (score <= 18) {
    return {
      level: "mild",
      title: "Chớm Quá Tải & Suy Giảm Tập Trung Thứ Phát",
      badge: "Mức độ: Cảnh báo nhẹ (Vàng)",
      color: "amber",
      description: "Bộ não bạn đang bắt đầu bị quá tải bởi các kích thích dopamine rẻ tiền. Bạn bắt đầu thấy việc tập trung trở nên khó khăn hơn và thỉnh thoảng cảm thấy bồn chồn khi ngắt kết nối.",
      scientificInsight: "Theo Dr. Anna Lembke, các chú 'tiểu yêu' bên nỗi đau đã bắt đầu kéo đến để kéo thăng bằng lại. Đây là lý do bạn cảm thấy ngày hôm sau hơi lờ đờ và dễ cáu gắt.",
      actionKaizen: "Áp dụng ngay Quy tắc 2 mét: Tối nay sạc điện thoại ở bàn làm việc cách giường 2 mét. Muốn lướt phải ngồi dậy.",
    };
  } else {
    return {
      level: "severe",
      title: "Kiệt Quệ Dopamine & Phân Mảnh Tâm Trí Báo Động",
      badge: "Mức độ: Báo động kiệt quệ (Đỏ cam)",
      color: "rose",
      description: "Hệ thống thần kinh của bạn đang ở trạng thái thiếu hụt dopamine thứ phát (Dopamine Deficit State). Bạn đang dùng các kích thích mạnh để tự gây tê những căng thẳng, cô đơn hoặc trống rỗng.",
      scientificInsight: "Bạn không hề yếu đuối! Cảm giác bất lực và tái nghiện liên tục là hội chứng 'Bất lực tập nhiễm' (Martin Seligman). Chiếc bập bênh não bộ đang kẹt cứng ở bên đau đớn.",
      actionKaizen: "Đừng vội cắt bỏ đột ngột (Cold-turkey). Hãy thực hành Kaizen: Hôm nay chỉ bớt 10 phút lướt điện thoại, và áp dụng Wabi Sabi: tha thứ hoàn toàn cho những lần vấp ngã vừa qua.",
    };
  }
}
