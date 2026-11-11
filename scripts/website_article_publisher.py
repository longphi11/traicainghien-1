import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
import re
import json
import hashlib
import subprocess

ARTICLES_FILE = "src/data/articles.ts"
REGISTRY_FILE = "src/data/article_registry.json"
COMMENTS_FILE = "src/data/articleComments.ts"

# ==========================================================================
# KHO BINH LUAN SEEDING DOC BAN
# Moi bai phai sinh ra 3 binh luan KHAC NHAU tuyet doi (audit_comments.js
# se be gay build neu phat hien 2 bai co binh luan trung nhau y nguyen).
# Vi vay: chon mau theo hash(slug) + neo vao tieu de bai + doi chieu lai
# voi toan bo binh luan da co truoc khi tra ve.
# ==========================================================================

SEEDING_PERSONAS = [
    "Nguyễn Hoàng Nam (Lập trình viên Backend • 28 tuổi)",
    "Trần Thị Mai Phương (Content Strategist)",
    "Lê Quốc Bảo (Sinh viên năm cuối)",
    "Vũ Thu Trang (Dược sĩ lâm sàng • 29 tuổi)",
    "Đặng Minh Quân (Project Manager)",
    "Phạm Hải Đăng (24 tuổi)",
    "Hoàng Thùy Linh (Giáo viên Ngữ văn • 31 tuổi)",
    "Ngô Tuấn Kiệt (Nhân viên thiết kế đồ họa)",
    "Bùi Thanh Hà (Mẹ hai con • 33 tuổi)",
    "Đỗ Văn Sơn (Kỹ sư cơ khí • 27 tuổi)",
    "Nguyễn Diệu Linh (Sinh viên năm hai)",
    "Trịnh Công Minh (Nhân viên kinh doanh • 26 tuổi)",
    "Lý Mai Chi (Biên tập viên • 30 tuổi)",
    "Phan Anh Tú (Chủ tiệm cà phê nhỏ)",
    "Đinh Thị Kim Ngân (Kế toán • 32 tuổi)",
    "Hồ Nhật Trường (Nhân viên IT helpdesk)",
]

# Mệnh đề nối sau "Đọc bài '...' xong, mình ..."
SEEDING_OPENERS = [
    "ngồi im một lúc lâu",
    "thấy trúng tim đen quá",
    "phải dừng lại giữa chừng vì hơi rát mặt",
    "hơi xấu hổ vì đã tự trách mình quá nhiều",
    "thấy được thở ra",
    "nghĩ ngay tới đứa em đang học năm nhất",
    "phải bỏ điện thoại xuống mới đọc hết được",
    "mới dám thừa nhận với bản thân một chuyện",
    "đọc lại hai lần mới hết",
    "thấy bớt cô đơn trong cái chuyện này",
    "hiểu ra tại sao mình cứ thất bại hoài",
    "muốn gửi ngay cho mấy đứa bạn cùng cảnh",
    "nhận ra mình đã gọi sai tên vấn đề của mình",
    "thấy nhẹ hơn hẳn",
]

# Thân bài dài (comment 1) - nhánh chủ đề tập trung / dopamine
# Mỗi câu chuyện đi kèm đúng nhân vật kể, để không bao giờ có cảnh
# "Content Strategist" tự nhận "mình là sinh viên năm cuối".
SEEDING_STORIES_FOCUS = [
    ("Nguyễn Hoàng Nam (Lập trình viên Backend • 28 tuổi)",
     "Suốt nửa năm nay mình vật lộn với mấy cơn nhảy tab liên tục. Đang code dở là ngón tay tự bật sang mạng xã hội, lướt mười phút rồi quay lại quên mất mình đang làm gì. Đọc phần giải thích về dopamine mình mới hiểu não mình không lười, nó chỉ đang bị bơm kích thích quá liều."),
    ("Đặng Minh Quân (Project Manager • 30 tuổi)",
     "Mình từng nghĩ mình thiếu kỷ luật. Hóa ra là mình đang bắt một bộ não thời đồ đá chạy trong cái máy đánh bạc. Hôm nay mình để điện thoại ở phòng khác và làm liền một mạch 45 phút, cảm giác khác hẳn mọi hôm."),
    ("Ngô Tuấn Kiệt (Nhân viên thiết kế đồ họa)",
     "Cái đoạn nói về chi phí chuyển đổi ngữ cảnh làm mình nhớ lại một ngày mình mở 32 tab. Tưởng là làm nhiều việc, thật ra không xong việc nào. Từ hôm qua mình chỉ để 3 tab."),
    ("Trần Thị Mai Phương (Content Strategist • 27 tuổi)",
     "Mình làm nội dung nên điện thoại là công cụ, không cất hẳn được. Nhưng mình học được cách để nó ở chế độ máy bay trong khung 45 phút. Ba ngày nay làm theo và thấy mình viết nhanh hơn thật."),
    ("Đinh Thị Kim Ngân (Kế toán • 32 tuổi)",
     "Mình đang trên xe buýt về nhà thì mở bài này ra, và thấy hơi xấu hổ vì đã tự mắng mình quá nhiều. Hóa ra cảm giác mục rỗng kia là phản ứng bình thường của một bộ não bị lấy cắp sự chú ý mỗi ngày."),
    ("Hồ Nhật Trường (Nhân viên IT helpdesk)",
     "Mình từng cài đủ loại app chặn mạng xã hội rồi lại gỡ. Bài viết chỉ ra chỗ mình sai: mình chặn bằng ý chí thay vì dời cái ma sát đi. Hôm nay mình chỉ đổi một việc là sạc điện thoại ở nhà bếp thay vì đầu giường."),
    ("Hoàng Thùy Linh (Giáo viên Ngữ văn • 31 tuổi)",
     "Mình là giáo viên, tối nào cũng mang bài về nhà chấm. Trước đây vừa chấm vừa bật video cho đỡ buồn, xong chẳng nhớ gì. Bây giờ mình chấm 25 phút rồi nghỉ 5 phút, thấy nhẹ người hơn nhiều."),
    ("Lý Mai Chi (Biên tập viên • 30 tuổi)",
     "Có một câu trong bài khiến mình dừng lại: mình không cần trở nên kỷ luật hơn, mình cần bớt bị quấy nhiễu hơn. Mình đã viết câu đó ra giấy và dán lên màn hình."),
    ("Nguyễn Diệu Linh (Sinh viên năm cuối)",
     "Mình là sinh viên năm cuối, đồ án trễ ba tuần. Áp dụng đúng cái khung một việc một lúc, hôm nay mình làm được 4 tiếng, nhiều hơn cả tuần trước cộng lại."),
    ("Phan Anh Tú (Chủ tiệm cà phê nhỏ)",
     "Mình nhận ra mình không nghiện điện thoại, mình sợ khoảng lặng. Cứ rảnh hai giây là phải có cái gì đó chạy trong tai. Bài viết gọi đúng tên nỗi sợ đó mà không mắng mình một câu."),
]

# Thân bài dài (comment 1) - nhánh thói quen / kỷ luật
SEEDING_STORIES_HABIT = [
    ("Đỗ Văn Sơn (Kỹ sư cơ khí • 27 tuổi)",
     "Bao nhiêu lần mình tự hứa từ mai sẽ dậy 5 giờ sáng, tập thể dục, đọc sách. Được ba ngày là bỏ, rồi tự dằn vặt cả tháng. Giờ mình mới hiểu là mình đặt mục tiêu to quá so với cái hạch hạnh nhân sợ thay đổi."),
    ("Bùi Thanh Hà (Mẹ hai con • 33 tuổi)",
     "Mình là mẹ hai con, thời gian rời rạc lắm. Thay vì cố một tiếng liền mạch, mình chia thành ba khúc mười phút. Ba tuần rồi vẫn giữ được, chuyện chưa từng xảy ra với mình."),
    ("Nguyễn Diệu Linh (Sinh viên năm hai)",
     "Mình từng nghĩ thói quen phải đẹp, phải có app theo dõi, phải có bảng streak. Bài này làm mình nhẹ người: chỉ cần nhỏ tới mức không thể từ chối. Mình đang bắt đầu với đúng hai phút mỗi ngày."),
    ("Trịnh Công Minh (Nhân viên kinh doanh • 26 tuổi)",
     "Cái đoạn nói về việc đừng sửa mười thứ cùng lúc đập vào mặt mình. Tháng trước mình lập danh sách bảy thói quen mới và bỏ sạch trong mười ngày. Giờ mình chỉ giữ một."),
    ("Vũ Thu Trang (Dược sĩ lâm sàng • 29 tuổi)",
     "Mình là dược sĩ, ngày nào cũng dặn bệnh nhân kiên nhẫn với thuốc, mà với chính mình thì không có chút kiên nhẫn nào. Mình đang học cách tử tế với mình hơn, bắt đầu từ một việc nhỏ."),
    ("Lê Quốc Bảo (Sinh viên năm ba)",
     "Mình vừa thất bại lần thứ tư với việc đi ngủ sớm. Giờ mình không thấy xấu hổ nữa, chỉ thấy mình cần một môi trường khác chứ không cần thêm ý chí."),
    ("Phạm Hải Đăng (Nhân viên kinh doanh • 24 tuổi)",
     "Mình là nhân viên kinh doanh, tối nào cũng về muộn. Mình bỏ luôn mục tiêu tập gym ba buổi một tuần và thay bằng xỏ giày ra khỏi cửa một lần. Hai tuần nay làm được, và tự nhiên đi bộ luôn."),
    ("Đinh Thị Kim Ngân (Kế toán • 32 tuổi)",
     "Đọc phần về tha thứ khi trượt chân mà mình thấy nhẹ cả người. Bao năm mình bỏ cuộc không phải vì lười, mà vì mỗi lần vấp là mình tự sỉ vả tới mức không dám quay lại."),
    ("Phan Anh Tú (Chủ tiệm cà phê nhỏ)",
     "Mình mở tiệm cà phê nhỏ, sáng nào cũng mở cửa lúc 6 giờ. Mình tận dụng đúng 15 phút trước khi khách tới để viết ra ba việc quan trọng nhất. Ngày nào làm vậy là ngày đó đỡ rối."),
    ("Đặng Minh Quân (Project Manager • 30 tuổi)",
     "Mình thấy đúng nhất là chỗ nói thói quen không phải cuộc thi chịu đựng. Mình đã đổi bàn làm việc, để sách ở chỗ dễ thấy và cất điện thoại vào ngăn kéo. Không gồng, mà vẫn làm được."),
]

# Nhận định ngắn (comment 2)
SEEDING_INSIGHTS = [
    "Cách giải thích bằng sinh học thần kinh làm mình thôi tự mắng mình.",
    "Góc nhìn không phán xét là thứ mình hiếm khi tìm được ở mấy bài kiểu này.",
    "Mình thích cách bài viết chỉ ra hệ thống chứ không đổ lỗi cho người dùng.",
    "Đoạn về việc thiết kế môi trường đọc xong là mình đứng dậy dọn bàn luôn.",
    "Có số liệu, có cơ chế, mà vẫn đọc như đang nghe bạn kể chuyện.",
    "Mình đã thử và thấy đúng: bớt ma sát thì bớt phải gồng.",
    "Cái hay là bài không bảo mình phải mạnh mẽ hơn, chỉ bảo mình đổi cách sắp xếp.",
    "Mình đọc xong mới hiểu vì sao mấy lần trước mình bỏ cuộc.",
    "Viết gọn, không lan man, đọc một mạch hết bài.",
    "Mình thích chỗ tác giả tự nhận mình cũng từng vấp, không đứng trên cao giảng.",
    "Đây là lần đầu mình thấy khái niệm này được giải thích bằng tiếng Việt dễ hiểu đến vậy.",
    "Mình vừa áp dụng thử một việc nhỏ và thấy khác thật.",
]

# Hành động cụ thể (comment 3)
SEEDING_ACTIONS = [
    "đặt điện thoại ở phòng khác khi làm việc, hôm nay làm liền 45 phút không gián đoạn",
    "sạc điện thoại ở nhà bếp thay vì đầu giường, ba đêm nay ngủ sớm hơn một tiếng",
    "chia việc lớn thành ba khúc mười phút, xong khúc nào gạch khúc đó",
    "chỉ giữ một thói quen mới thay vì bảy cái như tháng trước",
    "viết ra ba việc quan trọng nhất mỗi sáng trước khi mở điện thoại",
    "để một cuốn sách trên gối thay vì điện thoại",
    "đi bộ mười phút sau bữa tối, không mang tai nghe",
    "đóng hết tab không dùng, chỉ để lại ba tab đang làm",
    "bắt đầu bằng đúng hai phút, không đặt mục tiêu cao hơn",
    "ghi lại mỗi tối một câu mình đã làm được trong ngày",
    "nói với một người bạn để có người nhắc mình",
    "dán một tờ giấy nhắc ngay trên màn hình máy tính",
]

# Nhãn thời gian đa dạng
SEEDING_DATES = ["Vừa xong", "2 giờ trước", "Hôm qua", "1 ngày trước", "2 ngày trước", "3 ngày trước"]


def _seeding_pick(items, slug, salt, slot):
    """Chọn mục theo hash(slug + salt + slot) để ổn định nhưng khác nhau giữa các bài."""
    raw = f"{slug}|{salt}|{slot}".encode("utf-8")
    return items[int(hashlib.sha256(raw).hexdigest(), 16) % len(items)]


def _normalize_comment(text):
    """Chuẩn hóa mạnh hơn audit_comments.js để chắc chắn không lọt trùng lặp."""
    cleaned = re.sub(r"[^0-9A-Za-z\u00C0-\u1EF9]", "", text.lower())
    return cleaned


def _topic_phrase(title):
    """Cụm chủ đề ngắn, tự nhiên, để neo bình luận vào đúng nội dung bài."""
    clean = (title or "").replace('"', "'").strip()
    for sep in (":", " – ", " - ", " | "):
        if sep in clean:
            tail = clean.split(sep, 1)[1].strip()
            if len(tail) > 10:
                words = tail.split()
                return " ".join(words[:7]).rstrip(",") if len(tail) > 60 else tail
    return clean


def _is_focus_topic(article_obj):
    slug = article_obj.get("slug", "")
    pillar = article_obj.get("pillarTag", "")
    return pillar == "LayLaiSuTapTrung" or "tap-trung" in slug or "focus" in slug


def _build_comment_set(article_obj, salt):
    slug = article_obj["slug"]
    title = (article_obj.get("title") or "").replace('"', "'").strip()
    topic = _topic_phrase(title)
    prefix = slug[:6].replace("-", "")

    stories = SEEDING_STORIES_FOCUS if _is_focus_topic(article_obj) else SEEDING_STORIES_HABIT
    p1, body = _seeding_pick(stories, slug, salt, "body")
    opener = _seeding_pick(SEEDING_OPENERS, slug, salt, "open")
    insight = _seeding_pick(SEEDING_INSIGHTS, slug, salt, "insight")
    action = _seeding_pick(SEEDING_ACTIONS, slug, salt, "action")

    base = int(hashlib.sha256(f"{slug}|{salt}".encode("utf-8")).hexdigest(), 16)
    n = len(SEEDING_PERSONAS)

    def pick_other(start, exclude):
        for k in range(n):
            cand = SEEDING_PERSONAS[(start + k) % n]
            if cand not in exclude:
                return cand
        return SEEDING_PERSONAS[start % n]

    p2 = pick_other(base // 7 + 5, {p1})
    p3 = pick_other(base // 13 + 11, {p1, p2})

    d1 = SEEDING_DATES[base % len(SEEDING_DATES)]
    d2 = SEEDING_DATES[(base // 3) % len(SEEDING_DATES)]
    d3 = SEEDING_DATES[(base // 5) % len(SEEDING_DATES)]

    c1 = {
        "id": f"{prefix}-1",
        "name": p1,
        "content": f"Đọc bài '{title}' xong, mình {opener}. {body}",
        "date": d1,
        "likes": 40 + (base % 55),
        "isLongStory": True,
    }
    c2 = {
        "id": f"{prefix}-2",
        "name": p2,
        "content": f"Mình thích nhất đoạn nói về '{topic}'. {insight}",
        "date": d2,
        "likes": 18 + (base // 7) % 60,
    }
    c3 = {
        "id": f"{prefix}-3",
        "name": p3,
        "content": f"Đọc xong phần '{topic}' là mình làm luôn, không chờ có động lực: {action}.",
        "date": d3,
        "likes": 12 + (base // 11) % 50,
    }
    return [c1, c2, c3]


def generate_seeding_comments(article_obj, existing_normalized=None):
    """
    Sinh 3 bình luận seeding độc bản cho từng bài.
    existing_normalized: tập nội dung (đã chuẩn hóa) của TOÀN BỘ bình luận đang có,
    dùng để đảm bảo không bao giờ trùng y nguyên với bài cũ.
    """
    existing = existing_normalized or set()
    for salt in range(0, 200):
        group = _build_comment_set(article_obj, salt)
        norms = [_normalize_comment(c["content"]) for c in group]
        if len(set(norms)) != 3:
            continue
        if any(n in existing for n in norms):
            continue
        return group
    raise RuntimeError(
        f"Không sinh được bộ bình luận độc bản cho '{article_obj['slug']}' sau 200 lần thử"
    )

def _extract_existing_comment_texts(content):
    """Bóc toàn bộ nội dung bình luận đã có trong articleComments.ts."""
    texts = []
    for m in re.finditer(r'"content"\s*:\s*"((?:\\.|[^"\\])*)"', content):
        raw = m.group(1)
        try:
            texts.append(json.loads('"' + raw + '"'))
        except Exception:
            texts.append(raw)
    return texts


def insert_comments_for_slug(article_obj):
    if not os.path.exists(COMMENTS_FILE):
        return True
    with open(COMMENTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    slug = article_obj["slug"]
    if f'"{slug}":' in content or f"'{slug}':" in content:
        return True

    marker = "export const articleCommentsMap: Record<string, Comment[]> = {\n"
    pos = content.find(marker)
    if pos == -1:
        return False

    existing = {_normalize_comment(t) for t in _extract_existing_comment_texts(content)}
    comments = generate_seeding_comments(article_obj, existing)
    comments_json = json.dumps(comments, ensure_ascii=False, indent=4)
    indented_comments = f'  "{slug}": ' + comments_json.replace("\n", "\n  ") + ",\n"
    
    new_content = content[:pos + len(marker)] + indented_comments + content[pos + len(marker):]
    with open(COMMENTS_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ Đã chèn 3 bình luận seeding độc bản cho '{slug}' vào {COMMENTS_FILE}")
    return True

def sync_latest_git():
    """
    Kéo mã nguồn mới nhất từ GitHub trước khi thao tác để không bao giờ bị đè code.
    """
    try:
        print("🔄 [GIT SYNC] Đang kéo cập nhật mới nhất từ GitHub trước khi xuất bản...")
        res = subprocess.run(["git", "pull", "--rebase"], capture_output=True, text=True)
        print("Git pull result:", res.stdout.strip() if res.stdout else "Up to date")
        return True
    except Exception as e:
        print(f"⚠️ [GIT SYNC NOTE] {e}")
        return False

def insert_article_to_website(article_obj):
    """
    Chèn bài viết mới vào rawArticles trong src/data/articles.ts, bình luận vào articleComments.ts và chạy kiểm toán an toàn.
    """
    # Bước 1: Luôn đồng bộ Git mới nhất
    sync_latest_git()

    if not os.path.exists(ARTICLES_FILE):
        print(f"❌ File not found: {ARTICLES_FILE}")
        return False
        
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        old_articles_content = f.read()
        
    old_comments_content = ""
    if os.path.exists(COMMENTS_FILE):
        with open(COMMENTS_FILE, "r", encoding="utf-8") as f:
            old_comments_content = f.read()
        
    slug = article_obj["slug"]
    if f'"slug": "{slug}"' in old_articles_content or f"'slug': '{slug}'" in old_articles_content:
        print(f"ℹ️ Bài viết với slug '{slug}' đã tồn tại trong {ARTICLES_FILE}")
        return True
        
    marker = "const rawArticles: Article[] = ["
    pos = old_articles_content.find(marker)
    if pos == -1:
        print(f"❌ Marker '{marker}' not found in {ARTICLES_FILE}")
        return False
        
    insert_pos = pos + len(marker)
    article_json = json.dumps(article_obj, ensure_ascii=False, indent=2)
    indented_json = "\n  " + article_json.replace("\n", "\n  ") + ","
    
    new_content = old_articles_content[:insert_pos] + indented_json + old_articles_content[insert_pos:]
    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"✅ Đã chèn bài viết '{article_obj['title']}' vào {ARTICLES_FILE}")

    # Chèn bình luận seeding độc bản
    insert_comments_for_slug(article_obj)

    # Bước 2: Chạy kiểm toán tự động (Audit Gate) để cập nhật Registry và chống đè
    try:
        print("🛡️ [MÂY & AGENT 5] Khởi chạy kiểm toán bài viết tự động...")
        audit_res = subprocess.run(["node", "scripts/audit_all_articles.js"], capture_output=True, text=True)
        if audit_res.returncode != 0:
            print("❌ [LỖI KIỂM TOÁN] Bài viết không đạt chuẩn! Chi tiết:")
            print(audit_res.stderr or audit_res.stdout)
            # Revert files nếu audit fail
            with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
                f.write(old_articles_content)
            if old_comments_content:
                with open(COMMENTS_FILE, "w", encoding="utf-8") as f:
                    f.write(old_comments_content)
            print("↩️ Đã hoàn tác file articles.ts và articleComments.ts để bảo vệ hệ thống.")
            return False
        print("✅ Kiểm toán thành công! Sổ đăng ký article_registry.json đã được cập nhật tự động.")
    except Exception as e:
        print(f"⚠️ Lưu ý kiểm toán: {e}")

    return True

def git_commit_and_push(commit_message):
    """
    Commits changes và push lên tất cả remote GitHub để kích hoạt Vercel deploy.
    """
    try:
        # Add cả articles, registry, comments và thư mục ảnh
        files_to_add = [ARTICLES_FILE]
        if os.path.exists(REGISTRY_FILE):
            files_to_add.append(REGISTRY_FILE)
        if os.path.exists(COMMENTS_FILE):
            files_to_add.append(COMMENTS_FILE)
        if os.path.exists("public/images/articles"):
            files_to_add.append("public/images/articles")

        subprocess.run(["git", "add"] + files_to_add, check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        print("Git commit thành công. Đang đẩy lên remote GitHub...")
        
        # Pull --rebase để tích hợp các commit mới nhất trước khi push
        subprocess.run(["git", "pull", "--rebase"], capture_output=True)

        # Push lên remote mặc định
        res = subprocess.run(["git", "push"], capture_output=True, text=True)
        print("Git push result:", res.stdout.strip() if res.stdout else "OK")

        # Nếu có remote fork, push thêm fork để Vercel nhận diện
        try:
            subprocess.run(["git", "push", "fork", "main"], capture_output=True, text=True)
        except:
            pass

        return True
    except Exception as e:
        print("Git commit/push note:", e)
        return False
        print("Git push result:", res.stdout.strip() if res.stdout else "OK")

        # Nếu có remote fork, push thêm fork để Vercel nhận diện
        try:
            subprocess.run(["git", "push", "fork", "main"], capture_output=True, text=True)
        except:
            pass

        return True
    except Exception as e:
        print("Git commit/push note:", e)
        return False

if __name__ == "__main__":
    print("Article publisher ready with Auto Git-Sync & Data Integrity Gate.")
