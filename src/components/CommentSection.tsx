"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Heart, ShieldCheck, Check, ArrowLeft, ArrowRight, User } from "lucide-react";
import { getCommentsForArticle, Comment } from "@/data/articleComments";

interface CommentSectionProps {
  slug: string;
  pillarTag?: string;
}

const COMMENTS_PER_PAGE = 5;

export default function CommentSection({ slug, pillarTag }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Load persisted user comments from localStorage
    const storageKey = `tcn_comments_${slug}`;
    const baseSeed = getCommentsForArticle(slug, pillarTag);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setComments([...parsed, ...baseSeed]);
      } else {
        setComments(baseSeed);
      }
    } catch {
      setComments(baseSeed);
    }
  }, [slug, pillarTag]);

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
    <section className="space-y-8 pt-10 border-t border-[#E6E1D8] dark:border-[#2E3531]">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#EBF0EC] dark:bg-[#252B27] text-[#3A5A40] dark:text-[#8FC99D] flex items-center justify-center font-bold shadow-inner">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-serif text-[#2D312E] dark:text-[#F0ECE6]">
              Góc Tâm Sự & Bình Luận ({comments.length})
            </h3>
            <p className="text-xs text-[#6B726E] dark:text-[#9DA39F]">
              Nơi mọi trăn trở đều được thấu hiểu không phán xét
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#3A5A40] dark:text-[#8FC99D] bg-[#FAF7F2] dark:bg-[#1D221F] border border-[#E6E1D8] dark:border-[#2E3531] px-3.5 py-1.5 rounded-full w-fit shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#3A5A40] dark:text-[#8FC99D]" />
          <span>Bình luận mở • Không cần đăng nhập • Hoàn toàn ẩn danh</span>
        </span>
      </div>

      {/* Form Viết Bình Luận */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1D221F] border border-[#E6E1D8] dark:border-[#2E3531] shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3A5A40] dark:text-[#8FC99D] mb-1.5">
            Tên hoặc Biệt danh của bạn (Tùy chọn)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Người đồng hành, Một Cú Đêm, An Nhiên... (để trống nếu muốn ẩn danh)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full text-xs md:text-sm px-4 py-2.5 rounded-xl border border-[#E6E1D8] dark:border-[#2E3531] bg-[#FAF7F2] dark:bg-[#151916] text-[#2D312E] dark:text-[#F0ECE6] placeholder-[#6B726E]/60 dark:placeholder-[#9DA39F]/60 focus:outline-none focus:border-[#3A5A40] dark:focus:border-[#8FC99D] focus:bg-white dark:focus:bg-[#1D221F] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3A5A40] dark:text-[#8FC99D] mb-1.5">
            Cảm xúc, câu chuyện hoặc một thói quen bạn muốn buông bỏ hôm nay:
          </label>
          <textarea
            rows={4}
            required
            placeholder="Hãy viết ra những điều bạn đang chất chứa... Mọi nỗi niềm, sự dằn vặt hay thất bại đều được đón nhận bằng sự bao dung Wabi Sabi tại Trại."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xs md:text-sm p-4 rounded-xl border border-[#E6E1D8] dark:border-[#2E3531] bg-[#FAF7F2] dark:bg-[#151916] text-[#2D312E] dark:text-[#F0ECE6] placeholder-[#6B726E]/60 dark:placeholder-[#9DA39F]/60 focus:outline-none focus:border-[#3A5A40] dark:focus:border-[#8FC99D] focus:bg-white dark:focus:bg-[#1D221F] transition-all resize-y leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-[#6B726E] dark:text-[#9DA39F] italic">
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
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
              className={`p-5 md:p-6 rounded-2xl bg-white dark:bg-[#1D221F] border border-[#E6E1D8] dark:border-[#2E3531] shadow-xs space-y-3 transition-all hover:border-[#3A5A40]/40 dark:hover:border-[#8FC99D]/40 ${
                comment.isLongStory ? "bg-gradient-to-br from-white to-[#FAF7F2]/50 dark:from-[#1D221F] dark:to-[#252B27]/50 border-l-4 border-l-[#3A5A40] dark:border-l-[#8FC99D]" : ""
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EBF0EC] dark:bg-[#252B27] text-[#3A5A40] dark:text-[#8FC99D] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {comment.name.charAt(0) || "N"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2D312E] dark:text-[#F0ECE6]">{comment.name}</span>
                      {comment.isLongStory && (
                        <span className="text-[10px] font-semibold text-[#C27D53] dark:text-[#E89E73] bg-[#F9EFE9] dark:bg-[#3D281D] px-2 py-0.5 rounded-full">
                          Tâm sự chân thật
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#6B726E] dark:text-[#9DA39F]">{comment.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                    isLiked
                      ? "text-rose-600 bg-rose-50 dark:bg-rose-950/40"
                      : "text-[#6B726E] dark:text-[#9DA39F] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-[#FAF7F2] dark:hover:bg-[#252B27]"
                  }`}
                  title="Thả tim đồng cảm"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                  <span className="font-medium text-[11px]">{comment.likes}</span>
                </button>
              </div>

              <p className="text-xs md:text-sm text-[#2D312E] dark:text-[#E6E4DF] leading-relaxed pl-10 md:pl-10 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Phân Trang Bình Luận (Tối đa 5 bình luận 1 trang để không bị quá dài) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-[#E6E1D8] dark:border-[#2E3531]">
          <span className="text-xs text-[#6B726E] dark:text-[#9DA39F]">
            Hiển thị trang <strong>{currentPage}</strong> / {totalPages} (5 bình luận/trang)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[#E6E1D8] dark:border-[#2E3531] bg-white dark:bg-[#1D221F] text-xs font-semibold text-[#6B726E] dark:text-[#9DA39F] hover:text-[#2D312E] dark:hover:text-[#F0ECE6] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
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
                    : "bg-white dark:bg-[#1D221F] border border-[#E6E1D8] dark:border-[#2E3531] text-[#6B726E] dark:text-[#9DA39F] hover:text-[#2D312E] dark:hover:text-[#F0ECE6]"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-[#E6E1D8] dark:border-[#2E3531] bg-white dark:bg-[#1D221F] text-xs font-semibold text-[#6B726E] dark:text-[#9DA39F] hover:text-[#2D312E] dark:hover:text-[#F0ECE6] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
            >
              Sau <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
