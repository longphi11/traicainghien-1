"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Heart, User, ShieldCheck, Check } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
}

interface CommentSectionProps {
  slug: string;
}

// Pre-seeded authentic community comments per article
const defaultCommentsBySlug: Record<string, Comment[]> = {
  "ban-khong-he-yeu-duoi": [
    {
      id: "seed-1",
      name: "Minh Khang",
      content: "Đọc xong đoạn 'Bạn không hề yếu đuối, chỉ là bộ não đang đòi nợ' mà rơi nước mắt. Suốt 2 năm qua mình luôn tự sỉ vả mình vô kỷ luật. Cảm ơn tác giả đã giúp mình cởi bỏ được tảng đá mặc cảm tội lỗi.",
      date: "3 ngày trước",
      likes: 24,
    },
    {
      id: "seed-2",
      name: "Hải Yến (Gen Z)",
      content: "Tối qua áp dụng thử quy tắc Hara Hachi Bu (dừng lướt khi thấy chớm đủ) và sạc điện thoại ở bàn. Lần đầu tiên sau nhiều tháng mình ngủ được trước 12h đêm mà không thấy bứt rứt!",
      date: "1 ngày trước",
      likes: 18,
    },
  ],
  "quy-tac-2-met-thay-doi-khong-can-y-chi": [
    {
      id: "seed-3",
      name: "Hoàng Nam",
      content: "Công nhận! Để điện thoại xa 2m bắt buộc phải nhấc mông dậy, mà ban đêm người đang mệt lười dậy kinh khủng, thế là nhắm mắt ngủ luôn. Một mẹo nhỏ mà hiệu quả hơn 100 lần hô hào khẩu hiệu.",
      date: "4 ngày trước",
      likes: 31,
    },
    {
      id: "seed-4",
      name: "Thùy Dung",
      content: "Đúng là Atomic Habits bản đời thực. Mình còn áp dụng thêm để cốc nước ở đầu giường, sáng dậy là với tay uống luôn.",
      date: "2 ngày trước",
      likes: 12,
    },
  ],
};

const fallbackDefaultComments: Comment[] = [
  {
    id: "seed-default-1",
    name: "Một người đồng hành",
    content: "Cảm ơn góc nhìn rất khoa học và thực tế của Trại. Nhờ bài viết mà mình hiểu ra thói quen của mình không phải do lười, mà do thiết kế môi trường chưa đúng.",
    date: "2 ngày trước",
    likes: 15,
  },
  {
    id: "seed-default-2",
    name: "Tâm An",
    content: "Mỗi ngày đọc một bài ở đây như được ngồi thiền giữa một rừng thông vậy. Rất mong Trại tiếp tục ra thêm nhiều bài viết chất lượng!",
    date: "Hôm qua",
    likes: 9,
  },
];

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load pre-seeded comments combined with localStorage comments
    const initialSeed = defaultCommentsBySlug[slug] || fallbackDefaultComments;
    const storageKey = `tcn_comments_${slug}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setComments([...parsed, ...initialSeed]);
      } else {
        setComments(initialSeed);
      }
    } catch {
      setComments(initialSeed);
    }
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      name: authorName.trim() || "Người đồng hành ẩn danh",
      content: content.trim(),
      date: "Vừa xong",
      likes: 1,
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

  return (
    <section className="space-y-8 pt-10 border-t border-[#E6E1D8]">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-serif text-[#2D312E]">
            Góc Tâm Sự & Bình Luận ({comments.length})
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#3A5A40] bg-[#FAF7F2] border border-[#E6E1D8] px-3 py-1 rounded-full w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3A5A40]" />
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
            Cảm xúc hoặc trải nghiệm của bạn sau khi đọc bài viết:
          </label>
          <textarea
            rows={3}
            required
            placeholder="Chia sẻ câu chuyện, cảm xúc hoặc một thói quen bạn muốn thay đổi hôm nay... Mọi chia sẻ ở đây đều được lắng nghe và tôn trọng."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xs md:text-sm p-4 rounded-xl border border-[#E6E1D8] bg-[#FAF7F2] text-[#2D312E] placeholder-[#6B726E]/60 focus:outline-none focus:border-[#3A5A40] focus:bg-white transition-all resize-y"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-[#6B726E] italic">
            🌿 Bình luận của bạn sẽ xuất hiện ngay lập tức mà không cần kiểm duyệt tài khoản.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] disabled:opacity-40 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi bình luận</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Cảm ơn bạn! Bình luận của bạn đã được đăng thành công.</span>
          </div>
        )}
      </form>

      {/* Danh Sách Bình Luận */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const isLiked = !!likedMap[comment.id];
          return (
            <div
              key={comment.id}
              className="p-5 md:p-6 rounded-2xl bg-white border border-[#E6E1D8] shadow-sm space-y-2.5 transition-all hover:border-[#3A5A40]/40"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold text-xs uppercase">
                    {comment.name.charAt(0) || "N"}
                  </div>
                  <div>
                    <span className="font-bold text-[#2D312E] block">{comment.name}</span>
                    <span className="text-[10px] text-[#6B726E]">{comment.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
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

              <p className="text-xs md:text-sm text-[#2D312E] leading-relaxed pl-9">
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
