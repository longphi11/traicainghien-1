import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, Sparkles, Quote, CheckCircle2 } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import CommentSection from "@/components/CommentSection";
import RelatedArticles from "@/components/RelatedArticles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Function to parse inline Markdown links [text](url), **bold**, and *italic*
function renderFormattedText(text: string) {
  // Regex to split on [text](url) or **bold**
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    // Markdown Link
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, linkText, linkUrl] = match;
        return (
          <Link
            key={i}
            href={linkUrl}
            className="text-[#3A5A40] font-bold underline decoration-[#3A5A40]/40 underline-offset-4 hover:decoration-[#3A5A40] hover:text-[#283f2c] transition-all"
          >
            {linkText}
          </Link>
        );
      }
    }

    // Bold text
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-[#2D312E]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HieuHanhVi":
        return "bg-[#EBF0EC] text-[#3A5A40] border-[#3A5A40]/20";
      case "XayDungThoiQuen":
        return "bg-[#F9EFE9] text-[#C27D53] border-[#C27D53]/20";
      case "LayLaiSuTapTrung":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "SachHay":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "CongCuHoTro":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-[#FAF7F2] text-[#6B726E] border-[#E6E1D8]";
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10 animate-fadeIn">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E6E1D8]/60">
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-1.5 font-semibold text-[#6B726E] hover:text-[#3A5A40] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài viết
        </Link>

        <span className="text-[#6B726E] hidden sm:inline-block font-medium">
          Trại Cai Nghiện / Kho Bài Viết
        </span>
      </div>

      {/* Featured Thumbnail Cover (Theo chuẩn ảnh mẫu) */}
      <div className="relative w-full h-64 sm:h-80 md:h-[460px] rounded-3xl overflow-hidden shadow-sm border border-[#E6E1D8] bg-[#FAF7F2]">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-[#E6E1D8] pb-8">
        
        {/* Tags & Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTagColor(article.pillarTag)}`}>
              #{article.pillarTag}
            </span>
            {article.tags?.filter(t => t !== `#${article.pillarTag}`).map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF7F2] text-[#6B726E] border border-[#E6E1D8]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[#6B726E] text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#3A5A40]" /> {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#3A5A40]" /> {article.readTime}
            </span>
            <span>•</span>
            <span className="font-medium text-[#2D312E]">Tác giả: Trại Cai Nghiện</span>
          </div>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif text-[#2D312E] leading-tight md:leading-snug">
          {article.title}
        </h1>

        {/* Châm ngôn trích dẫn cốt lõi (Theo chuẩn ảnh mẫu tham khảo) */}
        {article.excerpt && (
          <div className="pt-4">
            <div className="p-6 md:p-7 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#3A5A40] flex items-start gap-4 shadow-xs">
              <span className="text-3xl sm:text-4xl text-[#3A5A40] font-serif leading-none shrink-0 select-none">
                ❝
              </span>
              <p className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#2D312E] leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Article Body - Rendered cleanly and professionally */}
      <div className="space-y-6 text-[#2D312E] text-base md:text-[17px] leading-relaxed md:leading-loose">
        {article.content.split("\n\n").map((paragraph, index) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;

          // H2 Heading
          if (trimmed.startsWith("## ")) {
            return (
              <h2 key={index} className="text-2xl sm:text-3xl font-bold font-serif text-[#2D312E] pt-8 pb-3 border-b border-[#E6E1D8] mt-8">
                {trimmed.replace("## ", "")}
              </h2>
            );
          }

          // Key Takeaways section (NHỮNG ĐIỂM CHÍNH - Theo chuẩn ảnh mẫu)
          if (trimmed.includes("NHỮNG ĐIỂM CHÍNH")) {
            const lines = trimmed.split("\n");
            const titleLine = lines[0].replace(/#+\s*/, "");
            const bulletLines = lines.slice(1).filter((l) => l.trim().length > 0);

            return (
              <div key={index} className="my-8 p-6 md:p-8 rounded-3xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#3A5A40]">
                  <CheckCircle2 className="w-5 h-5 text-[#3A5A40]" />
                  <span>{titleLine}</span>
                </div>
                <ul className="space-y-3">
                  {bulletLines.map((b, bIdx) => {
                    const cleanText = b.replace(/^[\*\-\•]\s*/, "");
                    return (
                      <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-[#2D312E]">
                        <span className="w-2 h-2 rounded-full bg-[#3A5A40] mt-2.5 shrink-0" />
                        <span className="leading-relaxed">{renderFormattedText(cleanText)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }

          // H3 Heading
          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={index} className="text-xl sm:text-2xl font-bold font-serif text-[#3A5A40] pt-6 pb-2 mt-6">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }

          // Divider
          if (trimmed.startsWith("---")) {
            return <hr key={index} className="border-[#E6E1D8] my-8" />;
          }

          // Blockquote (> Quote)
          if (trimmed.startsWith("> ")) {
            const quoteContent = trimmed.replace(/^>\s*/, "");
            return (
              <blockquote key={index} className="my-6 pl-5 border-l-4 border-[#C27D53] italic text-base md:text-lg text-[#4A5568] bg-[#F9EFE9]/40 p-4 rounded-r-2xl">
                {renderFormattedText(quoteContent)}
              </blockquote>
            );
          }

          // List Items (* or -)
          if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            const listItems = trimmed.split("\n").map((item) => item.replace(/^[\*\-]\s*/, ""));
            return (
              <ul key={index} className="space-y-2.5 list-disc list-outside pl-6 my-4 text-sm md:text-base">
                {listItems.map((li, i) => (
                  <li key={i} className="text-[#2D312E] leading-relaxed">
                    {renderFormattedText(li)}
                  </li>
                ))}
              </ul>
            );
          }

          // Numbered list
          if (/^\d+\.\s/.test(trimmed)) {
            const listItems = trimmed.split("\n");
            return (
              <ol key={index} className="space-y-2.5 list-decimal list-outside pl-6 my-4 text-sm md:text-base">
                {listItems.map((li, i) => {
                  const cleanLi = li.replace(/^\d+\.\s*/, "");
                  return (
                    <li key={i} className="text-[#2D312E] leading-relaxed">
                      {renderFormattedText(cleanLi)}
                    </li>
                  );
                })}
              </ol>
            );
          }

          // Regular Paragraph
          return (
            <p key={index} className="leading-relaxed md:leading-loose text-[#2D312E]">
              {renderFormattedText(trimmed)}
            </p>
          );
        })}
      </div>

      {/* Share Buttons (To và in đậm tạo động lực thức tỉnh) */}
      <ShareButtons title={article.title} slug={article.slug} />

      {/* Call to action at bottom of article */}
      <div className="my-10 p-8 md:p-10 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] text-center space-y-4 shadow-sm">
        <Sparkles className="w-7 h-7 text-[#3A5A40] mx-auto" />
        <h3 className="text-xl md:text-2xl font-bold font-serif text-[#2D312E]">
          Bạn muốn biết mức độ kiệt quệ dopamine của mình?
        </h3>
        <p className="text-xs md:text-sm text-[#6B726E] max-w-lg mx-auto leading-relaxed">
          Thực hiện bài trắc nghiệm 25 câu hỏi để nhận diện các trigger tiềm ẩn và nhận ngay 1 bài tập Kaizen vi mô phù hợp nhất cho ngày hôm nay.
        </p>
        <div className="pt-2">
          <Link
            href="/trac-nghiem"
            className="inline-block px-8 py-3.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all shadow-md hover:scale-105"
          >
            Làm bài trắc nghiệm 25 câu (3 phút)
          </Link>
        </div>
      </div>

      {/* Related Articles (6 boxes) */}
      <RelatedArticles currentSlug={article.slug} currentTag={article.pillarTag} />

      {/* Comments Section (10 Seeding comments, 5 comments per page, long confessions) */}
      <CommentSection slug={article.slug} />

    </article>
  );
}
