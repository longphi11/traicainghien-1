import json

with open('src/data/articleComments.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_comments = """  "ban-khong-he-luoi-ban-dang-tieu-xai-qua-som-cuoc-doi-minh": [
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
"""

marker = "export const articleCommentsMap: Record<string, Comment[]> = {\n"
idx = content.find(marker)
if idx == -1:
    raise Exception("Marker not found in articleComments.ts")

insert_pos = idx + len(marker)
new_content = content[:insert_pos] + new_comments + content[insert_pos:]

with open('src/data/articleComments.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Inserted comments successfully!")
