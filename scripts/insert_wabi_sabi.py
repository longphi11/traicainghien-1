import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

# 1. Update src/data/articleComments.ts
slug = "triet-ly-wabi-sabi-thoat-khoi-bay-hoan-hao-de-song-tron-ven"

comments_code = '''  "''' + slug + '''": [
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
'''

comments_path = "src/data/articleComments.ts"
with open(comments_path, "r", encoding="utf-8") as f:
    comments_content = f.read()

if slug not in comments_content:
    marker = "export const articleCommentsMap: Record<string, Comment[]> = {"
    idx = comments_content.find(marker)
    if idx != -1:
        insert_pos = idx + len(marker) + 1
        new_content = comments_content[:insert_pos] + "\n" + comments_code + comments_content[insert_pos:]
        with open(comments_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated articleComments.ts successfully!")
    else:
        print("Marker not found in articleComments.ts")
else:
    print("Slug already in articleComments.ts")

# 2. Update src/data/article_registry.json
registry_path = "src/data/article_registry.json"
with open(registry_path, "r", encoding="utf-8") as f:
    registry = json.load(f)

if slug not in registry:
    registry.insert(0, slug)
    with open(registry_path, "w", encoding="utf-8") as f:
        json.dump(registry, f, ensure_ascii=False, indent=2)
    print("Updated article_registry.json successfully! Total articles:", len(registry))
else:
    print("Slug already in article_registry.json")

# 3. Update src/data/articles.ts
sys.path.append('.')
from scripts.draft_wabi_sabi_article import new_article

articles_path = "src/data/articles.ts"
with open(articles_path, "r", encoding="utf-8") as f:
    articles_ts = f.read()

if slug not in articles_ts:
    marker = "const rawArticles: Article[] = ["
    idx = articles_ts.find(marker)
    if idx != -1:
        insert_pos = idx + len(marker) + 1
        article_json = json.dumps(new_article, ensure_ascii=False, indent=2)
        article_code = f"  {article_json},\n"
        new_ts = articles_ts[:insert_pos] + "\n" + article_code + articles_ts[insert_pos:]
        with open(articles_path, "w", encoding="utf-8") as f:
            f.write(new_ts)
        print("Updated articles.ts successfully!")
    else:
        print("Marker not found in articles.ts")
else:
    print("Slug already in articles.ts")
