import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import CommentSection from "@/components/CommentSection";
import RelatedArticles from "@/components/RelatedArticles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Bài viết không tồn tại — Trại Cai Nghiện",
    };
  }

  const title = `${article.title} — Trại Cai Nghiện`;
  const description = article.excerpt;
  const url = `https://www.traicainghien.com/bai-viet/${article.slug}`;

  const ogImageUrl = article.thumbnail.startsWith("http")
    ? article.thumbnail
    : `https://www.traicainghien.com${article.thumbnail}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Trại Cai Nghiện",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// 1. Parser inline Markdown: [text](url), **bold**, *italic*
function renderFormattedText(text: string) {
  if (!text) return null;

  const tokens: React.ReactNode[] = [];
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*[^*\n]+?\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      tokens.push(text.slice(lastIdx, match.index));
    }
    const m = match[0];

    // Markdown Link: [text](url)
    if (m.startsWith("[") && m.includes("](")) {
      const matchLink = m.match(/\[(.*?)\]\((.*?)\)/);
      if (matchLink) {
        tokens.push(
          <Link
            key={`link-${match.index}`}
            href={matchLink[2]}
            className="text-[#3A5A40] font-semibold underline decoration-[#3A5A40]/40 underline-offset-4 hover:decoration-[#3A5A40] hover:text-[#283f2c] transition-all"
          >
            {matchLink[1]}
          </Link>
        );
      }
    }
    // Bold text: **text**
    else if (m.startsWith("**") && m.endsWith("**")) {
      tokens.push(
        <strong key={`bold-${match.index}`} className="font-bold text-[#1F2421]">
          {m.slice(2, -2)}
        </strong>
      );
    }
    // Italic text: *text*
    else if (m.startsWith("*") && m.endsWith("*")) {
      tokens.push(
        <em key={`italic-${match.index}`} className="italic text-[#4A5568]">
          {m.slice(1, -1)}
        </em>
      );
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    tokens.push(text.slice(lastIdx));
  }

  return tokens.length > 0 ? tokens : text;
}

// 2. Parser Block Markdown chuyên sâu: tách biệt hoàn toàn Headings, Lists, Paragraphs, Quotes
type Block =
  | { type: "key_takeaways"; title: string; items: string[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "image"; alt: string; src: string }
  | { type: "hr" }
  | { type: "blockquote"; text: string }
  | { type: "numbered_list"; items: string[] }
  | { type: "bullet_list"; items: string[] }
  | { type: "paragraph"; text: string };

function parseMarkdownBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // A. Khối NHỮNG ĐIỂM CHÍNH
    if (line.includes("NHỮNG ĐIỂM CHÍNH")) {
      const title = line.replace(/^[#\s*]+/, "").replace(/[:*]+$/, "").trim();
      const items: string[] = [];
      i++;
      while (i < lines.length) {
        const itemLine = lines[i].trim();
        if (!itemLine) {
          i++;
          continue;
        }
        if (itemLine.startsWith("---") || itemLine.startsWith("##") || itemLine.startsWith("###")) {
          break;
        }
        if (itemLine.startsWith("*") || itemLine.startsWith("-") || /^\d+\./.test(itemLine)) {
          items.push(itemLine.replace(/^[*-\d.]\s*/, "").trim());
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "key_takeaways", title: title || "NHỮNG ĐIỂM CHÍNH", items });
      continue;
    }

    // B. Đường phân cách ngang
    if (line.startsWith("---")) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // B2. Hình ảnh Markdown: ![alt](url)
    if (/^!\[(.*?)\]\((.*?)\)$/.test(line)) {
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        blocks.push({
          type: "image",
          alt: imgMatch[1],
          src: imgMatch[2],
        });
        i++;
        continue;
      }
    }

    // C. Tiêu đề H2
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.replace("## ", "").trim() });
      i++;
      continue;
    }

    // D1. Tiêu đề H4 (Kiểm tra trước H3 để không bị khớp nhầm)
    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", text: line.replace("#### ", "").trim() });
      i++;
      continue;
    }

    // D2. Tiêu đề H3
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.replace("### ", "").trim() });
      i++;
      continue;
    }

    // E. Trích dẫn khối (Blockquote)
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // F. Danh sách có số thứ tự (Numbered List)
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length) {
        const currLine = lines[i].trim();
        if (/^\d+\.\s/.test(currLine)) {
          items.push(currLine.replace(/^\d+\.\s*/, "").trim());
          i++;
        } else if (
          currLine &&
          !currLine.startsWith("#") &&
          !currLine.startsWith("-") &&
          !currLine.startsWith("*") &&
          !currLine.startsWith("---")
        ) {
          // Dòng văn bản nối tiếp của mục trước
          if (items.length > 0) {
            items[items.length - 1] += " " + currLine;
          }
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "numbered_list", items });
      continue;
    }

    // G. Danh sách đầu dòng (Bullet List)
    if (line.startsWith("* ") || line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const currLine = lines[i].trim();
        if (currLine.startsWith("* ") || currLine.startsWith("- ")) {
          items.push(currLine.replace(/^[*-\s]+/, "").trim());
          i++;
        } else if (
          currLine &&
          !currLine.startsWith("#") &&
          !/^\d+\./.test(currLine) &&
          !currLine.startsWith("---")
        ) {
          if (items.length > 0) {
            items[items.length - 1] += " " + currLine;
          }
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "bullet_list", items });
      continue;
    }

    // H. Đoạn văn thường (Paragraph)
    const pLines: string[] = [line];
    i++;
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (!nextLine) {
        i++;
        break;
      }
      if (
        nextLine.startsWith("#") ||
        nextLine.startsWith("---") ||
        nextLine.startsWith("> ") ||
        nextLine.startsWith("* ") ||
        nextLine.startsWith("- ") ||
        nextLine.startsWith("![") ||
        /^\d+\.\s/.test(nextLine) ||
        nextLine.includes("NHỮNG ĐIỂM CHÍNH")
      ) {
        break;
      }
      pLines.push(nextLine);
      i++;
    }
    blocks.push({ type: "paragraph", text: pLines.join(" ") });
  }

  return blocks;
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
    const cleanTag = tag.replace("#", "");
    switch (cleanTag) {
      case "HieuHanhVi":
        return "bg-[#EBF0EC] text-[#3A5A40] border-[#3A5A40]/20";
      case "XayDungThoiQuen":
        return "bg-[#F9EFE9] text-[#C27D53] border-[#C27D53]/20";
      case "LayLaiSuTapTrung":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "TrietHocCuocSong":
        return "bg-stone-100 text-stone-800 border-stone-300";
      case "QuanTriCamXuc":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "HieuUngTamLy":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "SachHay":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-[#FAF7F2] text-[#6B726E] border-[#E6E1D8]";
    }
  };

  const allBlocks = parseMarkdownBlocks(article.content);
  // Tách riêng khối "NHỮNG ĐIỂM CHÍNH" để đặt xuống phía dưới cùng, sau "Lời nhắn gửi từ Trại Cai Nghiện"
  const takeawaysBlocks = allBlocks.filter((b) => b.type === "key_takeaways");
  const mainBlocks = allBlocks.filter((b) => b.type !== "key_takeaways");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.thumbnail],
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Trại Cai Nghiện",
      url: "https://www.traicainghien.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Trại Cai Nghiện",
      url: "https://www.traicainghien.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.traicainghien.com/bai-viet/${article.slug}`,
    },
  };

  return (
    <article className="max-w-3xl md:max-w-4xl lg:max-w-[920px] xl:max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10 md:py-16 space-y-10 animate-fadeIn">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E6E1D8]/60">
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

      {/* Featured Thumbnail Cover */}
      <div className="relative w-full h-64 sm:h-80 md:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-sm border border-[#E6E1D8] bg-[#FAF7F2]">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-[#E6E1D8] pb-8">
        
        {/* Tags & Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTagColor(article.pillarTag)}`}>
              #{article.pillarTag}
            </span>
            {article.tags?.filter((t) => t !== `#${article.pillarTag}`).map((t) => (
              <span
                key={t}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${getTagColor(t)}`}
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
            <span className="font-medium text-[#2D312E]">Trại Cai Nghiện</span>
          </div>
        </div>

        {/* Tiêu đề chính - Cân chỉnh khoảng cách dòng thoáng đãng, dễ nhìn, không díu chữ */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold font-serif text-[#2D312E] leading-[1.45] sm:leading-[1.48] md:leading-[1.5] tracking-normal mb-5">
          {article.title}
        </h1>

        {/* Châm ngôn trích dẫn cốt lõi */}
        {article.excerpt && (
          <div className="pt-3">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#3A5A40] flex items-start gap-3.5 shadow-xs">
              <span className="text-3xl sm:text-4xl text-[#3A5A40] font-serif leading-none shrink-0 select-none">
                ❝
              </span>
              <p className="text-[16px] sm:text-lg font-serif font-bold text-[#2D312E] leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Article Body - Trình bày thoáng đãng, chuẩn mực xuất bản */}
      <div className="article-content text-[#2D312E]/90">
        {mainBlocks.map((block, idx) => {
          switch (block.type) {
            case "h2":
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-bold font-serif text-[#2D312E] mt-12 mb-5 pt-8 border-t border-[#E6E1D8]/70 leading-snug"
                >
                  {block.text}
                </h2>
              );

            case "h3":
              return (
                <h3
                  key={idx}
                  className="text-xl sm:text-2xl font-bold font-serif text-[#3A5A40] mt-8 mb-4 leading-snug"
                >
                  {block.text}
                </h3>
              );

            case "h4":
              return (
                <h4
                  key={idx}
                  className="text-lg sm:text-xl font-bold font-serif text-[#2D312E] mt-6 mb-3 leading-snug"
                >
                  {renderFormattedText(block.text)}
                </h4>
              );

            case "hr":
              return <hr key={idx} className="border-[#E6E1D8] my-10" />;

            case "image":
              return (
                <figure key={idx} className="my-10 space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-[#E6E1D8] shadow-sm bg-[#FAF7F2]">
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="w-full h-auto object-cover max-h-[540px]"
                      loading="lazy"
                    />
                  </div>
                  {block.alt && (
                    <figcaption className="text-center text-xs sm:text-sm text-[#6B726E] italic font-serif">
                      {block.alt}
                    </figcaption>
                  )}
                </figure>
              );

            case "blockquote":
              return (
                <blockquote
                  key={idx}
                  className="my-8 pl-6 pr-6 py-5 border-l-4 border-[#C27D53] bg-[#F9EFE9]/40 rounded-r-2xl italic font-serif text-lg md:text-xl text-[#2D312E] leading-relaxed"
                >
                  {renderFormattedText(block.text)}
                </blockquote>
              );

            case "numbered_list":
              return (
                <div key={idx} className="space-y-4 my-8">
                  {block.items.map((item, nIdx) => (
                    <div
                      key={nIdx}
                      className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] shadow-xs hover:border-[#3A5A40]/40 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#3A5A40] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs mt-0.5">
                        {nIdx + 1}
                      </span>
                      <div className="flex-1 text-[16px] sm:text-[17px] text-[#2D312E] leading-[1.85]">
                        {renderFormattedText(item)}
                      </div>
                    </div>
                  ))}
                </div>
              );

            case "bullet_list":
              return (
                <ul key={idx} className="space-y-3.5 my-6 pl-2">
                  {block.items.map((item, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-[16px] sm:text-[17px] text-[#2D312E]/90 leading-[1.85]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#3A5A40] mt-2.5 shrink-0" />
                      <span className="flex-1">{renderFormattedText(item)}</span>
                    </li>
                  ))}
                </ul>
              );

            case "paragraph":
            default:
              return (
                <p
                  key={idx}
                  className="mb-6 text-[17px] sm:text-[18px] text-[#2D312E]/90 leading-[1.85] md:leading-[1.9] font-normal tracking-[0.01em]"
                >
                  {renderFormattedText(block.text)}
                </p>
              );
          }
        })}

        {/* Khối NHỮNG ĐIỂM CHÍNH - Đặt ở cuối bài viết, sau 'Lời nhắn gửi từ Trại Cai Nghiện' */}
        {takeawaysBlocks.map((block, idx) => (
          <div
            key={`takeaways-${idx}`}
            className="mt-14 mb-8 p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#3A5A40]/30 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3A5A40]">
              <CheckCircle2 className="w-5 h-5 text-[#3A5A40]" />
              <span>{block.title || "NHỮNG ĐIỂM CHÍNH (ĐÚC KẾT BÀI HỌC)"}</span>
            </div>
            <ul className="space-y-3.5 pt-1">
              {block.items.map((item, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-[#2D312E] leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#3A5A40] mt-2.5 shrink-0" />
                  <span className="flex-1 font-medium">{renderFormattedText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Share Buttons */}
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

      {/* Comments Section */}
      <CommentSection slug={article.slug} />

    </article>
  );
}
