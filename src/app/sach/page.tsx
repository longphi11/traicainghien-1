import React from "react";
import Link from "next/link";
import { books } from "@/data/books";
import { BookOpen, ExternalLink, CheckCircle2, Bookmark, Heart } from "lucide-react";

export const metadata = {
  title: "Tủ Sách Chắt Lọc — 14 Cuốn Sách Kinh Điển",
  description: "Đúc kết thực chiến từ các cuốn sách kinh điển về sinh học thần kinh, thói quen và lẽ sống tại Trại Cai Nghiện.",
};

export default function SachPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
          Tủ Sách Tri Thức
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E]">
          Những Cuốn Sách Thay Đổi Nhận Thức
        </h1>
        <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
          Chúng tôi không review theo kiểu học thuật xa cách. Đây là những đúc kết thật từ những cuốn sách đã giúp chúng tôi hiểu ra bản chất của thói quen và cách lấy lại sự chủ động.
        </p>
      </div>

      {/* Tôn chỉ chọn sách */}
      <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] text-xs md:text-sm text-[#6B726E] flex items-center gap-3 max-w-3xl mx-auto">
        <Heart className="w-5 h-5 text-[#C27D53] shrink-0" />
        <span>
          <strong>Lời hứa minh bạch:</strong> Tất cả sách ở đây đều là sách chúng tôi đã đọc và ứng dụng thật sự. Các đường link mua sách là link liên kết (affiliate) mua tại các nhà phát hành uy tín tại Việt Nam (Tiki, Fahasa) để ủng hộ tác giả sách giấy gốc.
        </span>
      </div>

      {/* Grid Books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="zen-card p-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full font-semibold bg-[#EBF0EC] text-[#3A5A40]">
                  {book.categoryLabel}
                </span>
                <span className="text-[#6B726E] text-[11px] font-medium">{book.badge}</span>
              </div>

              <div>
                <h2 className="text-xl font-bold font-serif text-[#2D312E] leading-snug">
                  {book.title}
                </h2>
                <span className="text-xs text-[#6B726E] block mt-1">Tác giả: {book.author}</span>
              </div>

              <p className="text-xs text-[#2D312E] leading-relaxed italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E6E1D8]">
                "{book.oneLiner}"
              </p>

              {/* 3 Core Lessons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#3A5A40] uppercase tracking-wide block">
                  3 Bài học đắt giá nhất:
                </span>
                <ul className="space-y-2 text-xs text-[#6B726E]">
                  {book.coreLessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#3A5A40] font-bold">✓</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Affiliate link */}
            <div className="pt-4 border-t border-[#E6E1D8]">
              <a
                href={book.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#3A5A40] border border-[#3A5A40] hover:bg-[#3A5A40] hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Tìm mua sách giấy gốc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
