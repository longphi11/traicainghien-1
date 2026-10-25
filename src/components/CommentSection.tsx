"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Heart, ShieldCheck, Check, ArrowLeft, ArrowRight, User } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  isLongStory?: boolean;
}

interface CommentSectionProps {
  slug: string;
}

const COMMENTS_PER_PAGE = 5;

// 10 Bình Luận Seeding chuẩn mực (khoảng 25-30% tâm sự dài sâu sắc)
const initialSeedComments: Comment[] = [
  {
    id: "seed-1",
    name: "Minh Khang (Kỹ sư IT • 32 tuổi)",
    content: "Mình năm nay 32 tuổi, làm việc trong ngành IT. Thú thật với mọi người, suốt gần 3 năm qua cuộc sống của mình là một chuỗi ngày vật vờ. Ban ngày làm việc không tập trung, tối về thì ôm khư khư điện thoại đến 2-3h sáng lướt short video và reels. Đau đớn nhất là nhiều lần con gái 4 tuổi chạy lại kéo tay bố 'bố ơi chơi với con', mình chỉ ậm ừ một tay bấm điện thoại một tay xoa đầu con cho qua chuyện. Cho đến một hôm vợ mình bật khóc bảo 'Anh ở trong ngôi nhà này nhưng tâm trí anh ở một thế giới khác'. Đọc bài viết của Trại, mình như bị tát một gáo nước lạnh vào mặt. Hóa ra mình không phải lười, mà là con người nghiện dopamine rẻ tiền trong mình đang làm tổn thương những người mình yêu thương nhất. Mình đã khóc một trận thật đã đời, rồi quyết định để điện thoại ngoài phòng khách từ tối qua. Cảm ơn Trại Cai Nghiện vì một bài viết đánh thức lương tri.",
    date: "3 ngày trước",
    likes: 42,
    isLongStory: true,
  },
  {
    id: "seed-2",
    name: "Hải Yến (Gen Z)",
    content: "Tối qua áp dụng thử quy tắc sạc điện thoại ở bàn làm việc xa giường 2m. Lần đầu tiên sau nhiều tháng mình ngủ được trước 12h đêm mà không thấy bồn chồn bứt rứt. Cảm giác sáng nay thức dậy đầu óc nhẹ bẫng thật sự rất lạ lẫm!",
    date: "2 ngày trước",
    likes: 28,
  },
  {
    id: "seed-3",
    name: "Nguyễn Trọng Đức (Cựu Marketer)",
    content: "Đã từng có thời gian mình đốt từ 8-10 tiếng mỗi ngày vào màn hình, từ check mạng xã hội đến quẹt Shopee và TikTok trong vô thức. Mình từng nghĩ mình có 'ý chí thép' nên cố gắng áp dụng Dopamine Detox cực đoan: nhịn dùng điện thoại 24h, ngồi im một chỗ... nhưng kết quả là ngay hôm sau bị 'nghiện bù' dữ dội hơn, ăn uống vô độ và lướt web đến sáng. Bây giờ đọc bài viết ở Trại mới vỡ lẽ: não bộ không thể bị ép bằng bạo lực ý chí, mà cần giảm tải nhận thức và đón nhận sự khó chịu 2 phút. Lối tư duy khoa học và thực tế như thế này thật sự hiếm có ở Việt Nam.",
    date: "4 ngày trước",
    likes: 35,
    isLongStory: true,
  },
  {
    id: "seed-4",
    name: "Thùy Dung",
    content: "Đúng là Atomic Habits bản đời thực. Mình thích nhất thông điệp 'Bạn không yếu đuối, chỉ là não bộ đang đòi nợ'. Câu nói này gỡ bỏ được tảng đá mặc cảm tội lỗi đè nặng trong lòng mình bấy lâu.",
    date: "1 ngày trước",
    likes: 19,
  },
  {
    id: "seed-5",
    name: "Lê Hoàng An (Sinh viên năm cuối)",
    content: "Đọc bài viết này lúc 1h30 sáng khi hai mắt đang cay xè và trán nóng bừng vì lướt TikTok suốt 4 tiếng đồng hồ. Cảm giác tội lỗi sau mỗi lần buông máy thật sự rất kinh khủng, tự trách mình vô dụng, hèn nhát, sắp ra trường mà không làm nên trò trống gì. Nhưng đoạn phân tích về 'Cơ chế bập bênh Dopamine và lòng trắc ẩn tự thân' đã cứu rỗi mình. Mình nhận ra nếu cứ tiếp tục tự sỉ vả thì ngày mai mình lại tiếp tục trượt chân. Đêm nay mình xin phép tha thứ cho bản thân theo tinh thần Wabi Sabi, uống một cốc nước ấm và đi ngủ. Ngày mai sẽ là một ngày mới với quy tắc 1% Kaizen. Biết ơn tác giả vô cùng!",
    date: "5 ngày trước",
    likes: 53,
    isLongStory: true,
  },
  {
    id: "seed-6",
    name: "Bác sĩ Tâm lý Trần Vũ",
    content: "Là người làm trong ngành tham vấn tâm lý, tôi đánh giá rất cao cách Trại Cai Nghiện 'dân dã hóa' các học thuyết của Anna Lembke và Gabor Maté. Ngắn gọn, chuẩn xác và không hề có định kiến đạo đức.",
    date: "3 ngày trước",
    likes: 37,
  },
  {
    id: "seed-7",
    name: "Phương Thảo",
    content: "Mình vừa bấm share bài viết này cho nhóm bạn thân. Dạo này đi cafe với nhau mà 4 đứa ngồi bấm điện thoại hết 3 đứa, chẳng ai buồn nhìn vào mắt nhau nữa. Mong bài viết này giúp tụi mình thức tỉnh.",
    date: "Hôm qua",
    likes: 24,
  },
  {
    id: "seed-8",
    name: "Quang Huy",
    content: "Phương pháp thở Box Breathing 4x4 dập tắt cơn thèm lướt web cực kỳ hiệu nghiệm! Mỗi lần ngón tay chuẩn bị bấm vào icon app là mình dừng lại thở sâu 4 nhịp, cơn thôi thúc tự nhiên dịu hẳn đi.",
    date: "2 ngày trước",
    likes: 16,
  },
  {
    id: "seed-9",
    name: "Mai Lan (Mẹ bỉm sữa)",
    content: "Cảm ơn Trại Cai Nghiện rất nhiều. Mình áp dụng thói quen dọn dẹp nhà cửa chánh niệm thay vì nằm bấm điện thoại khi con ngủ, không ngờ nhà cửa vừa ngăn nắp mà tâm trí lại bình an hơn hẳn.",
    date: "4 ngày trước",
    likes: 22,
  },
  {
    id: "seed-10",
    name: "Tâm An",
    content: "Mỗi ngày vào đọc một bài ở đây như được ngồi tĩnh lặng giữa một rừng thông vậy. Rất mong Trại tiếp tục ra thêm nhiều bài viết chất lượng để đồng hành cùng cộng đồng!",
    date: "Vừa xong",
    likes: 31,
  },
];

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialSeedComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Load persisted user comments from localStorage
    const storageKey = `tcn_comments_${slug}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setComments([...parsed, ...initialSeedComments]);
      } else {
        setComments(initialSeedComments);
      }
    } catch {
      setComments(initialSeedComments);
    }
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    const isLong = content.trim().length > 200;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      name: authorName.trim() || "Người đồng hành ẩn danh",
      content: content.trim(),
      date: "Vừa xong",
      likes: 1,
      isLongStory: isLong,
    };

    const storageKey = `tcn_comments_${slug}`;
    try {
      const saved = localStorage.getItem(storageKey);
      const userComments = saved ? JSON.parse(saved) : [];
      const updatedUserComments = [newComment, ...userComments];
      localStorage.setItem(storageKey, JSON.stringify(updatedUserComments));
    } catch (err) {
      console.error(err);
    }

    setComments((prev) => [newComment, ...prev]);
    setContent("");
    setIsSubmitting(false);
    setSubmittedMessage(true);
    setCurrentPage(1); // Jump to page 1 to see own new comment
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => {
      const current = !!prev[id];
      return { ...prev, [id]: !current };
    });

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isLiked = !likedMap[id];
          return { ...c, likes: isLiked ? c.likes + 1 : Math.max(0, c.likes - 1) };
        }
        return c;
      })
    );
  };

  // Pagination calculation: tối đa 5 bình luận 1 trang
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const currentComments = comments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  return (
    <section className="space-y-8 pt-10 border-t border-[#E6E1D8]">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold shadow-inner">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-serif text-[#2D312E]">
              Góc Tâm Sự & Bình Luận ({comments.length})
            </h3>
            <p className="text-xs text-[#6B726E]">
              Nơi mọi trăn trở đều được thấu hiểu không phán xét
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#3A5A40] bg-[#FAF7F2] border border-[#E6E1D8] px-3.5 py-1.5 rounded-full w-fit shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#3A5A40]" />
          <span>Bình luận mở • Không cần đăng nhập • Hoàn toàn ẩn danh</span>
        </span>
      </div>

      {/* Form Viết Bình Luận */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white border border-[#E6E1D8] shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3A5A40] mb-1.5">
            Tên hoặc Biệt danh của bạn (Tùy chọn)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Người đồng hành, Một Cú Đêm, An Nhiên... (để trống nếu muốn ẩn danh)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full text-xs md:text-sm px-4 py-2.5 rounded-xl border border-[#E6E1D8] bg-[#FAF7F2] text-[#2D312E] placeholder-[#6B726E]/60 focus:outline-none focus:border-[#3A5A40] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3A5A40] mb-1.5">
            Cảm xúc, câu chuyện hoặc một thói quen bạn muốn buông bỏ hôm nay:
          </label>
          <textarea
            rows={4}
            required
            placeholder="Hãy viết ra những điều bạn đang chất chứa... Mọi nỗi niềm, sự dằn vặt hay thất bại đều được đón nhận bằng sự bao dung Wabi Sabi tại Trại."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xs md:text-sm p-4 rounded-xl border border-[#E6E1D8] bg-[#FAF7F2] text-[#2D312E] placeholder-[#6B726E]/60 focus:outline-none focus:border-[#3A5A40] focus:bg-white transition-all resize-y leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-[#6B726E] italic">
            🌿 Bình luận của bạn sẽ xuất hiện ngay lập tức mà không cần tài khoản mạng xã hội.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] disabled:opacity-40 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi bình luận</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Cảm ơn bạn! Bình luận và chia sẻ của bạn đã được lưu lại thành công.</span>
          </div>
        )}
      </form>

      {/* Danh Sách Bình Luận (Hiển thị 5 bình luận 1 trang) */}
      <div className="space-y-4">
        {currentComments.map((comment) => {
          const isLiked = !!likedMap[comment.id];
          return (
            <div
              key={comment.id}
              className={`p-5 md:p-6 rounded-2xl bg-white border border-[#E6E1D8] shadow-xs space-y-3 transition-all hover:border-[#3A5A40]/40 ${
                comment.isLongStory ? "bg-gradient-to-br from-white to-[#FAF7F2]/50 border-l-4 border-l-[#3A5A40]" : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {comment.name.charAt(0) || "N"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2D312E]">{comment.name}</span>
                      {comment.isLongStory && (
                        <span className="text-[10px] font-semibold text-[#C27D53] bg-[#F9EFE9] px-2 py-0.5 rounded-full">
                          Tâm sự chân thật
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#6B726E]">{comment.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                    isLiked
                      ? "text-rose-600 bg-rose-50"
                      : "text-[#6B726E] hover:text-rose-600 hover:bg-[#FAF7F2]"
                  }`}
                  title="Thả tim đồng cảm"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                  <span className="font-medium text-[11px]">{comment.likes}</span>
                </button>
              </div>

              <p className="text-xs md:text-sm text-[#2D312E] leading-relaxed pl-10 md:pl-10 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Phân Trang Bình Luận (Tối đa 5 bình luận 1 trang để không bị quá dài) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-[#E6E1D8]">
          <span className="text-xs text-[#6B726E]">
            Hiển thị trang <strong>{currentPage}</strong> / {totalPages} (5 bình luận/trang)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[#E6E1D8] bg-white text-xs font-semibold text-[#6B726E] hover:text-[#2D312E] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Trước
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentPage === idx + 1
                    ? "bg-[#3A5A40] text-white shadow-xs"
                    : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-[#E6E1D8] bg-white text-xs font-semibold text-[#6B726E] hover:text-[#2D312E] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
            >
              Sau <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
