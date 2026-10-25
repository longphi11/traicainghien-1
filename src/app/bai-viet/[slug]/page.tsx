import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, Sparkles, Tag } from "lucide-react";
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
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-10">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs">
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-1.5 font-semibold text-[#6B726E] hover:text-[#3A5A40] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài viết
        </Link>

        <span className="text-[#6B726E] hidden sm:inline-block">
          Trại Cai Nghiện / Kho Bài Viết
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-5 border-b border-[#E6E1D8] pb-8">
        
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTagColor(article.pillarTag)}`}>
            #{article.pillarTag}
          </span>
          {article.tags?.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF7F2] text-[#6B726E] border border-[#E6E1D8]"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B726E] pt-2 gap-4">
          <div className="flex items-center gap-4">
            <span>Tác giả: <strong>Trại Cai Nghiện</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Thumbnail Cover */}
      <div className="space-y-2">
        <div className="relative w-full h-64 sm:h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-sm border border-[#E6E1D8] bg-[#FAF7F2]">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg max-w-none text-[#2D312E] leading-relaxed space-y-6 text-sm md:text-base">
        {article.content.split("\n\n").map((paragraph, index) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={index} className="text-xl md:text-2xl font-bold font-serif text-[#2D312E] pt-6 pb-2 border-b border-[#E6E1D8]">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }

          if (trimmed.startsWith("---")) {
            return <hr key={index} className="border-[#E6E1D8] my-8" />;
          }

          if (trimmed.startsWith("* ")) {
            const listItems = trimmed.split("\n").map((item) => item.replace("* ", ""));
            return (
              <ul key={index} className="space-y-2.5 list-disc list-inside bg-[#FAF7F2] p-5 rounded-2xl border border-[#E6E1D8] text-xs md:text-sm">
                {listItems.map((li, i) => (
                  <li key={i} className="text-[#2D312E] leading-relaxed">
                    {renderFormattedText(li)}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={index} className="leading-relaxed">
              {renderFormattedText(trimmed)}
            </p>
          );
        })}
      </div>

      {/* Share Buttons */}
      <ShareButtons title={article.title} slug={article.slug} />

      {/* Call to action at bottom of article */}
      <div className="mt-8 p-8 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] text-center space-y-4">
        <Sparkles className="w-6 h-6 text-[#3A5A40] mx-auto" />
        <h3 className="text-xl font-bold font-serif text-[#2D312E]">
          Bạn muốn biết mức độ kiệt quệ dopamine của mình?
        </h3>
        <p className="text-xs md:text-sm text-[#6B726E] max-w-md mx-auto">
          Làm bài trắc nghiệm 25 câu hỏi để nhận diện mức độ phụ thuộc và nhận ngay 1 bài tập Kaizen vi mô cho ngày hôm nay.
        </p>
        <div>
          <Link
            href="/trac-nghiem"
            className="inline-block px-7 py-3.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all shadow-sm"
          >
            Làm bài trắc nghiệm 25 câu (3 phút)
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles currentSlug={article.slug} currentTag={article.pillarTag} />

      {/* Comments Section (No login required) */}
      <CommentSection slug={article.slug} />

    </article>
  );
}
