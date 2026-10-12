export interface Question {
  id: number;
  stageId: number;
  stageName: string;
  stageIcon: string;
  question: string;
  scenario: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const assessmentQuestions: Question[] = [
  // CHẶNG 1: NHỊP SINH HỌC & CƠN BÁO THÙ ĐÊM MUỘN (1-5)
  {
    id: 1,
    stageId: 1,
    stageName: "Nhịp Sinh Học & Đêm Muộn",
    stageIcon: "🌙",
    question: "Khi đã tắt đèn và nằm lên giường, điện thoại thường ở đâu và bạn làm gì?",
    scenario: "Khoảng thời gian từ 23h00 trở đi...",
    options: [
      { text: "Để điện thoại cách xa giường, nhắm mắt thả lỏng ngủ ngay trong 15-20 phút.", score: 0 },
      { text: "Nhắn tin hoặc kiểm tra tin tức nhẹ nhàng khoảng 15 phút rồi tắt máy đi ngủ.", score: 1 },
      { text: "Lướt mạng xã hội/video ngắn 30-60 phút, nhiều hôm thấy mỏi mắt mới chịu buông.", score: 2 },
      { text: "Lướt vô thức đến 1-2h sáng, máy nóng ran pin yếu, tự nhủ 'nốt clip này' nhiều lần.", score: 3 },
    ],
  },
  {
    id: 2,
    stageId: 1,
    stageName: "Nhịp Sinh Học & Đêm Muộn",
    stageIcon: "🌙",
    question: "Phản xạ đầu tiên trong 10 phút sau khi bạn mở mắt thức dậy vào buổi sáng?",
    scenario: "Chuông báo thức vừa reo hoặc mắt vừa mở ra...",
    options: [
      { text: "Rời khỏi giường, vươn vai hít thở, uống một cốc nước ấm hoặc tập thể dục nhẹ.", score: 0 },
      { text: "Tắt chuông, nằm tĩnh tâm một chút hoặc nghĩ về những việc cần làm trong ngày.", score: 1 },
      { text: "Với tay lấy máy kiểm tra tin nhắn, thông báo mạng xã hội trong 5-10 phút.", score: 2 },
      { text: "Cầm máy lướt TikTok/Facebook/Reels ngay trên giường từ 20-45 phút trước khi chịu dậy.", score: 3 },
    ],
  },
  {
    id: 3,
    stageId: 1,
    stageName: "Nhịp Sinh Học & Đêm Muộn",
    stageIcon: "🌙",
    question: "Lần gần nhất bạn ăn một bữa cơm một mình mà KHÔNG cần màn hình là khi nào?",
    scenario: "Bữa trưa hoặc bữa tối khi chỉ có một mình bạn ăn...",
    options: [
      { text: "Thường xuyên ăn trong tĩnh lặng, cảm nhận trọn vẹn hương vị món ăn.", score: 0 },
      { text: "Thỉnh thoảng nghe nhạc nhẹ hoặc trò chuyện nếu có người xung quanh.", score: 1 },
      { text: "Khá thường xuyên vừa ăn vừa lướt mạng xã hội đọc tin tức lặt vặt.", score: 2 },
      { text: "Bắt buộc phải bật video YouTube, phim lồng tiếng hay TikTok thì mới nuốt nổi cơm.", score: 3 },
    ],
  },
  {
    id: 4,
    stageId: 1,
    stageName: "Nhịp Sinh Học & Đêm Muộn",
    stageIcon: "🌙",
    question: "Mức độ tỉnh táo và năng lượng thể chất của bạn vào khoảng 9h - 10h sáng?",
    scenario: "Khi bạn bắt đầu bước vào guồng công việc trong ngày...",
    options: [
      { text: "Tỉnh táo, sảng khoái và tràn đầy năng lượng làm việc.", score: 0 },
      { text: "Hơi uể oải một chút nhưng sau khi uống nước hoặc cà phê là tập trung tốt.", score: 1 },
      { text: "Lờ đờ, ngáp ngắn ngáp dài, cần 2-3 cốc trà hoặc cà phê đậm mới gượng được.", score: 2 },
      { text: "Đầu nặng như đeo chì, người rệu rã, mắt cay xè và chỉ muốn nằm gục xuống bàn.", score: 3 },
    ],
  },
  {
    id: 5,
    stageId: 1,
    stageName: "Nhịp Sinh Học & Đêm Muộn",
    stageIcon: "🌙",
    question: "Bạn có cảm giác 'tiếc nuối ngày trôi qua' nên cố tình thức khuya để đòi lại thời gian riêng?",
    scenario: "Tâm lý 'Cú đêm trả thù' (Revenge Bedtime Procrastination)...",
    options: [
      { text: "Hiếm khi, tôi chủ động sắp xếp thời gian ban ngày để có không gian riêng.", score: 0 },
      { text: "Thỉnh thoảng vào những ngày làm việc quá căng thẳng hoặc bận rộn.", score: 1 },
      { text: "Thường xuyên cảm thấy ban ngày mình sống vì người khác, chỉ đêm mới là của mình.", score: 2 },
      { text: "Hầu như đêm nào cũng vậy: sợ đi ngủ vì ngủ dậy là lại phải đối mặt với một ngày mệt mỏi.", score: 3 },
    ],
  },

  // CHẶNG 2: SỰ CHÚ Ý PHÂN MẢNH & NỖI SỢ BUỒN CHÁN (6-10)
  {
    id: 6,
    stageId: 2,
    stageName: "Sự Chú Ý & Nỗi Sợ Buồn Chán",
    stageIcon: "🧠",
    question: "Bạn có thể bước vào nhà vệ sinh (đi nặng) mà KHÔNG cầm theo điện thoại không?",
    scenario: "Mỗi khi vào toilet đóng cửa lại...",
    options: [
      { text: "Hoàn toàn bình thường, tôi không có thói quen mang điện thoại vào toilet.", score: 0 },
      { text: "Đôi khi mang theo để nghe nhạc hoặc kiểm tra cuộc gọi gấp.", score: 1 },
      { text: "Thường xuyên mang vào lướt xem vài clip ngắn cho đỡ phí thời gian.", score: 2 },
      { text: "Không thể thiếu máy! Nếu quên mang điện thoại là phải quay ra lấy bằng được.", score: 3 },
    ],
  },
  {
    id: 7,
    stageId: 2,
    stageName: "Sự Chú Ý & Nỗi Sợ Buồn Chán",
    stageIcon: "🧠",
    question: "Khi đang xem một bộ phim dài 2 tiếng, tay bạn có lướt điện thoại song song cùng lúc không?",
    scenario: "Hành vi sử dụng màn hình kép (Dual Screening)...",
    options: [
      { text: "Tôi thưởng thức trọn vẹn bộ phim từ đầu đến cuối mà không chạm vào máy.", score: 0 },
      { text: "Chỉ thỉnh thoảng liếc nhìn nếu có tin nhắn hoặc thông báo quan trọng.", score: 1 },
      { text: "Thường xuyên vừa xem phim vừa lướt mạng xã hội lúc phim có đoạn thoại chậm.", score: 2 },
      { text: "Luôn luôn như vậy: tay lướt TikTok/Reels liên tục trong khi TV chỉ phát làm nền.", score: 3 },
    ],
  },
  {
    id: 8,
    stageId: 2,
    stageName: "Sự Chú Ý & Nỗi Sợ Buồn Chán",
    stageIcon: "🧠",
    question: "Phản xạ của bạn khi đứng đợi thang máy 30 giây hoặc dừng đèn đỏ 40 giây?",
    scenario: "Những khoảng trống thời gian ngắn ngủi bất chợt trong ngày...",
    options: [
      { text: "Thoải mái nhìn ngắm đường phố, mọi người xung quanh hoặc thả lỏng tâm trí.", score: 0 },
      { text: "Đôi khi hơi sốt ruột nhưng vẫn có thể đứng yên không cần mở màn hình.", score: 1 },
      { text: "Phần lớn sẽ rút điện thoại ra mở khóa màn hình dù chả có thông báo gì mới.", score: 2 },
      { text: "Không chịu nổi 10 giây rảnh rỗi mà không quẹt ngón tay cái vào màn hình.", score: 3 },
    ],
  },
  {
    id: 9,
    stageId: 2,
    stageName: "Sự Chú Ý & Nỗi Sợ Buồn Chán",
    stageIcon: "🧠",
    question: "Khi cần đọc một trang sách hoặc làm việc sâu, bạn duy trì được bao lâu?",
    scenario: "Khi bạn ngồi vào bàn với một công việc đòi hỏi tư duy...",
    options: [
      { text: "Tập trung liên tục 45-60 phút một cách dễ dàng và thoải mái.", score: 0 },
      { text: "Sau khoảng 25-30 phút mới cảm thấy hơi xao nhãng và cần giải lao.", score: 1 },
      { text: "Cứ 10-15 phút là tay lại tự động mở tab mới hoặc với lấy điện thoại.", score: 2 },
      { text: "Đọc 1 trang sách thấy chữ nhảy múa, bồn chồn khó chịu, cầm máy ngay sau 3 phút.", score: 3 },
    ],
  },
  {
    id: 10,
    stageId: 2,
    stageName: "Sự Chú Ý & Nỗi Sợ Buồn Chán",
    stageIcon: "🧠",
    question: "Bạn có bao giờ trải qua hội chứng 'Ảo giác rung máy' (Phantom Vibration) không?",
    scenario: "Cảm giác máy rung trong túi quần hoặc trên bàn...",
    options: [
      { text: "Chưa bao giờ, tôi ít khi để tâm đến thông báo khi không cần thiết.", score: 0 },
      { text: "Hiếm khi, chỉ vào những lúc đang chờ đợi cuộc gọi hay email cực kỳ quan trọng.", score: 1 },
      { text: "Thỉnh thoảng giật mình tưởng điện thoại rung chuông, móc ra thì không thấy gì.", score: 2 },
      { text: "Rất thường xuyên: luôn có cảm giác bồn chồn phải sờ vào túi quần kiểm tra liên tục.", score: 3 },
    ],
  },

  // CHẶNG 3: CƠ CHẾ ĐỐI PHÓ & GÂY TÊ CẢM XÚC (11-15)
  {
    id: 11,
    stageId: 3,
    stageName: "Cơ Chế Đối Phó Cảm Xúc",
    stageIcon: "🛡️",
    question: "Mỗi khi gặp áp lực công việc, bị chỉ trích hoặc cãi nhau, phản ứng đầu tiên của bạn là gì?",
    scenario: "Cơ chế đối phó khi cảm xúc tiêu cực ập đến...",
    options: [
      { text: "Hít thở sâu, đi dạo, viết nhật ký hoặc chia sẻ thẳng thắn với người tin cậy.", score: 0 },
      { text: "Tạm gác công việc lại để nghỉ ngơi tĩnh tâm một lúc trước khi giải quyết tiếp.", score: 1 },
      { text: "Tìm đến đồ ăn vặt, đồ ngọt hoặc lướt mạng xã hội để phân tán đầu óc.", score: 2 },
      { text: "Lập tức trốn vào cày game, xem porn, mua sắm bốc đồng hoặc cày video ngắn hàng giờ liền.", score: 3 },
    ],
  },
  {
    id: 12,
    stageId: 3,
    stageName: "Cơ Chế Đối Phó Cảm Xúc",
    stageIcon: "🛡️",
    question: "Mức độ phụ thuộc của bạn vào trà sữa, bánh kẹo, đồ ngọt khi thấy tụt mood hoặc chán nản?",
    scenario: "Cơn thèm đường và dopamine hóa chất nhẹ...",
    options: [
      { text: "Tôi ăn uống lành mạnh, hiếm khi dùng đồ ngọt để xoa dịu cảm xúc.", score: 0 },
      { text: "Thỉnh thoảng thưởng cho bản thân một ly trà sữa hoặc món ngon vào cuối tuần.", score: 1 },
      { text: "Thường xuyên thấy thèm ngọt mỗi khi buồn chán hoặc buổi chiều cạn năng lượng.", score: 2 },
      { text: "Không thể sống thiếu đường/trà sữa: một ngày không có là thấy bứt rứt, cáu gắt và tụt pin hoàn toàn.", score: 3 },
    ],
  },
  {
    id: 13,
    stageId: 3,
    stageName: "Cơ Chế Đối Phó Cảm Xúc",
    stageIcon: "🛡️",
    question: "Bạn có thói quen lướt Shopee/TikTok Shop chốt đơn để tìm cảm giác giải tỏa không?",
    scenario: "Cơn nghiện mua sắm vi mô bốc đồng (Impulsive Dopamine Shopping)...",
    options: [
      { text: "Chỉ mua sắm khi thực sự có nhu cầu và lên danh sách rõ ràng trước.", score: 0 },
      { text: "Thỉnh thoảng mua vài món lặt vặt lúc săn sale nhưng kiểm soát được chi tiêu.", score: 1 },
      { text: "Hay lướt các sàn thương mại điện tử để giết thời gian và đặt hàng vì thấy rẻ.", score: 2 },
      { text: "Nghiện cảm giác 'đang đợi shipper giao hàng': đặt liên tục những món về nhà không dùng tới.", score: 3 },
    ],
  },
  {
    id: 14,
    stageId: 3,
    stageName: "Cơ Chế Đối Phó Cảm Xúc",
    stageIcon: "🛡️",
    question: "Bạn có dùng phim khiêu dâm (porn) hoặc thủ dâm như một 'liều thuốc an thần' để dễ ngủ?",
    scenario: "Nghiện tình dục kỹ thuật số và cơ chế trốn tránh nỗi cô đơn...",
    options: [
      { text: "Không, tôi có đời sống tinh thần và tình cảm lành mạnh, cân bằng.", score: 0 },
      { text: "Rất hiếm khi và không bị lệ thuộc vào nó để điều chỉnh tâm trạng.", score: 1 },
      { text: "Thỉnh thoảng tìm đến mỗi khi cảm thấy quá cô đơn, căng thẳng hoặc mất ngủ.", score: 2 },
      { text: "Thường xuyên như một phản xạ bắt buộc: phải xem porn/thủ dâm thì mới xả được stress và thiếp đi.", score: 3 },
    ],
  },
  {
    id: 15,
    stageId: 3,
    stageName: "Cơ Chế Đối Phó Cảm Xúc",
    stageIcon: "🛡️",
    question: "Sau khi vừa đóng máy sau 2 tiếng lướt vô thức, xem porn hay cày game, cảm xúc đọng lại là gì?",
    scenario: "Khoảnh khắc chiếc bập bênh dopamine tụt dốc...",
    options: [
      { text: "Thư giãn, vui vẻ vì đã giải trí vừa đủ và làm chủ thời gian.", score: 0 },
      { text: "Hơi tiếc thời gian một chút nhưng tâm trạng vẫn ổn định.", score: 1 },
      { text: "Cảm thấy hụt hẫng, mệt mỏi và hơi bực mình vì đã tiêu tốn thời gian vô ích.", score: 2 },
      { text: "Cảm giác trống rỗng tột cùng, tội lỗi sâu sắc và chán ghét sự yếu kém của bản thân.", score: 3 },
    ],
  },

  // CHẶNG 4: KHOẢN THUẾ VÔ HÌNH TRONG ĐỜI THỰC (16-20)
  {
    id: 16,
    stageId: 4,
    stageName: "Khoản Thuế Vô Hình Đời Thực",
    stageIcon: "⚖️",
    question: "Bạn có nhận thấy dạo này mình hay cáu bẳn, mất kiên nhẫn vô cớ với người thân xung quanh?",
    scenario: "Sự sụt giảm kiên nhẫn khi não bộ bị thiếu hụt dopamine...",
    options: [
      { text: "Tôi luôn giữ được sự bình tĩnh, lắng nghe và thấu cảm với gia đình, bạn bè.", score: 0 },
      { text: "Đôi lúc có cáu gắt nhưng nhận ra ngay và xin lỗi hoặc điều chỉnh cảm xúc.", score: 1 },
      { text: "Hay gắt gỏng với bố mẹ, người yêu hoặc con cái vì những chuyện rất vụn vặt.", score: 2 },
      { text: "Rất dễ bùng nổ giận dữ: ai hỏi gì lúc đang cầm máy là cảm thấy vô cùng bực bội, khó chịu.", score: 3 },
    ],
  },
  {
    id: 17,
    stageId: 4,
    stageName: "Khoản Thuế Vô Hình Đời Thực",
    stageIcon: "⚖️",
    question: "Khả năng cảm nhận niềm vui của bạn trước những điều bình dị đời thường?",
    scenario: "Một buổi chiều ngắm hoàng hôn, đi dạo dưới bóng cây, hay một cuộc trò chuyện ngoài đời...",
    options: [
      { text: "Cảm nhận rất sâu sắc, thấy ấm áp và trân trọng từng khoảnh khắc giản đơn.", score: 0 },
      { text: "Vẫn thấy vui dù đôi lúc đầu óc có thoáng nghĩ về công việc hay mạng xã hội.", score: 1 },
      { text: "Thấy hơi nhạt nhẽo, tâm trí luôn thôi thúc phải tìm thứ gì kích thích mạnh hơn mới thấy sướng.", score: 2 },
      { text: "Chai sạn cảm xúc hoàn toàn: cuộc đời ngoài đời thực như một bức tranh đen trắng nhạt toẹt.", score: 3 },
    ],
  },
  {
    id: 18,
    stageId: 4,
    stageName: "Khoản Thuế Vô Hình Đời Thực",
    stageIcon: "⚖️",
    question: "Cả ngày Chủ nhật nằm nhà ôm điện thoại 'xả hơi', đến tối Chủ nhật bạn thấy thế nào?",
    scenario: "Cái bẫy 'Nghỉ ngơi giả tạo' (Fake Rest Trap)...",
    options: [
      { text: "Tôi dành cuối tuần cho thể thao, thiên nhiên hoặc gặp bạn bè, thấy người tràn đầy sinh lực.", score: 0 },
      { text: "Nghỉ ngơi vừa phải, sẵn sàng tinh thần cho tuần làm việc mới.", score: 1 },
      { text: "Cảm thấy một ngày trôi qua quá nhanh mà chả làm được gì ra hồn.", score: 2 },
      { text: "Người rệu rã, đầu óc căng thẳng nhức nhối, hoang mang và sợ hãi sáng thứ Hai hơn bao giờ hết.", score: 3 },
    ],
  },
  {
    id: 19,
    stageId: 4,
    stageName: "Khoản Thuế Vô Hình Đời Thực",
    stageIcon: "⚖️",
    question: "Những dự định lớn của bạn (học kỹ năng mới, đọc sách, tập gym, khởi nghiệp) đang ra sao?",
    scenario: "Sự trì hoãn mãn tính vì cạn kiệt năng lượng ý chí...",
    options: [
      { text: "Tôi vẫn duy trì tiến độ đều đặn mỗi tuần cho các mục tiêu cá nhân.", score: 0 },
      { text: "Có những đợt chậm lại nhưng vẫn luôn quay trở lại lộ trình phát triển.", score: 1 },
      { text: "Bị trì hoãn nhiều tháng nay vì tối nào về nhà cũng chỉ còn sức nằm lướt điện thoại.", score: 2 },
      { text: "Đóng băng hoàn toàn: dậm chân tại chỗ nhiều năm, cảm thấy mình đang tự chôn vùi tiềm năng.", score: 3 },
    ],
  },
  {
    id: 20,
    stageId: 4,
    stageName: "Khoản Thuế Vô Hình Đời Thực",
    stageIcon: "⚖️",
    question: "Bạn đã bao nhiêu lần tự hứa 'từ mai sẽ ngủ sớm, sẽ bớt bấm máy' nhưng rồi lại thất bại?",
    scenario: "Hội chứng Bất lực tập nhiễm (Learned Helplessness - Martin Seligman)...",
    options: [
      { text: "Tôi kiểm soát tốt thói quen của mình, cam kết là thực hiện được.", score: 0 },
      { text: "Đã thử vài lần và thành công trong việc xây dựng một vài giới hạn lành mạnh.", score: 1 },
      { text: "Cố gắng bỏ được 2-3 ngày đầu rồi đâu lại vào đấy, cảm thấy nản lòng.", score: 2 },
      { text: "Quá nhiều lần thất bại đến mức rơi vào tuyệt vọng, không còn tin là mình có thể thay đổi nổi nữa.", score: 3 },
    ],
  },
];

export interface DetailedResult {
  level: "balance" | "mild" | "severe";
  title: string;
  badge: string;
  color: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  archetype: {
    name: string;
    tagline: string;
    description: string;
    icon: string;
  };
  hiddenTaxes: string[];
  scientificAnalysis: string;
  kaizenAction: {
    title: string;
    description: string;
    wabiSabiQuote: string;
  };
  stageScores: {
    stage1: number;
    stage2: number;
    stage3: number;
    stage4: number;
  };
}

export function calculateDetailedResult(answers: number[]): DetailedResult {
  const total = answers.reduce((acc, curr) => acc + (curr >= 0 ? curr : 0), 0);
  const maxScore = 60;
  const percentage = Math.round((total / maxScore) * 100);

  // Tính điểm 4 chặng (mỗi chặng 5 câu, max 15 điểm)
  const s1 = answers.slice(0, 5).reduce((a, b) => a + (b >= 0 ? b : 0), 0);
  const s2 = answers.slice(5, 10).reduce((a, b) => a + (b >= 0 ? b : 0), 0);
  const s3 = answers.slice(10, 15).reduce((a, b) => a + (b >= 0 ? b : 0), 0);
  const s4 = answers.slice(15, 20).reduce((a, b) => a + (b >= 0 ? b : 0), 0);

  // Tìm Hệ Nghiện nổi trội nhất
  let archetype = {
    name: "Cú Đêm Báo Thù",
    tagline: "Revenge Bedtime Procrastinator",
    description: "Bạn dùng ban đêm để tìm lại cảm giác tự do mà ban ngày công việc đã lấy mất. Bạn không nghiện cái màn hình, bạn chỉ đang khao khát một khoảng lặng cho riêng mình.",
    icon: "🌙",
  };

  const maxStageScore = Math.max(s1, s2, s3, s4);
  if (maxStageScore === s2) {
    archetype = {
      name: "Kẻ Đa Nhiệm Phân Mảnh",
      tagline: "The Tab Hopper & Attention Fragmenter",
      description: "Tâm trí bạn không thể ngồi yên với một việc duy nhất. Bạn bật phim nhưng vẫn lướt mạng, làm việc nhưng mở 20 tab. Bạn tưởng mình năng suất nhưng não bạn đang bị băm nhỏ thành từng mảnh vụn.",
      icon: "⚡",
    };
  } else if (maxStageScore === s3) {
    archetype = {
      name: "Chiến Binh Gây Tê Cảm Xúc",
      tagline: "The Emotional Numbing Snacker",
      description: "Bạn dùng dopamine rẻ tiền (đồ ngọt, Shopee, porn, game) như một chiếc khiên để trốn chạy nỗi cô đơn, stress hoặc cảm giác trống rỗng bên trong. Đó là cơ chế đối phó, không phải do bạn suy đồi.",
      icon: "🛡️",
    };
  } else if (maxStageScore === s4) {
    archetype = {
      name: "Bóng Ma Thông Báo & Thuế Ngầm",
      tagline: "The Phantom FOMO & Life Tax Payer",
      description: "Cuộc sống của bạn vẫn đang chạy, nhưng bạn đang âm thầm trả một khoản 'thuế vô hình' cực đắt: sự cáu gắt với người thân, sự chai sạn cảm xúc và việc dậm chân tại chỗ nhiều năm.",
      icon: "⚖️",
    };
  }

  if (total <= 16) {
    return {
      level: "balance",
      title: "Cân Bằng Sinh Học & Làm Chủ Sự Chú Ý",
      badge: "Mức độ: Vùng An Toàn & Tỉnh Thức (Xanh)",
      color: "emerald",
      totalScore: total,
      maxScore,
      percentage,
      archetype,
      hiddenTaxes: [
        "Bạn gần như không phải trả khoản thuế vô hình nào đáng kể.",
        "Mối quan hệ gia đình và sự bình yên nội tâm được bảo toàn tốt.",
        "Khả năng cảm nhận niềm vui đời thực vẫn còn rất tươi mới.",
      ],
      scientificAnalysis: "Chiếc bập bênh khoái cảm - nỗi đau của bạn đang ở trạng thái cân bằng nội môi tuyệt vời (Homeostasis). Bạn không bị phụ thuộc vào các kích thích siêu ngưỡng để cảm thấy ổn.",
      kaizenAction: {
        title: "Bảo vệ 60 phút buổi sáng không màn hình",
        description: "Duy trì phong độ hiện tại bằng việc tiếp tục giữ 60 phút đầu ngày hoàn toàn thuộc về bạn và những người thân yêu.",
        wabiSabiQuote: "Sự bình yên không phải là không có cám dỗ, mà là khi cám dỗ đi qua, tâm bạn vẫn phẳng lặng như mặt nước.",
      },
      stageScores: { stage1: s1, stage2: s2, stage3: s3, stage4: s4 },
    };
  } else if (total <= 38) {
    return {
      level: "mild",
      title: "Chớm Quá Tải & Đang Trả Khoản Thuế Vô Hình",
      badge: "Mức độ: Cảnh Báo Vàng (Chớm Lệch Bập Bênh)",
      color: "amber",
      totalScore: total,
      maxScore,
      percentage,
      archetype,
      hiddenTaxes: [
        "Sự cáu gắt vô cớ với người thân lúc cạn năng lượng vào buổi tối.",
        "Khó khăn trong việc đọc sách hoặc tập trung sâu quá 20 phút.",
        "Cảm giác cuối tuần trôi qua vô nghĩa, sáng thứ Hai thức dậy trong mệt mỏi.",
      ],
      scientificAnalysis: "Theo Dr. Anna Lembke (Stanford), bầy 'tiểu yêu' bên nỗi đau đã bắt đầu kéo đến để đè bập bênh lại. Đây là lý do bạn cảm thấy ngày hôm sau hơi lờ đờ, nhạt nhẽo và hay bồn chồn tìm điện thoại.",
      kaizenAction: {
        title: "Quy tắc 2 mét sạc pin & Ngưng ăn no 100% dopamine",
        description: "Tối nay cắm sạc điện thoại ở bàn làm việc cách giường đúng 2 mét. Muốn lướt phải ngồi dậy. Đồng thời áp dụng Hara Hachi Bu: dừng lướt khi vừa chớm thấy đủ, chừa 20% khoảng lặng cho não thở.",
        wabiSabiQuote: "Đừng dùng búa tạ để đập vỡ thói quen; hãy dùng giọt nước Kaizen 1% để xói mòn nó êm ả mỗi ngày.",
      },
      stageScores: { stage1: s1, stage2: s2, stage3: s3, stage4: s4 },
    };
  } else {
    return {
      level: "severe",
      title: "Báo Động Kiệt Quệ & Bập Bênh Lệch Nặng Nề",
      badge: "Mức độ: Báo Động Đỏ (Kiệt Quệ Dopamine Thứ Phát)",
      color: "rose",
      totalScore: total,
      maxScore,
      percentage,
      archetype,
      hiddenTaxes: [
        "Khoản thuế 1: Chai sạn cảm xúc — không còn rung động trước những niềm vui bình dị đời thực.",
        "Khoản thuế 2: Sự bùng nổ giận dữ và rạn nứt âm thầm với gia đình, bạn đời, con cái.",
        "Khoản thuế 3: Trì hoãn các ước mơ lớn từ năm này qua năm khác vì luôn cạn kiệt ý chí.",
        "Khoản thuế 4: Mắc kẹt trong 'bất lực tập nhiễm' — tự trách mình yếu đuối và buông xuôi.",
      ],
      scientificAnalysis: "Hệ thần kinh của bạn đang ở trạng thái thiếu hụt dopamine thứ phát (Dopamine Deficit State). Bạn KHÔNG HỀ LƯỜI hay yếu đuối! Cơn thèm muốn của bạn chỉ là phản ứng van xin một giọt dopamine để xoa dịu nỗi đau sinh học mà thôi.",
      kaizenAction: {
        title: "Giao thức Wabi Sabi: Tha thứ hoàn toàn & Hạ liều lượng vi mô",
        description: "Tuyệt đối không 'cắt đột ngột thô bạo' (Cold-turkey). Hãy tha thứ cho những lần trượt chân vừa qua. Hôm nay chỉ cần làm một việc: Giảm 15 phút lướt đêm và tập đứng nhìn xung quanh 60 giây khi vào thang máy.",
        wabiSabiQuote: "Vết rạn nứt là nơi ánh sáng đi vào. Người Nhật dùng vàng ròng để hàn lại gốm vỡ, và bạn cũng có thể vá lại sự chú ý của mình từng chút một.",
      },
      stageScores: { stage1: s1, stage2: s2, stage3: s3, stage4: s4 },
    };
  }
}
