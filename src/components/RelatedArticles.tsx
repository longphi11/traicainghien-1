import React from "react";
import Link from "next/link";
import { articles, Article } from "@/data/articles";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

interface RelatedArticlesProps {
  currentSlug: string;
  currentTag?: string;
}

export default function RelatedArticles({ currentSlug, currentTag }: RelatedArticlesProps) {
  // Find articles that share the same tag or pillar, excluding current
  const otherArticles = articles.filter((a) => a.slug !== currentSlug);
  
  const sameTagArticles = currentTag 
    ? otherArticles.filter((a) => a.pillarTag === currentTag) 
    : [];

  const remaining = otherArticles.filter((a) => !sameTagArticles.includes(a));
  // Hiển thị 6 box bài viết liên quan theo yêu cầu của bố
  const relatedList = [...sameTagArticles, ...remaining].slice(0, 6);

  if (relatedList.length === 0) return null;

  return (
    <section className="space-y-6 pt-12 border-t border-[#E6E1D8]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#3A5A40]" />
          <h3 className="text-xl md:text-2xl font-bold font-serif text-[#2D312E]">
            Bài Viết Liên Quan Dành Cho Bạn
          </h3>
        </div>
        <Link
          href="/bai-viet"
          className="text-xs font-semibold text-[#3A5A40] hover:underline flex items-center gap-1"
        >
          <span>Xem tất cả ({articles.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedList.map((art) => (
          <article
            key={art.slug}
            className="group zen-card overflow-hidden flex flex-col bg-white border border-[#E6E1D8] rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            {/* Thumbnail - Tràn viền */}
            <Link
              href={`/bai-viet/${art.slug}`}
              className="relative h-44 w-full overflow-hidden bg-[#FAF7F2] block shadow-inner"
            >
              <img
                src={art.thumbnail}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md bg-white/90 text-[#3A5A40] shadow-sm">
                #{art.pillarTag}
              </span>
              <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md bg-black/60 text-white shadow-sm flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> {art.readTime}
              </span>
            </Link>

            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <div className="text-[10px] font-semibold text-[#6B726E] uppercase mb-1">
                {art.date}
              </div>

              <h4 className="text-sm sm:text-base font-bold font-serif text-[#2D312E] mb-2 leading-snug line-clamp-2 group-hover:text-[#3A5A40] transition-colors flex-1">
                <Link href={`/bai-viet/${art.slug}`}>
                  {art.title}
                </Link>
              </h4>

              <p className="text-[11px] sm:text-xs text-[#6B726E] leading-relaxed line-clamp-2 mb-3">
                “{art.excerpt}”
              </p>

              <div className="pt-2.5 border-t border-[#E6E1D8]/80 flex items-center justify-between text-xs font-semibold text-[#3A5A40]">
                <Link href={`/bai-viet/${art.slug}`} className="flex items-center gap-1 hover:underline text-xs font-bold">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-[11px] text-[#6B726E] font-normal">{art.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
