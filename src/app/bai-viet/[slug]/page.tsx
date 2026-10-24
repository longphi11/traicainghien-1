import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, Heart } from "lucide-react";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
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

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-10">
      
      {/* Back button */}
      <div>
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B726E] hover:text-[#3A5A40] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài viết
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-[#E6E1D8] pb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className={`px-3 py-1 rounded-full font-semibold ${
            article.pillarTag === "ThucHanhThayDoi"
              ? "bg-[#F9EFE9] text-[#C27D53]"
              : "bg-[#EBF0EC] text-[#3A5A40]"
          }`}>
            #{article.pillarTag}
          </span>
          <span className="text-[#6B726E]">{article.pillar}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E] leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B726E] pt-2 gap-4">
          <div className="flex items-center gap-4">
            <span>Tác giả: <strong>{article.author}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>
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
              <ul key={index} className="space-y-2 list-disc list-inside bg-[#FAF7F2] p-4 rounded-2xl border border-[#E6E1D8] text-xs md:text-sm">
                {listItems.map((li, i) => (
                  <li key={i} className="text-[#2D312E]">{li}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={index} className="leading-relaxed">
              {trimmed}
            </p>
          );
        })}
      </div>

      {/* Call to action at bottom of article */}
      <div className="mt-12 p-8 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] text-center space-y-4">
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
            Làm bài trắc nghiệm (3 phút)
          </Link>
        </div>
      </div>

    </article>
  );
}
