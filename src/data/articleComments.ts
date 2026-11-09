export interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  isLongStory?: boolean;
}

// Bộ bình luận seeding độc bản theo từng bài viết (bám sát 100% nội dung, thuật ngữ và bài học thực hành)
export const articleCommentsMap: Record<string, Comment[]> = {

  "triet-ly-wabi-sabi-thoat-khoi-bay-hoan-hao-de-song-tron-ven": [
    {
      "id": "ws-1",
      "name": "Trần Khánh Linh (Họa sĩ minh họa & Giảng viên mỹ thuật • 29 tuổi)",
      "content": "Đọc bài viết này mà nước mắt mình cứ rơi vì quá đồng cảm. 4 năm trước mình từng rơi vào trầm cảm nặng nề cũng chỉ vì căn bệnh 'cầu toàn độc hại'. Bất kỳ bức tranh nào vẽ ra mà có một nét lệch hay một vệt màu lem nhỏ là mình xé tan tành, rồi tự chửi bới bản thân là kẻ bất tài. Cái bẫy tư duy phân cực All-or-Nothing khiến mình sợ hãi khiếm khuyết đến mức không dám đặt bút vẽ thêm bức nào trong suốt 6 tháng trời. Cho đến khi mình được tiếp xúc với nghệ thuật Kintsugi và triết lý Wabi Sabi của Nhật Bản, mình mới nhận ra rằng: Chính những vết nứt, những đường nét xước xát của thời gian mới làm nên linh hồn và chiều sâu của tác phẩm! Nhờ thực hành lòng tự từ bi (Self-compassion) và quy tắc 'làm dở cũng được' 1% mỗi ngày của Trại Cai Nghiện, mình đã tìm lại được niềm vui cầm cọ. Cảm ơn Mây và Trại Cai Nghiện rất nhiều vì bài viết khai sáng và xoa dịu tâm hồn này!",
      "date": "Vừa xong",
      "likes": 84,
      "isLongStory": true
    },
    {
      "id": "ws-2",
      "name": "Lê Quang Minh (Software Architect)",
      "content": "Thấm thía nhất 3 chân lý của Wabi Sabi: Không có gì hoàn hảo, không có gì vĩnh cửu, và không có gì trọn vẹn. Trong lập trình tụi mình hay có câu 'Done is better than perfect'. Càng gồng mình đòi hỏi sự hoàn mỹ 100% thì càng trì hoãn và không bao giờ release được sản phẩm. Một góc nhìn triết học tuyệt vời được ứng dụng rất thực chiến!",
      "date": "1 ngày trước",
      "likes": 47
    },
    {
      "id": "ws-3",
      "name": "Nguyễn Thu Hà (Học viên Cao học Tâm lý)",
      "content": "Ẩn dụ về chiếc bát vỡ hàn bằng vàng Kintsugi quá đẹp! Mỗi lần lỡ trượt chân lướt điện thoại hay ăn vặt, thay vì tự sỉ vả rồi buông xuôi, mình sẽ xem đó là một vết nứt cần được hàn gắn bằng sự tha thứ và lòng tự từ bi. Nhẹ nhõm vô cùng sau khi đọc xong.",
      "date": "2 ngày trước",
      "likes": 39
    },
    {
      "id": "ws-4",
      "name": "Đặng Minh Quân (24 tuổi)",
      "content": "Quy tắc 'làm dở cũng được' chính là chìa khóa cứu cánh cho một người chúa trì hoãn như mình. Tối nay mình đã viết xong bản dàn ý dở tệ trong 5 phút thay vì ngồi nghĩ ngợi cả tuần. Cảm ơn Trại Cai Nghiện!",
      "date": "2 ngày trước",
      "likes": 28
    }
  ],
  "ban-khong-he-luoi-ban-dang-tieu-xai-qua-som-cuoc-doi-minh": [
    {
      "id": "bkhl-1",
      "name": "Phan Hoàng Long (Designer & Freelancer • 27 tuổi)",
      "content": "Đọc từng câu từng chữ mà mình thấy như tác giả đang gắn camera trong phòng làm việc của mình vậy! 3 năm nay mình luôn sống trong cảm giác dằn vặt rằng mình là một kẻ lười biếng, thất bại. Cứ ngồi vào máy tính tầm 20 phút là tay tự quẹt TikTok, coi hết clip này đến clip khác rồi giật mình thấy hết cả buổi chiều. Mình đã từng mua đủ thứ app khóa máy, lên lịch trình dày đặc, nhưng chỉ được 2 ngày là gãy gập vì quá ngột ngạt. Đọc bài này mình mới vỡ òa nhận ra: Mình không hề lười, mà là mình đã nạp quá nhiều siêu kích thích rẻ tiền mỗi ngày khiến não bộ kiệt quệ và mất khả năng kiên nhẫn. Cảm ơn Trại Cai Nghiện đã cứu rỗi tâm trí mình, từ hôm nay mình sẽ kiên trì áp dụng quy tắc trì hoãn 10 phút và cất điện thoại xa 2 mét!",
      "date": "Vừa xong",
      "likes": 78,
      "isLongStory": true
    },
    {
      "id": "bkhl-2",
      "name": "Nguyễn Hải Yến (Content Creator)",
      "content": "Thấm thía nhất đoạn: 'Bạn đã tiêu xài quá sớm những trải nghiệm đáng ra phải đến sau'. Hồi xưa muốn xem một bộ phim phải đợi cả tuần, giờ mở điện thoại cái gì cũng có ngay trong 3 giây. Sự tiện nghi thừa mứa đã tước đoạt mất khả năng chờ đợi của thế hệ mình. Một bài viết thức tỉnh tuyệt vời!",
      "date": "1 ngày trước",
      "likes": 52
    },
    {
      "id": "bkhl-3",
      "name": "Đặng Quang Huy (23 tuổi)",
      "content": "Cái bẫy siêu kích thích (Supernormal Stimuli) và cơ chế giảm thụ thể Dopamine D2 giải thích chính xác 100% tại sao giới trẻ tụi mình hay bị nhũn não và mất tập trung. Giải thích bằng khoa học thần kinh thế này giúp mình thôi tự sỉ vả bản thân để bắt đầu thực hành Kaizen 1% mỗi ngày.",
      "date": "2 ngày trước",
      "likes": 36
    },
    {
      "id": "bkhl-4",
      "name": "Thạc sĩ Tâm lý Lê Minh Trí",
      "content": "Góc nhìn rất nhân văn và chuẩn xác theo y văn của TS. Anna Lembke (Stanford). Trừng phạt và dằn vặt chỉ làm hạch hạnh nhân co rúm lại. Học cách tự từ bi (Self-compassion) và dùng thiết kế môi trường ít ma sát mới là chìa khóa bền vững để thoát khỏi vòng lặp trì hoãn.",
      "date": "3 ngày trước",
      "likes": 41
    },
    {
      "id": "bkhl-5",
      "name": "Bùi Thu Thảo (Dược sĩ)",
      "content": "Vừa đọc xong là mình đứng dậy úp điện thoại, chuyển màn hình về thang xám và cất sang góc phòng liền. Cảm giác nhẹ nhõm đến lạ kỳ. Cảm ơn Mây và Trại Cai Nghiện rất nhiều!",
      "date": "Hôm qua",
      "likes": 29
    }
  ],
  "dung-flex-doc-sach-vi-sao-doc-nhieu-doi-van-tri-tre": [
    {
      "id": "df-1",
      "name": "Trần Bảo Nam (Product Manager • 29 tuổi)",
      "content": "Đọc bài này mình giật mình thon thót! Năm ngoái đặt mục tiêu đọc 40 cuốn sách, mua về một kệ đầy úp, chụp ảnh story check-in cà phê cực kỳ nghệ nghệ. Ai nhìn vào cũng tưởng mình chăm chỉ uyên bác lắm. Nhưng nhìn lại tài khoản ngân hàng, sức khỏe tinh thần và những mối quan hệ xung quanh thì không có gì suy chuyển cả. Đúng như bài viết chỉ ra: cảm giác mua sách và lật vài trang chỉ là một dạng dopamine rẻ tiền ngụy trang dưới tấm áo tri thức. Từ hôm nay mình sẽ gấp kệ lại, chỉ tập trung đọc 1 cuốn và thực hành theo kỹ thuật Feynman.",
      "date": "2 ngày trước",
      "likes": 64,
      "isLongStory": true
    },
    {
      "id": "df-2",
      "name": "Huyền Trang (Giáo viên)",
      "content": "Thấm nhất câu: 'Đừng bắt đầu bằng cuốn sách, hãy bắt đầu bằng câu hỏi của cuộc đời bạn'. Trước giờ toàn đọc theo danh sách người thành công nên đọc gì là mình mua nấy, vừa đọc vừa vật lộn vì không hợp nhu cầu.",
      "date": "Hôm qua",
      "likes": 38
    },
    {
      "id": "df-3",
      "name": "Quốc Đạt (24 tuổi)",
      "content": "Ảo tưởng của người thu gom (Collector's Fallacy) mô tả chính xác 100% tình trạng của mình. Mua sách về để đấy coi như não đã tiếp thu rồi, rồi tối đến vẫn thức khuya lướt short video. Cảm ơn Trại đã gáo nước lạnh này!",
      "date": "3 ngày trước",
      "likes": 29
    },
    {
      "id": "df-4",
      "name": "Đặng Thị Mai (Biên dịch viên)",
      "content": "Đoạn ví von về Young Sheldon học vẹt 'Đắc Nhân Tâm' vừa hài hước vừa sâu sắc. Tri thức chỉ sống khi nó bước ra ngoài đời thực và được kiểm chứng bằng những cuộc đối thoại chân thành.",
      "date": "4 ngày trước",
      "likes": 21
    },
    {
      "id": "df-5",
      "name": "Minh Quân (Freelancer)",
      "content": "Đọc 1 cuốn sách trong năm mà sống tử tế hơn, chuyển hóa được thói quen xấu thì vẫn giá trị hơn đọc 50 cuốn để đi flex. Bài viết chạm vào sự thật trần trụi mà ít ai dám nói.",
      "date": "Vừa xong",
      "likes": 45
    }
  ],
  "bang-dieu-khien-nao-bo-4-hoa-chat-than-kinh-ky-luat-dinh-cao": [
    {
      "id": "bdk-1",
      "name": "Nguyễn Hải Long (Kỹ sư Phần mềm)",
      "content": "Trước giờ cứ nghĩ mình kém cỏi vì cứ ngồi vào máy 15 phút là đầu óc như bị đám mây sương mù che kín. Hóa ra do cách mình dùng cà phê và cộng dồn kích thích sai bét. Sáng nay thử bài tập hội tụ thị giác nhìn 1 điểm 60 giây và dẹp hết nhạc remix, làm việc trong im lặng, năng suất tăng vọt không ngờ!",
      "date": "1 ngày trước",
      "likes": 52,
      "isLongStory": true
    },
    {
      "id": "bdk-2",
      "name": "Thùy Chi (Designer)",
      "content": "Phân biệt Dopamine và Serotonin giải thích được vì sao hồi trước dù chạy deadline xong có thưởng tiền mình vẫn thấy trống rỗng kỳ lạ. Chúng ta quá no đủ Dopamine hướng ngoại nhưng đói khát Serotonin an yên bên trong.",
      "date": "2 ngày trước",
      "likes": 41
    },
    {
      "id": "bdk-3",
      "name": "Lê Hoàng Phúc",
      "content": "Mẹo rửa mặt bằng nước lạnh kích hoạt Epinephrine buổi sáng cứu mạng mình luôn. Đỡ hẳn cảm giác uể oải thèm lướt màn hình khi vừa mở mắt.",
      "date": "3 ngày trước",
      "likes": 27
    },
    {
      "id": "bdk-4",
      "name": "Bác sĩ Duy Hưng",
      "content": "Bài phân tích giải phẫu thần kinh rất chuẩn xác theo trường phái của Stanford. Giải thích dễ hiểu, tiếp cận khoa học không bị màu mè self-help.",
      "date": "5 ngày trước",
      "likes": 33
    },
    {
      "id": "bdk-5",
      "name": "Phạm Ngọc Ánh (26 tuổi)",
      "content": "Bắt đầu áp dụng việc gắn Dopamine vào chính sự nỗ lực chứ không chỉ chờ kết quả. Khi cảm thấy khó khăn tự nhủ: não mình đang tiến hóa. Cảm giác nhẹ nhõm hẳn!",
      "date": "Vừa xong",
      "likes": 19
    }
  ],
  "giao-thuc-huberman-biohacking-nao-bo-tap-trung-dinh-cao": [
    {
      "id": "hub-1",
      "name": "Vũ Tuấn Kiệt (Chuyên viên Tài chính • 29 tuổi)",
      "content": "Theo dõi podcast của GS Huberman lâu rồi nhưng đọc bài tóm tắt có hệ thống của Trại mới thấy dễ thực hành đến vậy. Trước đây sáng nào mình cũng vật vã với ly cà phê đen đặc lúc 7h sáng, nhưng đến 10h là tim đập loạn xạ mà đầu óc vẫn mơ màng sương mù não. Áp dụng giao thức Huberman 4 ngày nay: vừa thức dậy là bước thẳng ra ban công đón nắng 15 phút, trì hoãn ly cà phê sau 90 phút thức dậy, và làm việc theo khối 90 phút Ultradian. Thần kỳ là đến chiều không hề bị crash năng lượng, làm việc sắc bén hơn hẳn!",
      "date": "Hôm qua",
      "likes": 56,
      "isLongStory": true
    },
    {
      "id": "hub-2",
      "name": "Trâm Anh (Nghiên cứu sinh)",
      "content": "Thở dài sinh lý (Physiological Sigh) với 2 lần hít ngắn và 1 lần thở dài chậm cực kỳ hiệu quả mỗi khi bị stress deadline dí sát nút. Tim đập chậm lại ngay sau đúng 3 nhịp thở.",
      "date": "2 ngày trước",
      "likes": 36
    },
    {
      "id": "hub-3",
      "name": "Đình Trọng (Content Creator)",
      "content": "Khối Ultradian 90 phút thay đổi hoàn toàn cách mình sắp xếp ngày làm việc. Trước cứ ráng ngồi lì 4-5 tiếng, hóa ra từ phút 75 trở đi não đã bão hòa và bắt đầu quẹt web vô thức.",
      "date": "3 ngày trước",
      "likes": 31
    },
    {
      "id": "hub-4",
      "name": "Hoàng Ngân",
      "content": "Buổi trưa áp dụng thử 15 phút NSDR (Nghỉ sâu không ngủ) thay vì nằm bấm điện thoại, dậy thấy đầu óc tỉnh táo như vừa ngủ đủ 8 tiếng ban đêm vậy.",
      "date": "4 ngày trước",
      "likes": 25
    }
  ],
  "dopamine-detox-7-ngay-thao-go-kich-thich-re-tien": [
    {
      "id": "dd-1",
      "name": "Phan Thế Anh (27 tuổi • Freelancer)",
      "content": "Mình vừa hoàn thành ngày thứ 4 của lộ trình 7 ngày. Ngày đầu tiên cảm giác kinh khủng lắm mọi người ạ: tay cứ giật giật tìm điện thoại, bồn chồn đứng ngồi không yên. Nhưng sang ngày thứ 3, khi cơn thèm dopamine hạ nhiệt, mình bắt đầu ngồi đọc sách lại được hơn 40 phút mà không ngáp ngắn ngáp dài. Cảm giác ăn một bữa cơm đạm bạc mà cảm nhận được vị ngọt của hạt cơm nó bình yên đến rơi nước mắt.",
      "date": "3 ngày trước",
      "likes": 72,
      "isLongStory": true
    },
    {
      "id": "dd-2",
      "name": "Nguyễn Bích Ngọc",
      "content": "Thích cách Trại hướng dẫn Dopamine Detox: không bắt người ta nhịn đói cực đoan kiểu hành xác, mà giảm dần và thay thế bằng những niềm vui lành mạnh tự nhiên.",
      "date": "1 ngày trước",
      "likes": 39
    },
    {
      "id": "dd-3",
      "name": "Dương Minh Châu",
      "content": "Đã xóa app TikTok sang ngày thứ 5. Không còn những tiếng nhạc giật dây thần kinh văng vẳng trong đầu trước khi ngủ nữa, ngủ một mạch đến sáng.",
      "date": "2 ngày trước",
      "likes": 44
    },
    {
      "id": "dd-4",
      "name": "Lâm Quang",
      "content": "Lộ trình 7 ngày chia rất rõ ràng, ai đang bị nhũn não vì short video nhất định nên thử một lần.",
      "date": "Hôm qua",
      "likes": 18
    }
  ],
  "chung-ta-dang-song-vi-dieu-gi-giai-ma-khung-hoang-hien-sinh": [
    {
      "id": "khhs-1",
      "name": "Đặng Thu Hà (31 tuổi • Quản lý nhân sự)",
      "content": "Đọc bài viết này giữa lúc mình đang trải qua cuộc khủng hoảng tuổi 30 nặng nề nhất. Công việc ổn định, lương khá, có nhà có xe nhưng mỗi sáng thức dậy chỉ thấy một khoảng trống rỗng vô tận. Cứ nghĩ mua thêm một chiếc túi hiệu hay đi du lịch resort sẽ lấp đầy được, nhưng càng tiêu xài lại càng thấy vô nghĩa. Bài viết như ngọn đèn soi rọi vào góc tối nhất của tâm hồn: chúng ta không thiếu tiện nghi, chúng ta đang thiếu ý nghĩa sống. Cảm ơn Trại đã viết những lời chân thật đến xé lòng.",
      "date": "2 ngày trước",
      "likes": 85,
      "isLongStory": true
    },
    {
      "id": "khhs-2",
      "name": "Trần Minh Trí",
      "content": "Khủng hoảng hiện sinh không phải là bệnh tật, mà là dấu hiệu cho thấy linh hồn đang từ chối một lối sống máy móc vô hồn. Đọc mà sởn gai ốc vì quá đúng tâm trạng.",
      "date": "Hôm qua",
      "likes": 42
    },
    {
      "id": "khhs-3",
      "name": "Ngọc Lan (Kiến trúc sư)",
      "content": "Một bài viết quá sâu sắc. Giữa thời đại ai cũng khoe khoang hào nhoáng trên mạng, tìm được một nơi tĩnh lặng để đối diện với câu hỏi 'Mình sống vì điều gì' quý giá vô cùng.",
      "date": "3 ngày trước",
      "likes": 31
    }
  ],
  "doc-sach-di-tim-le-song-chiec-phao-cuu-sinh-nghich-canh": [
    {
      "id": "dtls-1",
      "name": "Võ Văn Hùng (Bác sĩ Nội trú • 28 tuổi)",
      "content": "Cuốn sách 'Đi Tìm Lẽ Sống' của Viktor Frankl từng cứu vớt mình trong những tháng ngày trực cấp cứu căng thẳng nhất mùa dịch. Đọc lại bài phân tích của Trại Cai Nghiện hôm nay lại càng thấm thía hơn: 'Người có một lý do để sống có thể chịu đựng được hầu hết mọi nghịch cảnh'. Giữa những cám dỗ phù phiếm và những cơn nghiện số làm tiêu hao sinh mệnh, ý nghĩa cuộc đời chính là chiếc phao neo giữ tâm trí không bị trôi dạt vào hư vô.",
      "date": "3 ngày trước",
      "likes": 67,
      "isLongStory": true
    },
    {
      "id": "dtls-2",
      "name": "Phan Hoài Thương",
      "content": "Câu chuyện Viktor Frankl giấu mẩu giấy bản thảo trong lớp áo rách ở trại tập trung Auschwitz luôn làm mình rơi nước mắt. Bài viết phân tích rất trang nhã và đắt giá.",
      "date": "1 ngày trước",
      "likes": 38
    },
    {
      "id": "dtls-3",
      "name": "Lê Gia Bảo",
      "content": "Cảm ơn Trại đã gợi ý một kiệt tác. Tối nay mình sẽ ra nhà sách tìm mua bản giấy để đọc chậm lại.",
      "date": "Hôm qua",
      "likes": 24
    }
  ],
  "doc-cau-chuyen-dong-song-buong-bo-tim-kiem-de-that-su-thay": [
    {
      "id": "ccds-1",
      "name": "Nguyễn An Nhiên (Yoga & Meditation Coach)",
      "content": "Siddhartha của Hermann Hesse là cuốn sách gối đầu giường của mình suốt 5 năm qua. Thích nhất cách Trại liên hệ hình ảnh dòng sông với bộ não xao nhãng của người hiện đại: chúng ta mải miết chạy đi tìm kiếm bình an ở các khóa học, các hội thảo, các video podcast... nhưng chính sự nôn nóng tìm kiếm đó lại là một dạng nghiện ngập tinh vi mới. Khi buông bỏ được ham muốn kiểm soát và biết lắng nghe, bình an đã ở sẵn đó rồi.",
      "date": "2 ngày trước",
      "likes": 58,
      "isLongStory": true
    },
    {
      "id": "ccds-2",
      "name": "Hoàng Bách",
      "content": "Hình tượng người lái đò Vasudeva dạy cho chúng ta bài học vĩ đại nhất: không phán xét, không giảng giải đạo lý đao to búa lớn, chỉ tĩnh lặng lắng nghe. Bài viết rất hay và thoát tục.",
      "date": "Hôm qua",
      "likes": 33
    },
    {
      "id": "ccds-3",
      "name": "Thảo Vy (25 tuổi)",
      "content": "Đọc xong bài viết này tự nhiên thấy lòng nhẹ bẫng, dẹp bỏ được cảm giác sốt ruột phải thành công ngay lập tức.",
      "date": "3 ngày trước",
      "likes": 22
    }
  ],
  "tinh-deo-than-kinh-tai-lap-trinh-bo-nao-chinh-phuc-viec-kho": [
    {
      "id": "tdtk-1",
      "name": "Lê Quốc Trung (Lập trình viên AI)",
      "content": "Khoa học về Neuroplasticity (Tính dẻo thần kinh) đã giải phóng hoàn toàn sự tự ti trong mình. Trước đây cứ tin vào cái câu 'giang sơn dễ đổi bản tính khó dời', nghĩ mình sinh ra vốn dĩ là đứa kém tập trung và trì hoãn. Khi hiểu rằng mỗi lần mình cưỡng lại một cơn thèm lướt web là một rãnh nơ-ron mới đang được hình thành, việc rèn luyện kỷ luật bỗng trở nên hào hứng như nâng tạ trong phòng gym!",
      "date": "2 ngày trước",
      "likes": 61,
      "isLongStory": true
    },
    {
      "id": "tdtk-2",
      "name": "Minh Thư (Sinh viên Y)",
      "content": "Khái niệm 'Sự khó chịu là tín hiệu não bộ đang tái cấu trúc' chính là liều thuốc trợ lực tuyệt vời nhất cho những ai đang ôn thi hoặc làm việc khó.",
      "date": "1 ngày trước",
      "likes": 42
    },
    {
      "id": "tdtk-3",
      "name": "Trần Trọng Hiếu",
      "content": "Bài viết giải thích cơ chế synap thần kinh cực kỳ trực quan và dễ hiểu, không bị nặng nề thuật ngữ y khoa.",
      "date": "4 ngày trước",
      "likes": 19
    }
  ],
  "tang-hieu-suat-khi-nao-bi-thoi-deep-work-chong-tri-tre": [
    {
      "id": "thds-1",
      "name": "Ngô Văn Tân (Tech Lead)",
      "content": "Thuật ngữ 'Não bị thối' (Brain Rot) nghe giật mình nhưng tả chính xác 100% cảm giác sau 2 tiếng quẹt video ngắn. Đầu óc rỗng tuếch, mắt lờ đờ, không thể suy nghĩ thấu đáo được một đoạn logic code đơn giản. Áp dụng quy trình 4 bước chống trì trệ của bài viết: tắt hết notification, dùng đồng hồ pomodoro cơ và viết 3 việc tối quan trọng ra giấy nháp. Chiều nay mình đã giải quyết xong task tồn đọng 2 tuần qua!",
      "date": "Hôm qua",
      "likes": 54,
      "isLongStory": true
    },
    {
      "id": "thds-2",
      "name": "Khánh Linh (Copywriter)",
      "content": "Tác hại của việc nhảy tab liên tục làm tiêu hao năng lượng nhận thức khủng khiếp. Từ nay cam kết 1 phiên làm việc chỉ mở đúng 1 tab liên quan.",
      "date": "2 ngày trước",
      "likes": 37
    },
    {
      "id": "thds-3",
      "name": "Văn Hậu",
      "content": "Deep Work trong thời đại xao nhãng số thực sự là một siêu năng lực. Ai giữ được sự tập trung người đó thắng.",
      "date": "3 ngày trước",
      "likes": 28
    }
  ],
  "ban-khong-he-yeu-duoi": [
    {
      "id": "bkhyd-1",
      "name": "Nguyễn Mai Phương (26 tuổi)",
      "content": "Mình đã từng khóc rất nhiều đêm vì nghĩ mình là kẻ thất bại, không có chút ý chí nào khi cứ tự hứa không xem điện thoại rồi lại quẹt đến 2h sáng. Đọc bài viết này, tảng đá mặc cảm tội lỗi đè nặng trong ngực mình bao lâu nay như được gỡ bỏ hoàn toàn. Hóa ra cả một đội ngũ kỹ sư hàng đầu thung lũng Silicon đang ngày đêm thiết kế thuật toán để hack não mình. Mình không hề yếu đuối, chỉ là mình cần biết cách tự vệ thông minh hơn.",
      "date": "4 ngày trước",
      "likes": 79,
      "isLongStory": true
    },
    {
      "id": "bkhyd-2",
      "name": "Đỗ Hải Đăng",
      "content": "Triết lý Kintsugi gắn những vết nứt bằng vàng đưa vào bài viết quá đẹp và nhân văn. Chữa lành phải bắt đầu từ việc thấu hiểu chứ không phải tự trừng phạt.",
      "date": "2 ngày trước",
      "likes": 46
    },
    {
      "id": "bkhyd-3",
      "name": "Phương Thảo",
      "content": "Share bài này về tường ngay lập tức để bạn bè cùng đọc. Quá nhiều người trẻ đang âm thầm tự trách móc bản thân mà không biết căn nguyên sinh học.",
      "date": "1 ngày trước",
      "likes": 31
    }
  ],
  "quy-tac-2-met-thay-doi-khong-can-y-chi": [
    {
      "id": "qt2m-1",
      "name": "Trần Hoàng Khang (Nhân viên ngân hàng)",
      "content": "Quy tắc 2 mét sạc pin ngoài tầm tay nghe thì đơn giản đến mức buồn cười, nhưng hiệu quả thì không tưởng! Trước đây để điện thoại đầu giường, chuông báo thức reo là tay với tắt rồi ngủ cố hoặc lướt fb 30 phút. Từ ngày để ổ sạc ở góc bàn làm việc cách giường 2m, chuông reo buộc phải bật dậy bước chân xuống sàn, thế là tỉnh ngủ luôn. Đúng là thiết kế môi trường luôn đánh bại ý chí!",
      "date": "2 ngày trước",
      "likes": 68,
      "isLongStory": true
    },
    {
      "id": "qt2m-2",
      "name": "Vũ Mỹ Hạnh",
      "content": "Tăng ma sát cho thói quen xấu: cất điều khiển TV vào ngăn kéo, xóa app mạng xã hội khỏi màn hình chính. Những mẹo nhỏ 1% này vận hành cực kỳ trơn tru.",
      "date": "1 ngày trước",
      "likes": 35
    },
    {
      "id": "qt2m-3",
      "name": "Bảo Ngọc",
      "content": "Đã ngủ sớm được 3 đêm liên tiếp nhờ áp dụng quy tắc này. Biết ơn tác giả nhiều lắm!",
      "date": "Hôm qua",
      "likes": 23
    }
  ],
  "bo-do-nghe-sinh-ton-so-5-cong-cu-cai-nghien": [
    {
      "id": "bdn-1",
      "name": "Lê Minh Tuấn (IT Support)",
      "content": "List 5 công cụ quá thực chiến! Mình vừa cài extension chuyển màn hình sang đen trắng (Grayscale) trên cả máy tính lẫn điện thoại. Bất ngờ là khi không còn màu đỏ rực của thông báo hay màu mè sặc sỡ của video, chiếc điện thoại bỗng trở nên nhạt nhẽo vô cùng, cầm lên 1 phút là muốn đặt xuống.",
      "date": "3 ngày trước",
      "likes": 55,
      "isLongStory": true
    },
    {
      "id": "bdn-2",
      "name": "Hà My",
      "content": "Phần mềm One Sec buộc dừng 1 nhịp thở trước khi mở app mạng xã hội đã cứu mình khỏi hàng chục lần mở máy vô thức mỗi ngày.",
      "date": "2 ngày trước",
      "likes": 34
    },
    {
      "id": "bdn-3",
      "name": "Tạ Đình Phong",
      "content": "Bài viết rất có tâm khi review toàn công cụ miễn phí, dễ dùng và không có link quảng cáo trục lợi.",
      "date": "1 ngày trước",
      "likes": 27
    }
  ],
  "review-sach-bay-hanh-phuc-russ-harris": [
    {
      "id": "bhp-1",
      "name": "Nguyễn Thị Thanh Tâm (Chuyên viên tâm lý học)",
      "content": "Cuốn 'Bẫy Hạnh Phúc' của Russ Harris dựa trên liệu pháp ACT (Chấp nhận và Cam kết) là một tuyệt tác giải độc cho phong trào 'Toxic Positivity' (Tích cực độc hại). Đúng như bài viết phân tích: càng cố xua đuổi nỗi buồn và gượng cười, ta càng dễ sa vào các hành vi gây nghiện để trốn chạy thực tại. Chấp nhận rằng cuộc sống có cả niềm vui lẫn nỗi đau mới là sự tự do đích thực.",
      "date": "3 ngày trước",
      "likes": 62,
      "isLongStory": true
    },
    {
      "id": "bhp-2",
      "name": "Hoàng Yến (27 tuổi)",
      "content": "Đoạn 'Làm bạn với sự khó chịu' đã giúp mình thôi dằn vặt mỗi khi thấy lòng trống trải. Không cần phải cố vui, chỉ cần ngồi yên thở cùng cảm xúc đó.",
      "date": "1 ngày trước",
      "likes": 40
    },
    {
      "id": "bhp-3",
      "name": "Đức Thịnh",
      "content": "Một góc nhìn rất mới mẻ so với những cuốn sách self-help thông thường luôn khuyên người ta phải tích cực 24/7.",
      "date": "2 ngày trước",
      "likes": 26
    }
  ],
  "6-buoc-can-lam-khi-con-them-ap-den-urge-surfing": [
    {
      "id": "us-1",
      "name": "Phạm Đăng Khoa (30 tuổi • Đang cai thuốc & mạng xã hội)",
      "content": "Kỹ thuật Urge Surfing (Lướt trên cơn thèm) của bác sĩ Alan Marlatt thực sự đã cứu vớt mình. Trước đây mỗi lần cơn thèm nổi lên, mình xem nó như kẻ thù và cố gồng mình đè nén, nhưng càng đè nén thì cơn sóng sau càng dữ dội hơn. Áp dụng 6 bước: nhận diện cơn co thắt trong ngực, xem nó như ngọn sóng dâng lên đỉnh rồi tự lụi tàn sau 3 phút. Lần đầu tiên mình thấy mình làm chủ được ham muốn của chính mình!",
      "date": "4 ngày trước",
      "likes": 71,
      "isLongStory": true
    },
    {
      "id": "us-2",
      "name": "Thanh Hằng",
      "content": "Thở chậm và quan sát cơn thôi thúc như một nhà khoa học tò mò chứ không phán xét. Kỹ thuật này áp dụng cho cả việc nhịn ăn vặt ban đêm cực kỳ hiệu quả.",
      "date": "2 ngày trước",
      "likes": 38
    },
    {
      "id": "us-3",
      "name": "Quang Vũ",
      "content": "Cơn thèm chỉ kéo dài từ 3 đến 5 phút nếu ta không tiếp thêm củi lửa cho nó. Bài học vàng!",
      "date": "Hôm qua",
      "likes": 29
    }
  ],
  "review-sach-bay-so-hai-vuot-qua-tri-hoan": [
    {
      "id": "bsh-1",
      "name": "Bùi Nhật Minh (Du học sinh)",
      "content": "Đọc bài review 'Bẫy Sợ Hãi' mà rớt nước mắt vì thấy chính mình trong đó. Suốt bao tháng ngày trì hoãn viết luận văn tốt nghiệp, mình luôn tự sỉ vả mình là kẻ lười biếng vô tích sự. Nhưng bài viết đã chỉ ra sự thật: gốc rễ không phải lười, mà là vì mình quá sợ sự thất bại, sợ bị chê bai nên não bộ kích hoạt cơ chế né tránh bằng cách lướt web. Nhận diện được nỗi sợ là bước đầu tiên để mình gõ lại những dòng chữ đầu tiên.",
      "date": "2 ngày trước",
      "likes": 69,
      "isLongStory": true
    },
    {
      "id": "bsh-2",
      "name": "Thu Thảo (Designer)",
      "content": "Chủ nghĩa hoàn hảo (Perfectionism) chính là người anh em sinh đôi của sự trì hoãn. Thà làm một bản nháp xấu xí còn hơn không bao giờ bắt đầu.",
      "date": "1 ngày trước",
      "likes": 45
    },
    {
      "id": "bsh-3",
      "name": "Nguyên Khang",
      "content": "Hành động bất chấp nỗi sợ hãi. Một bài viết đánh thức lòng dũng cảm rất lớn trong mình.",
      "date": "3 ngày trước",
      "likes": 23
    }
  ],
  "cai-bay-nghien-tich-luy-kien-thuc-tieu-thu-thu-dong": [
    {
      "id": "btl-1",
      "name": "Trương Gia Huy (Khởi nghiệp)",
      "content": "Bẫy tích lũy kiến thức thụ động là căn bệnh kinh niên của dân làm việc trí óc thời nay! Xem hết podcast này đến khóa học khác, bookmark hàng trăm bài viết hay về Notion nhưng thực tế việc kinh doanh thì không chịu làm. Cảm giác nạp kiến thức tạo ra một lớp sương mù che mắt khiến ta tưởng mình đang tiến bộ. Bài viết này thức tỉnh mình dữ dội, đóng hết tab và bắt tay vào làm việc ngay!",
      "date": "Hôm qua",
      "likes": 58,
      "isLongStory": true
    },
    {
      "id": "btl-2",
      "name": "Hương Giang",
      "content": "Tiêu thụ thông tin mà không tạo ra sản phẩm (Output) thì chỉ là béo phì nhận thức. Từ nay học 1 phải hành 3.",
      "date": "2 ngày trước",
      "likes": 37
    },
    {
      "id": "btl-3",
      "name": "Tuấn Anh (28 tuổi)",
      "content": "Đọc bài này xong xóa bớt 50 bài viết đã bookmark lưu trữ cả năm trời mà không đọc tới. Đầu óc nhẹ hẳn!",
      "date": "3 ngày trước",
      "likes": 29
    }
  ],
  "review-sach-flow-dong-chay-mihaly-csikszentmihalyi": [
    {
      "id": "flow-1",
      "name": "Đinh Xuân Trường (Họa sĩ minh họa)",
      "content": "Kiệt tác 'Flow' của Mihaly Csikszentmihalyi đã được Trại Cai Nghiện đúc kết cực kỳ tinh tế. Trạng thái dòng chảy — khi cái tôi cá nhân tan biến và ta hoàn toàn hòa làm một với nét vẽ hay trang viết — là thứ hạnh phúc đích thực sâu sắc mà không một thuật toán short video nào có thể mang lại được. Đọc xong chỉ muốn tắt ngay wifi để tìm lại cảm giác đắm chìm nguyên bản ấy.",
      "date": "3 ngày trước",
      "likes": 63,
      "isLongStory": true
    },
    {
      "id": "flow-2",
      "name": "Cẩm Tú",
      "content": "Cân bằng giữa độ khó của thử thách và kỹ năng bản thân. Khi thử thách quá cao ta lo âu, quá thấp ta buồn chán. Sơ đồ dòng chảy trong bài rất trực quan.",
      "date": "1 ngày trước",
      "likes": 36
    },
    {
      "id": "flow-3",
      "name": "Lê Minh",
      "content": "Hạnh phúc không phải là nằm lười lướt máy, hạnh phúc là khi toàn bộ năng lượng tâm thần được dồn vào một mục tiêu có ý nghĩa.",
      "date": "2 ngày trước",
      "likes": 31
    }
  ],
  "thanh-loc-nao-bo-de-lam-viec-sau": [
    {
      "id": "tlnb-1",
      "name": "Võ Thành Nam (33 tuổi • Kiến trúc sư)",
      "content": "Bài viết giải thích cơ chế vì sao ta chán làm việc và thèm quẹt máy quá sáng tỏ. Khi não bộ đã quen với lượng kích thích cực mạnh từ video 15 giây thì bản vẽ kiến trúc hay trang sách trắng hiển nhiên trở nên vô cùng nhạt nhẽo và khó chịu. Mình từng cố dùng ý chí thép để ép bản thân nhưng càng ép thì tối về càng 'nghiện bù' lướt máy đến 3h sáng. Cần phải có giai đoạn thanh lọc hạ ngưỡng dopamine như bài viết hướng dẫn thì não mới tìm lại được sự tò mò tự nhiên. Sau 5 ngày detox màn hình buổi tối, mình đã tìm lại được cảm hứng vẽ vời như ngày đầu mới vào nghề.",
      "date": "2 ngày trước",
      "likes": 62,
      "isLongStory": true
    },
    {
      "id": "tlnb-2",
      "name": "Kim Oanh",
      "content": "Thử dành 1 tiếng buổi tối ngồi im uống trà nhìn trời mưa mà không đụng vào màn hình. Ban đầu bứt rứt lắm nhưng sau đó một sự bình an kỳ lạ lan tỏa khắp lồng ngực.",
      "date": "Hôm qua",
      "likes": 34
    },
    {
      "id": "tlnb-3",
      "name": "Hoàng Long",
      "content": "Thanh lọc não bộ là kỹ năng sinh tồn bắt buộc của người trẻ thế kỷ 21 nếu không muốn bị biến thành con rối của thuật toán.",
      "date": "3 ngày trước",
      "likes": 27
    }
  ],
  "review-sach-bay-tien-nghi-michael-easter": [
    {
      "id": "btn-1",
      "name": "Đặng Hữu Phúc (Runner • 35 tuổi)",
      "content": "Cuốn 'Bẫy Tiện Nghi' (The Comfort Crisis) của Michael Easter là cuốn sách làm thay đổi nhân sinh quan của mình nhiều nhất. Xã hội hiện đại bán cho chúng ta sự tiện nghi thừa mứa: đồ ăn ship tận giường, máy lạnh 24/7, xe đưa đón tận cửa... và vô tình tước đoạt mất cơ hội rèn luyện khả năng chịu đựng khó chịu tự nhiên (Misogi). Bài review của Trại đã làm nổi bật được linh hồn của cuốn sách: tự nguyện dấn thân vào sự khó chịu lành mạnh để tìm lại tự do.",
      "date": "4 ngày trước",
      "likes": 77,
      "isLongStory": true
    },
    {
      "id": "btn-2",
      "name": "Ngọc Mai",
      "content": "Tập tắm nước lạnh và đi bộ tiếp đất ngoài trời theo gợi ý của bài viết. Cảm nhận sự sống thật sự quay trở lại trong từng tế bào.",
      "date": "2 ngày trước",
      "likes": 41
    },
    {
      "id": "btn-3",
      "name": "Trần Anh Tuấn",
      "content": "Sự tiện nghi quá mức đang làm thoái hóa ý chí con người. Một góc nhìn phản biện xã hội rất sâu sắc và cần thiết.",
      "date": "1 ngày trước",
      "likes": 33
    }
  ],
  "chua-lanh-nao-bo-sau-mot-nam-luot-tiktok": [
    {
      "id": "clnb-1",
      "name": "Phan Thị Mỹ Duyên (22 tuổi • Sinh viên)",
      "content": "Thú thật là mình từng nghiện TikTok đến mức trầm cảm nhẹ. Mỗi ngày mở màn hình lên xem report thấy 6-7 tiếng đồng hồ đốt vào những clip nhảm nhí. Trí nhớ giảm sút nghiêm trọng, đang nói chuyện với bạn bè mà quên mất mình định nói gì. Áp dụng phác đồ 'cấp cứu não bộ' của Trại: gỡ app, viết nhật ký tay mỗi tối và đi dạo công viên không mang tai nghe. Sau 2 tuần, đầu óc mình đã bắt đầu sáng rõ trở lại. Cảm ơn Trại đã cứu vớt tuổi trẻ của mình!",
      "date": "3 ngày trước",
      "likes": 83,
      "isLongStory": true
    },
    {
      "id": "clnb-2",
      "name": "Bảo Trâm",
      "content": "Hội chứng sương mù não sau khi lướt TikTok là có thật 100%. Ai đang bị thì hãy dừng lại ngay trước khi quá muộn.",
      "date": "2 ngày trước",
      "likes": 46
    },
    {
      "id": "clnb-3",
      "name": "Quốc Hưng",
      "content": "Phác đồ cấp cứu từng bước rất cụ thể và nhân văn, không tạo cảm giác phán xét hay chê trách người nghiện.",
      "date": "Hôm qua",
      "likes": 30
    }
  ],
  "review-sach-tu-duy-nhanh-va-cham-daniel-kahneman": [
    {
      "id": "tdnc-1",
      "name": "Nguyễn Văn Hùng (Chuyên viên Phân tích Rủi ro)",
      "content": "Đọc 'Tư Duy Nhanh và Chậm' của cụ Daniel Kahneman qua lăng kính giải mã hành vi lướt mạng của Trại Cai Nghiện thấy vỡ ra bao nhiêu điều. Hệ thống 1 (tư duy nhanh, cảm tính, bốc đồng) luôn bị các thuật toán mạng xã hội kích hoạt tối đa, trong khi Hệ thống 2 (tư duy chậm, lý tính) thì bị làm cho kiệt quệ. Muốn cai nghiện, mấu chốt là phải tạo ra ma sát 5 giây để Hệ thống 2 kịp tỉnh giấc.",
      "date": "3 ngày trước",
      "likes": 56,
      "isLongStory": true
    },
    {
      "id": "tdnc-2",
      "name": "Bích Phương",
      "content": "Ngón tay quẹt trước khi não kịp nghĩ — bài học về Hệ thống 1 giải thích vì sao ta hay bấm vào các tiêu đề clickbait trong vô thức.",
      "date": "1 ngày trước",
      "likes": 35
    },
    {
      "id": "tdnc-3",
      "name": "Minh Đức",
      "content": "Tóm tắt một tác phẩm kinh điển đoạt giải Nobel thành những bài học thực hành đời thường rất xuất sắc!",
      "date": "2 ngày trước",
      "likes": 28
    }
  ],
  "bo-nao-thoi-do-da-bay-dan-va-nghe-thuat-tu-duy-nguoc-charlie-munger": [
    {
      "id": "cm-1",
      "name": "Đỗ Quang Vinh (Nhà đầu tư cá nhân)",
      "content": "Áp dụng câu nói nổi tiếng của Charlie Munger: 'Hãy nói cho tôi biết tôi sẽ chết ở đâu, và tôi sẽ không bao giờ đến đó'. Thay vì cố gắng tìm cách thành công rực rỡ, hãy liệt kê toàn bộ những thói quen hủy hoại cuộc đời mình (thức khuya bấm máy, ăn đồ ngọt vô độ, nhảy tab liên tục) và triệt tiêu chúng. Tư duy ngược (Inversion) kết hợp với tâm lý học tiến hóa của Darwin trong bài viết này quá đẳng cấp!",
      "date": "3 ngày trước",
      "likes": 64,
      "isLongStory": true
    },
    {
      "id": "cm-2",
      "name": "Thế Hiển",
      "content": "Bộ não thời đồ đá được lập trình để tích lũy đường và thông tin bộ lạc, khi ném vào thế giới công nghệ 4.0 nếu không có tư duy ngược sẽ tự hủy diệt.",
      "date": "Hôm qua",
      "likes": 39
    },
    {
      "id": "cm-3",
      "name": "Thanh Tùng",
      "content": "Một trong những bài viết có hàm lượng tri thức thực chiến cao nhất mình từng đọc trên web.",
      "date": "2 ngày trước",
      "likes": 32
    }
  ],
  "review-sach-kaizen-1-phan-tram-moi-ngay": [
    {
      "id": "kz-1",
      "name": "Lê Thị Bích Hạnh (40 tuổi • Quản lý vận hành)",
      "content": "Mỗi lần quyết tâm thay đổi, chúng ta hay hô hào khẩu hiệu đao to búa lớn: dậy 5h sáng, chạy bộ 10km, bỏ hẳn điện thoại... để rồi chỉ 3 ngày sau là bỏ cuộc trong thất vọng. Cuốn 'Kaizen' dạy ta đánh lừa hạch hạnh nhân (Amygdala) bằng những bước đi vi mô 1%. Mình bắt đầu bằng việc chỉ để điện thoại cách xa 1 mét, đọc đúng 2 trang sách mỗi tối. Sau 3 tháng nhìn lại, cả một nếp sống mới đã hình thành nhẹ nhàng không chút gắng gượng.",
      "date": "4 ngày trước",
      "likes": 74,
      "isLongStory": true
    },
    {
      "id": "kz-2",
      "name": "Minh Châu",
      "content": "Kaizen 1% mỗi ngày: chia nhỏ thử thách đến mức não bộ không thể viện cớ từ chối. Phương pháp của người Nhật luôn có chiều sâu đáng nể.",
      "date": "1 ngày trước",
      "likes": 41
    },
    {
      "id": "kz-3",
      "name": "Hoàng Phong",
      "content": "Bớt kỳ vọng hoàn hảo, chỉ cần hôm nay tốt hơn hôm qua 1% là đủ thấy bình an trong tâm trí.",
      "date": "2 ngày trước",
      "likes": 25
    }
  ],
  "2-quy-tac-don-gian-cai-thien-su-tap-trung": [
    {
      "id": "2qt-1",
      "name": "Nguyễn Tuấn Kiệt (Sinh viên ĐH Bách Khoa • 22 tuổi)",
      "content": "Chỉ với 2 quy tắc: dọn dẹp sạch sẽ mặt bàn làm việc và quy tắc 5 phút khởi động, mình đã vượt qua được cơn lười ôn thi kinh niên kỳ này. Trước đây mỗi lần ngồi vào bàn, xung quanh là đống sách vở bừa bộn, vỏ lon nước ngọt, tai nghe... não bộ bị quá tải rác thị giác nên cứ 5 phút lại cầm điện thoại lướt. Giờ dọn sạch trơn chỉ để đúng 1 cuốn tập và chiếc bút, tự nhủ chỉ làm đúng 5 phút thôi. Không ngờ cứ bước qua được 5 phút ma sát ban đầu là não tự động trôi vào guồng quay làm việc suốt 2 tiếng không dứt!",
      "date": "Hôm qua",
      "likes": 58,
      "isLongStory": true
    },
    {
      "id": "2qt-2",
      "name": "Hồng Nhung",
      "content": "Mặt bàn bừa bộn rác thị giác khiến não bộ bị phân tán năng lượng vô thức. Vừa dọn sạch bàn làm việc xong, cảm giác ngồi vào làm nhẹ nhõm hẳn.",
      "date": "2 ngày trước",
      "likes": 33
    },
    {
      "id": "2qt-3",
      "name": "Thành Đạt",
      "content": "Đơn giản, dễ làm và hiệu quả ngay lập tức!",
      "date": "3 ngày trước",
      "likes": 21
    }
  ],
  "review-sach-ikigai-di-tim-le-song": [
    {
      "id": "ikg-1",
      "name": "Phạm Thu Hương (Giáo viên Mỹ thuật)",
      "content": "Đọc 'Ikigai' qua bài viết này mình mới thấu hiểu vì sao người già ở đảo Okinawa sống thọ và an nhiên đến vậy. Khi một người có lý do thức dậy mỗi sớm mai — dù chỉ là chăm sóc luống rau, pha một ấm trà ngon hay dạy học trò vẽ — thì những kích thích dopamine rẻ tiền của thế giới ảo tự khắc trở nên vô vị. Ikigai chính là chiếc khiên bảo vệ tâm hồn khỏi sự trống rỗng thời đại số.",
      "date": "3 ngày trước",
      "likes": 68,
      "isLongStory": true
    },
    {
      "id": "ikg-2",
      "name": "Vũ Hải Đăng",
      "content": "Tìm thấy giao điểm giữa điều mình yêu thích, điều mình giỏi, điều xã hội cần và điều nuôi sống được bản thân. Một hành trình đáng dấn thân.",
      "date": "1 ngày trước",
      "likes": 38
    },
    {
      "id": "ikg-3",
      "name": "Thùy Trang",
      "content": "Có một lý do để thức dậy, đồ rẻ tiền tự khắc vô vị. Tiêu đề bài viết quá xuất sắc!",
      "date": "2 ngày trước",
      "likes": 30
    }
  ],
  "phuong-phap-nang-luong-musashi-tri-kiet-que-tinh-than": [
    {
      "id": "ms-1",
      "name": "Cao Tiến Dũng (34 tuổi • Quản lý dự án)",
      "content": "Triết lý của kiếm thánh Miyamoto Musashi trong Dokkodo: 'Không hối tiếc những gì đã làm, giữ tâm tĩnh lặng như nước giữa vòng vây quân địch'. Bài viết vận dụng tư tưởng kiếm đạo vào quản trị năng lượng tinh thần cho người hiện đại quá tinh tế. Thay vì vừa làm việc vừa lo lắng chuyện tương lai và dằn vặt quá khứ, hãy hiện diện trọn vẹn trong nhát kiếm (công việc) hiện tại.",
      "date": "2 ngày trước",
      "likes": 59,
      "isLongStory": true
    },
    {
      "id": "ms-2",
      "name": "Minh Nhật",
      "content": "Chấm dứt kiệt quệ tinh thần bằng cách bảo tồn năng lượng chú ý. Một bài viết đậm chất Zen và kiếm đạo Nhật Bản.",
      "date": "Hôm qua",
      "likes": 35
    },
    {
      "id": "ms-3",
      "name": "Hoàng Quân",
      "content": "Học cách buông bỏ những điều không thuộc tầm kiểm soát theo tinh thần Musashi. Đọc xong thấy tâm định lại nhiều.",
      "date": "3 ngày trước",
      "likes": 26
    }
  ],
  "review-sach-deep-work-cal-newport": [
    {
      "id": "dw-1",
      "name": "Hoàng Nam Phong (Kiến trúc sư giải pháp phần mềm)",
      "content": "Cuốn 'Deep Work' của GS Cal Newport là cuốn sách làm thay đổi toàn bộ sự nghiệp của mình. Trước đây ngày nào cũng bận rộn: trả lời email tức thì, check slack liên tục, nhảy họp triền miên... nhưng cuối ngày không tạo ra được bất kỳ giá trị cốt lõi nào (Shallow Work). Áp dụng phương thức Bimodal và lập khối 3 tiếng Deep Work buổi sáng không internet, hiệu suất của mình tăng gấp 3 lần và giảm hẳn stress.",
      "date": "3 ngày trước",
      "likes": 73,
      "isLongStory": true
    },
    {
      "id": "dw-2",
      "name": "Mai Chi",
      "content": "Làm việc sâu không phải là một kỹ năng xa xỉ, nó là tấm khiên bảo vệ tâm trí người lao động trí óc trước cơn bão xao nhãng.",
      "date": "1 ngày trước",
      "likes": 42
    },
    {
      "id": "dw-3",
      "name": "Lê Tuấn",
      "content": "Bảo vệ 90 phút đầu ngày như một thành trì bất khả xâm phạm. Bài viết chia sẻ rất thiết thực.",
      "date": "2 ngày trước",
      "likes": 29
    }
  ],
  "bi-quyet-danh-thuc-trang-thai-dong-chay-flow": [
    {
      "id": "bkf-1",
      "name": "Trần Bảo Ngọc (Nhạc sĩ / Producer • 28 tuổi)",
      "content": "Khi bước vào trạng thái Flow, thời gian như ngưng đọng lại, 3 tiếng trôi qua như 15 phút. Trước đây mình hay bị bế tắc ý tưởng âm nhạc vì cứ đang làm là liếc nhìn điện thoại hoặc check tin nhắn nhóm. Áp dụng bí quyết đặt ra mục tiêu siêu rõ ràng, tắt toàn bộ wifi và điện thoại như bài viết hướng dẫn chính là chiếc chìa khóa mở cánh cửa sáng tạo. Hôm qua lần đầu tiên sau 4 tháng, mình đã ngồi sáng tác trọn vẹn một bản demo hoàn chỉnh chỉ trong 1 buổi chiều trong sự hưng phấn tột độ!",
      "date": "Hôm qua",
      "likes": 67,
      "isLongStory": true
    },
    {
      "id": "bkf-2",
      "name": "Hữu Toàn",
      "content": "Nhân 5 hiệu suất mà không bị kiệt sức vì não bộ tiết ra đồng thời cả Dopamine, Anandamide và Endorphin. Khoa học thần kinh về Flow quá thú vị!",
      "date": "2 ngày trước",
      "likes": 36
    },
    {
      "id": "bkf-3",
      "name": "Khánh Vân",
      "content": "Áp dụng ngay cho buổi vẽ tranh chiều nay. Cảm ơn Trại Cai Nghiện!",
      "date": "3 ngày trước",
      "likes": 22
    }
  ],
  "review-sach-thoi-dai-cua-su-chu-y-stolen-focus": [
    {
      "id": "sf-1",
      "name": "Đào Minh Hạnh (Cựu Giám đốc Marketing • 36 tuổi)",
      "content": "Cuốn 'Stolen Focus' của Johann Hari đã vạch trần một sự thật tàn nhẫn: Sự mất tập trung của bạn không phải lỗi cá nhân bạn yếu kém, mà là do cả một hệ thống kinh tế dựa trên sự chú ý (Surveillance Capitalism) đang có chủ đích đánh cắp tâm trí bạn để bán quảng cáo. Bài review của Trại phân tích rất khách quan và đánh thức lương tri. Hãy giành lại sự chú ý vì đó chính là cuộc đời của chúng ta!",
      "date": "4 ngày trước",
      "likes": 81,
      "isLongStory": true
    },
    {
      "id": "sf-2",
      "name": "Thái Sơn",
      "content": "Khi một dịch vụ trên mạng là miễn phí, chính sự chú ý và thời gian của bạn là món hàng được đem bán. Đọc mà tỉnh cả người.",
      "date": "2 ngày trước",
      "likes": 47
    },
    {
      "id": "sf-3",
      "name": "Ngọc Bích",
      "content": "Cảm ơn bài viết đã giúp mình nhận ra đây là một cuộc chiến sinh tồn về sự chú ý chứ không đơn thuần là thói quen xấu.",
      "date": "1 ngày trước",
      "likes": 31
    }
  ],
  "bi-quyet-nhan-10-su-tap-trung-sahar-yousef": [
    {
      "id": "sy-1",
      "name": "Lê Gia Hưng (Founder Startup)",
      "content": "Nghiên cứu của TS Sahar Yousef tại UC Berkeley về 'Focus Sprints' và việc phân tách không gian làm việc - không gian giải trí cực kỳ thực tế. Mình vừa quy định: chiếc bàn gỗ này chỉ dùng để làm việc tập trung, khi muốn giải trí lướt web phải bước ra ghế sofa phòng khách. Não bộ tự động thiết lập phản xạ có điều kiện cực nhạy!",
      "date": "2 ngày trước",
      "likes": 53,
      "isLongStory": true
    },
    {
      "id": "sy-2",
      "name": "Thùy Linh",
      "content": "Mẹo chia ngày làm việc thành các khối năng lượng Focus - Collaborate - Recharge giúp mình hết hẳn tình trạng kiệt sức cuối ngày.",
      "date": "Hôm qua",
      "likes": 34
    },
    {
      "id": "sy-3",
      "name": "Minh Quân",
      "content": "Các nhà khoa học thần kinh chia sẻ công cụ nào là thấy uy tín và ứng dụng được ngay công cụ đó.",
      "date": "3 ngày trước",
      "likes": 26
    }
  ],
  "review-sach-giai-ma-hoocmon-dopamine-anna-lembke": [
    {
      "id": "dn-1",
      "name": "Bác sĩ Chuyên khoa II Lê Trọng Nghĩa",
      "content": "Cuốn 'Dopamine Nation' của GS Anna Lembke (Trưởng khoa Nghiện học Đại học Y Stanford) là cuốn sách gối đầu giường mà tôi luôn khuyên các bệnh nhân của mình đọc. Hình ảnh chiếc bập bênh 'Khoái cảm và Nỗi đau' (Pleasure-Pain Balance) giải thích vì sao càng tìm kiếm sự thỏa mãn tức thì từ màn hình, rượu bia hay mua sắm, chiếc bập bênh càng nghiêng nặng về phía trầm cảm và trống rỗng. Bài viết của Trại Cai Nghiện truyền tải trọn vẹn tinh thần y khoa này với ngôn từ rất đỗi dịu dàng.",
      "date": "4 ngày trước",
      "likes": 88,
      "isLongStory": true
    },
    {
      "id": "dn-2",
      "name": "Hải Yến",
      "content": "Hiểu được cơ chế bập bênh đau - sướng giúp mình bình thản đón nhận những lúc chán nản mà không vội vàng tìm kích thích rẻ tiền để bù đắp nữa.",
      "date": "2 ngày trước",
      "likes": 43
    },
    {
      "id": "dn-3",
      "name": "Quốc Anh",
      "content": "Hố sâu trống rỗng sau mỗi cơn say mê thế giới ảo đã được giải mã tường tận. Một cuốn sách và một bài viết cứu rỗi nhiều tâm hồn.",
      "date": "1 ngày trước",
      "likes": 35
    }
  ],
  "nghien-lam-viec-nhu-nghien-mang-xa-hoi-dao-nguoc-dopamine": [
    {
      "id": "ddm-1",
      "name": "Trần Đình Khang (Senior Backend Developer)",
      "content": "Đảo ngược dopamine: biến việc giải quyết bug phức tạp thành cảm giác hưng phấn thay vì sợ hãi. Áp dụng kỹ thuật chia nhỏ nhiệm vụ thành từng subtask 15 phút và gạch bỏ từng dòng trên sổ tay, dopamine tiết ra đều đặn khiến mình say mê làm việc cả buổi sáng mà quên cả lướt Facebook.",
      "date": "Hôm qua",
      "likes": 51,
      "isLongStory": true
    },
    {
      "id": "ddm-2",
      "name": "Ngọc Diệp",
      "content": "Thay vì để thuật toán điều khiển dopamine của mình, mình tự học cách làm chủ và tái định tuyến dòng chảy dopamine vào những việc có ích. Tư duy rất khai phóng!",
      "date": "2 ngày trước",
      "likes": 38
    },
    {
      "id": "ddm-3",
      "name": "Văn Thuận",
      "content": "Bài viết này cho dân làm công nghệ đọc thì thấm đến tận xương tủy.",
      "date": "3 ngày trước",
      "likes": 27
    }
  ],
  "bai-hoc-hoan-thien-ban-than-tim-ferriss-khoi-3-gio-vang": [
    {
      "id": "tf-1",
      "name": "Nguyễn Vũ Long (Tác giả tự do • 31 tuổi)",
      "content": "Quy tắc 'Hai trang giấy dở tệ' (Two Crappy Pages) của Tim Ferriss đã cứu mình khỏi sự bế tắc của chủ nghĩa hoàn hảo. Trước đây cứ ngồi vào bàn là muốn viết ra kiệt tác, kết quả là sợ hãi và mở mạng xã hội lướt đến hết ngày. Giờ tự cho phép mình viết 2 trang thật dở tệ, gỡ bỏ áp lực, thế mà dòng chữ lại tuôn trào tự nhiên. Kết hợp khối 3 giờ vàng buổi sáng, năng suất tăng không ngờ!",
      "date": "3 ngày trước",
      "likes": 65,
      "isLongStory": true
    },
    {
      "id": "tf-2",
      "name": "Minh Thảo",
      "content": "Khối 3 giờ vàng trước khi thế giới thức giấc và gửi email làm phiền là khoảng thời gian thiêng liêng nhất trong ngày.",
      "date": "1 ngày trước",
      "likes": 39
    },
    {
      "id": "tf-3",
      "name": "Đức Huy",
      "content": "Hạ thấp tiêu chuẩn khởi đầu để vượt qua lực cản quán tính. Bài học của Tim Ferriss luôn mang tính thực chiến cao.",
      "date": "2 ngày trước",
      "likes": 28
    }
  ],
  "bi-mat-xep-gach-lego-xay-thoi-quen-de-nhu-quet-tiktok": [
    {
      "id": "lego-1",
      "name": "Hoàng Thị Mai Loan (32 tuổi • Mẹ của 2 bé)",
      "content": "Phương pháp 'Xếp gạch Lego' (Habit Stacking) lồng ghép thói quen mới vào ngay sau một thói quen cũ đã có sẵn vận hành mượt mà ngoài sức tưởng tượng! Mình đặt quy tắc: Cứ sau khi rót xong cốc nước ấm buổi sáng -> ngồi thở chậm 2 phút. Sau khi đóng nắp laptop buổi chiều -> tưới cây ban công 5 phút. Không cần tốn thêm một chút ý chí gồng ép nào mà nếp sống vẫn ngăn nắp, thư thái.",
      "date": "2 ngày trước",
      "likes": 70,
      "isLongStory": true
    },
    {
      "id": "lego-2",
      "name": "Anh Tuấn (Nhân viên kinh doanh)",
      "content": "Gắn thói quen đọc 5 trang sách vào ngay sau khi uống cà phê sáng. Giờ cứ cầm tách cà phê là tay tự động với cuốn sách giấy. Cực kỳ tự nhiên!",
      "date": "Hôm qua",
      "likes": 37
    },
    {
      "id": "lego-3",
      "name": "Thanh Trúc",
      "content": "Xây thói quen dễ như quẹt TikTok — bài viết biến những lý thuyết hành vi phức tạp thành trò chơi ghép hình thú vị.",
      "date": "3 ngày trước",
      "likes": 24
    }
  ],
  "ao-tuong-chua-lanh-nao-bo-cam-bay-boi-thuc-thong-tin": [
    {
      "id": "atch-1",
      "name": "Đặng Thùy Dương (27 tuổi)",
      "content": "Đọc bài viết này như bị tát tỉnh cơn mê! Suốt cả năm qua mình tự nhận là đang trên 'hành trình chữa lành': sáng nghe podcast thiền, trưa xem video tâm lý học, tối lướt threads đọc các câu trích dẫn self-help... nhưng tâm tính vẫn nóng nảy, bất an và lười biếng y như cũ. Đúng là càng nạp thụ động não càng rỗng và nghiện cảm giác được vỗ về ảo. Chữa lành thật sự là phải xắn tay áo lên sửa chữa cuộc đời thực của mình.",
      "date": "3 ngày trước",
      "likes": 76,
      "isLongStory": true
    },
    {
      "id": "atch-2",
      "name": "Lâm Đình Trọng",
      "content": "Bội thực thông tin tâm lý học khiến người ta trở thành những nhà phê bình sắc sảo về nỗi đau của mình nhưng lại bất lực trong hành động.",
      "date": "1 ngày trước",
      "likes": 44
    },
    {
      "id": "atch-3",
      "name": "Phương Linh",
      "content": "Một lời cảnh tỉnh đanh thép cho trào lưu chữa lành thương mại hóa hiện nay. Cảm ơn Trại Cai Nghiện!",
      "date": "2 ngày trước",
      "likes": 32
    }
  ],
  "ban-khong-he-luoi-chua-tim-duoc-ban-cong-cua-minh": [
    {
      "id": "bkhl-1",
      "name": "Lê Hoàng Yến (30 tuổi • Cựu nhân viên Agency)",
      "content": "Hình ảnh 'Tìm ra ban công của mình' làm mình nghẹn ngào. Suốt 4 năm làm việc ở agency quảng cáo, ngày nào cũng chạy deadline cuống cuồng dưới tầng trệt ồn ào đầy khói bụi của những yêu cầu và số liệu, mình kiệt sức và nghĩ mình là kẻ lười biếng chán đời. Cho đến khi dám xin nghỉ phép 1 tuần lên đồi thông Đà Lạt, đứng trên ban công nhìn mây trôi và tự hỏi mình thật sự muốn gì. Khi tìm được một khoảng lặng để nhìn toàn cảnh cuộc đời, năng lượng sống tự khắc ùa về.",
      "date": "4 ngày trước",
      "likes": 82,
      "isLongStory": true
    },
    {
      "id": "bkhl-2",
      "name": "Trần Minh Quang",
      "content": "Bạn không lười, bạn chỉ đang bị kiệt quệ vì chiến đấu trong một môi trường không thuộc về mình. Cần một góc nhìn từ 'ban công' để bao quát lại con đường.",
      "date": "2 ngày trước",
      "likes": 45
    },
    {
      "id": "bkhl-3",
      "name": "Diệu Thảo",
      "content": "Bài viết viết rất thơ, rất mộc mạc và an ủi tâm hồn những người trẻ đang chênh vênh giữa đô thị.",
      "date": "Hôm qua",
      "likes": 33
    }
  ],
  "dinh-luat-yerkes-dodson-viec-cang-kho-cang-phai-binh-tinh": [
    {
      "id": "yd-1",
      "name": "Phan Quốc Bảo (Kỹ sư Cầu đường)",
      "content": "Định luật Yerkes-Dodson giải thích vì sao mỗi khi gặp dự án khó hay vấn đề phức tạp, nếu ta càng hối hả lo âu và uống thêm cà phê kích thích thì não càng bị tê liệt. Với việc khó đòi hỏi tư duy trừu tượng cao, mức kích thích tối ưu phải ở mức thấp — tức là tâm trí phải thật bình tĩnh và thả lỏng. Chiều nay áp dụng đi dạo 10 phút trước khi giải quyết sự cố, đầu óc thông suốt giải quyết xong trong tích tắc!",
      "date": "2 ngày trước",
      "likes": 57,
      "isLongStory": true
    },
    {
      "id": "yd-2",
      "name": "Hà Phương",
      "content": "Việc càng khó càng phải bình tĩnh thở chậm. Đồ thị chữ U ngược của Yerkes-Dodson là bài học đắt giá cho bất kỳ ai hay bị hoảng loạn deadline.",
      "date": "1 ngày trước",
      "likes": 39
    },
    {
      "id": "yd-3",
      "name": "Thế Hùng",
      "content": "Cảm ơn Trại đã đem những định luật tâm lý học kinh điển ra soi sáng cho đời sống thực chiến.",
      "date": "3 ngày trước",
      "likes": 24
    }
  ],
  "vi-sao-58-phan-tram-nguoi-dung-xoa-mang-xa-hoi": [
    {
      "id": "xmxh-1",
      "name": "Nguyễn Đăng Vũ (31 tuổi • Cựu Facebooker)",
      "content": "Mình nằm trong số 58% đã âm thầm xóa Facebook và Instagram khỏi điện thoại suốt 6 tháng qua. Ban đầu bạn bè bảo mình 'dị', hỏi có biến cố gì mà quy y ở ẩn thế. Nhưng sau 6 tháng, mình giành lại được trung bình 3 tiếng mỗi tối: ngồi ăn cơm trọn vẹn với vợ, đọc hết 6 cuốn sách giấy và bắt đầu chạy bộ lại được 5km. Cái giá của 'miễn phí' chính là sức khỏe tinh thần và thời gian sống. Rời xa mạng xã hội là quyết định sáng suốt nhất đời mình!",
      "date": "3 ngày trước",
      "likes": 91,
      "isLongStory": true
    },
    {
      "id": "xmxh-2",
      "name": "Thanh Mai (24 tuổi)",
      "content": "Hiện tượng rung chuông ảo (Phantom Vibration) và nỗi sợ bỏ lỡ FOMO biến mất hoàn toàn sau 1 tuần tắt toàn bộ thông báo mạng xã hội. Bình yên vô cùng.",
      "date": "1 ngày trước",
      "likes": 48
    },
    {
      "id": "xmxh-3",
      "name": "Trọng Hiếu",
      "content": "Bài viết chạm đúng xu hướng của những người trẻ bắt đầu thức tỉnh khỏi ma trận số. Chất lượng sống đo bằng sự hiện diện thật ngoài đời.",
      "date": "Hôm qua",
      "likes": 36
    }
  ],
  "cu-lua-can-bang-cuoc-song-nghe-thuat-can-bang-dong": [
    {
      "id": "cbd-1",
      "name": "Trần Thu Trang (Giám đốc Điều hành & Mẹ 2 con)",
      "content": "Khái niệm 'Work-Life Balance' tĩnh tại từng là cái bẫy làm mình cảm thấy tội lỗi nhất trần đời. Khi ở công ty thì dằn vặt vì không dành thời gian cho con, khi ở nhà chơi với con thì thấp thỏm lo việc công ty chưa xong. Bài viết của Trại mở khóa cho mình: Cân bằng không phải là cái cân đĩa đứng yên 50/50, mà là 'Cân bằng động' như người đi trên dây — lúc nghiêng sang việc thì dồn toàn tâm toàn ý, lúc nghiêng về gia đình thì hiện diện 100%. Tự do trong tâm trí là đây chứ đâu!",
      "date": "2 ngày trước",
      "likes": 86,
      "isLongStory": true
    },
    {
      "id": "cbd-2",
      "name": "Văn Hùng",
      "content": "Hình ảnh người đi trên dây nghiêng mình liên tục để giữ thăng bằng quá xuất sắc. Cuộc sống luôn biến động, đòi hỏi sự linh hoạt chứ không phải công thức cứng nhắc.",
      "date": "Hôm qua",
      "likes": 43
    },
    {
      "id": "cbd-3",
      "name": "Bảo Trân",
      "content": "Bớt dằn vặt vì những ngày phải dồn sức cho công việc, chỉ cần nhớ sau đó dành thời gian để hồi phục và yêu thương người thân. Cảm ơn Trại!",
      "date": "3 ngày trước",
      "likes": 29
    }
  ],
  "ky-luat-khong-can-gong-thoi-quen-nguyen-tu-20261108": [
    {
      "id": "klkg-1",
      "name": "Trần Minh Quân (31 tuổi • Quản lý kỹ thuật)",
      "content": "Từ trước tới nay mình luôn có một ngộ nhận tai hại: muốn kỷ luật là phải gồng, phải nghiến răng chịu đựng, phải đặt mục tiêu thật khủng khiếp kiểu 5h sáng chạy 10km. Kết quả là chỉ được 3 ngày là bỏ cuộc trong cảm giác thất bại và tự ti. Bài phân tích về Thói quen nguyên tử và video của Better Version đã khai sáng cho mình: Kỷ luật không phải là sự hành xác, mà là nghệ thuật làm cho hành động tốt trở nên dễ dàng nhất có thể (Make it easy). Thay vì ép mình đọc 50 trang sách, tối nay mình chỉ mở sách đọc đúng 2 trang. Thấy lòng nhẹ nhõm vô cùng!",
      "date": "Hôm qua",
      "likes": 64,
      "isLongStory": true
    },
    {
      "id": "klkg-2",
      "name": "Nguyễn Thùy Linh (Gen Z)",
      "content": "Đoạn 'Đừng đánh giá thấp sức mạnh tích lũy của 1% mỗi ngày' đã cứu vớt mình khỏi cơn khủng hoảng so sánh với bạn bè đồng trang lứa. Chỉ cần mỗi ngày nhích một chút xíu theo tinh thần Kaizen là đủ.",
      "date": "Vừa xong",
      "likes": 38
    },
    {
      "id": "klkg-3",
      "name": "Bùi Hoàng Phúc",
      "content": "Thay đổi danh tính (Identity-based habits): thay vì tự nhủ 'mình đang cố bỏ lướt điện thoại', hãy tự nhủ 'mình là người trân trọng thời gian sống'. Cách đổi góc nhìn này hiệu nghiệm không ngờ!",
      "date": "1 ngày trước",
      "likes": 29
    }
  ],
  "chua-lanh-nao-bo-khoi-nhun-nao-so-brain-rot-20261108": [
    {
      "id": "cln-1",
      "name": "Phan Thế Vinh (25 tuổi • Thiết kế đồ họa)",
      "content": "Hội chứng 'Nhũn não số' (Brain Rot) được tác giả phân tích dựa trên video của Hieu The Consul chạm đúng tim đen của mình. Có những ngày đi làm về mệt mỏi, nằm bấm video ngắn liên tục 3 tiếng đồng hồ, đến lúc buông máy ra thấy đầu óc lơ mơ, tai ù đi, tim đập thình thịch và cảm giác trống rỗng tột cùng. Bài viết chỉ ra rất đúng: Sự tập trung không đến từ việc nghiến răng gồng mình, mà đến từ việc chủ động dọn rác kích thích và làm dịu hệ thần kinh. Áp dụng ngay phác đồ ngắt kết nối 60 phút buổi tối, cảm giác tâm trí bình yên trở lại thật kỳ diệu.",
      "date": "Hôm qua",
      "likes": 71,
      "isLongStory": true
    },
    {
      "id": "cln-2",
      "name": "Đặng Thị Mai (Giáo viên)",
      "content": "Học sinh bây giờ mất tập trung nghiêm trọng vì chứng nhũn não số này. Đọc bài viết thấy xót xa và càng thấy tầm quan trọng của việc giáo dục lại thói quen số cho người trẻ.",
      "date": "Vừa xong",
      "likes": 42
    },
    {
      "id": "cln-3",
      "name": "Lê Quốc Thái",
      "content": "Làm dịu tâm trí bằng sự tĩnh lặng nguyên bản thay vì nhồi nhét thêm thông tin. Cảm ơn Trại Cai Nghiện vì một bài viết đánh thức lương tri kịp thời!",
      "date": "1 ngày trước",
      "likes": 31
    }
  ],
  "khi-chi-con-10-phan-tram-nang-luong-giao-an-cho-ngay-kiet-que": [
    {
      "id": "10nl-1",
      "name": "Vũ Phương Thảo (29 tuổi • Content Specialist)",
      "content": "Sáng nay mở mắt ra thấy toàn thân như bị rút cạn pin, đầu óc nặng trịch và chỉ muốn trùm chăn khóc. Bình thường những ngày như thế này mình sẽ chìm trong cảm giác tội lỗi dữ dội vì không hoàn thành deadline, rồi lại cầm điện thoại lướt trong tuyệt vọng. Đọc 'Giáo án cho ngày kiệt quệ' của Trại mà nước mắt rơi lã chã: 'Khi chân đang đau, đừng ép nó chạy nước rút'. Mình cho phép mình hạ tiêu chuẩn xuống mức sinh tồn, chỉ làm đúng 1 việc nhỏ nhất là uống một cốc nước ấm và trả lời 1 chiếc email quan trọng. Sự tự từ bi (Self-compassion) đã cứu sống một ngày tồi tệ của mình.",
      "date": "Hôm qua",
      "likes": 85,
      "isLongStory": true
    },
    {
      "id": "10nl-2",
      "name": "Hoàng Nam (Developer)",
      "content": "Khái niệm 'Non-zero Day' (Ngày không về số 0) và việc chấp nhận nhịp sinh học lên xuống tự nhiên là bài học quá nhân văn. Chúng ta là con người chứ không phải chiếc máy tính cắm điện 24/7.",
      "date": "Vừa xong",
      "likes": 53
    },
    {
      "id": "10nl-3",
      "name": "Đỗ Mai Anh",
      "content": "Bài viết này xứng đáng được ghim lên đầu giường của bất kỳ ai đang vật lộn với chứng kiệt sức (burnout). Đọc xong cảm giác được vỗ về và ôm trọn vào lòng.",
      "date": "1 ngày trước",
      "likes": 39
    }
  ]
};

// Fallback comments phân loại theo Pillar Tag nếu bài viết mới chưa có custom comments riêng
export const pillarFallbackComments: Record<string, Comment[]> = {
  HieuHanhVi: [
    {
      id: "fb-hhv-1",
      name: "Trần Minh Khang (Kỹ sư IT • 32 tuổi)",
      content: "Đọc bài viết phân tích cơ chế hành vi này mình như được cởi bỏ tảng đá tội lỗi đè nặng bao lâu nay. Hóa ra thói quen quẹt máy không phải do mình sinh ra đã yếu đuối, mà là hệ thống dopamine đang bị kích thích liên tục. Cảm ơn Trại vì cách tiếp cận khoa học và bao dung.",
      date: "2 ngày trước",
      likes: 45,
      isLongStory: true,
    },
    {
      id: "fb-hhv-2",
      name: "Hải Yến (Gen Z)",
      content: "Hiểu được cơ chế sinh học đằng sau cơn thèm giúp mình bình tâm quan sát bản thân hơn, không còn tự trách móc như trước nữa.",
      date: "Hôm qua",
      likes: 28,
    },
    {
      id: "fb-hhv-3",
      name: "Bác sĩ Tâm lý Trần Vũ",
      content: "Đánh giá rất cao cách Trại Cai Nghiện dân dã hóa các học thuyết hành vi kinh điển thành bài học đời thường dễ hiểu.",
      date: "3 ngày trước",
      likes: 37,
    },
  ],
  XayDungThoiQuen: [
    {
      id: "fb-xdtq-1",
      name: "Nguyễn Trọng Đức",
      content: "Bài viết về thiết kế môi trường và thói quen rất thực tế. Thay vì gồng mình dùng ý chí, chỉ cần thay đổi ma sát 1% là nếp sống tự nhiên thay đổi.",
      date: "2 ngày trước",
      likes: 42,
    },
    {
      id: "fb-xdtq-2",
      name: "Thùy Dung (Nhân viên văn phòng)",
      content: "Đúng là Atomic Habits bản đời thường. Áp dụng từng bước nhỏ mỗi ngày thấy cuộc sống ngăn nắp và nhẹ nhõm hơn hẳn.",
      date: "1 ngày trước",
      likes: 31,
    },
    {
      id: "fb-xdtq-3",
      name: "Quang Huy",
      content: "Thói quen nhỏ tạo nên chuyển hóa lớn. Cảm ơn Trại đã trao cho cộng đồng những phương pháp thiết thực không lý thuyết suông.",
      date: "3 ngày trước",
      likes: 24,
    },
  ],
  LayLaiSuTapTrung: [
    {
      id: "fb-llstc-1",
      name: "Nguyễn Duy Hưng (Freelancer)",
      content: "Áp dụng phương pháp làm việc sâu và loại bỏ tạp âm số của bài viết, sáng nay mình đã hoàn thành trọn vẹn task quan trọng nhất sau 2 tuần trì hoãn.",
      date: "Hôm qua",
      likes: 39,
    },
    {
      id: "fb-llstc-2",
      name: "Phương Thảo",
      content: "Khôi phục lại năng lực tập trung giữa thời đại xao nhãng này thực sự là món quà lớn nhất cho sức khỏe tinh thần.",
      date: "2 ngày trước",
      likes: 27,
    },
    {
      id: "fb-llstc-3",
      name: "Lê Hoàng An",
      content: "Tắt hết notification và chỉ làm 1 việc trong 1 khoảng thời gian nhất định. Đơn giản nhưng hiệu quả bất ngờ!",
      date: "3 ngày trước",
      likes: 33,
    },
  ],
  SachHay: [
    {
      id: "fb-sh-1",
      name: "Nguyễn Văn Hùng (Mọt sách đời thực)",
      content: "Bài review sách có chiều sâu hiếm có! Không chỉ tóm tắt nội dung mà còn kết nối với những bế tắc tâm lý của người trẻ thời nay.",
      date: "2 ngày trước",
      likes: 48,
    },
    {
      id: "fb-sh-2",
      name: "Thanh Trúc",
      content: "Đọc xong bài viết này mình quyết định mua ngay bản sách giấy về nghiền ngẫm. Cảm ơn gợi ý tuyệt vời của Trại!",
      date: "Hôm qua",
      likes: 35,
    },
    {
      id: "fb-sh-3",
      name: "Mai Lan",
      content: "Một cuốn sách hay đọc đúng thời điểm có thể thay đổi cả một góc nhìn cuộc đời. Bài viết phân tích rất trang nhã.",
      date: "3 ngày trước",
      likes: 29,
    },
  ],
  TrietHocCuocSong: [
    {
      id: "fb-thcs-1",
      name: "Tâm An",
      content: "Mỗi lần vào đọc bài viết ở Trại như được ngồi tĩnh lặng giữa một rừng thông. Triết lý sống bình dị nhưng lay động lòng người.",
      date: "Hôm qua",
      likes: 44,
    },
    {
      id: "fb-thcs-2",
      name: "Hoàng Bách",
      content: "Sống có chủ đích và buông bỏ bớt những tiện nghi thừa thãi để chạm chân vào đời thực. Cảm ơn Trại Cai Nghiện!",
      date: "2 ngày trước",
      likes: 36,
    },
  ],
  RenLuyenBoNao: [
    {
      id: "fb-rlbn-1",
      name: "Bác sĩ Duy Hưng",
      content: "Khoa học thần kinh ứng dụng được giải thích cực kỳ mạch lạc và sinh động. Rất phù hợp cho người trẻ muốn làm chủ tâm trí.",
      date: "2 ngày trước",
      likes: 41,
    },
    {
      id: "fb-rlbn-2",
      name: "Tuấn Kiệt",
      content: "Hiểu được cơ chế sinh học của não bộ giúp mình biết cách vận hành cơ thể đúng nhịp, không còn bị kiệt sức mỗi chiều.",
      date: "Hôm qua",
      likes: 30,
    },
  ],
};

// Hàm lấy danh sách bình luận seeding chuẩn mực, độc bản và bám sát nội dung bài viết
export function getCommentsForArticle(slug: string, pillarTag?: string): Comment[] {
  if (articleCommentsMap[slug] && articleCommentsMap[slug].length > 0) {
    return articleCommentsMap[slug];
  }

  if (pillarTag && pillarFallbackComments[pillarTag]) {
    return pillarFallbackComments[pillarTag];
  }

  return pillarFallbackComments["HieuHanhVi"] || [];
}
