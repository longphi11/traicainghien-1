"use client";

import React, { useState } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";

export default function BaiVietPage() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filteredArticles = activeTab === "ALL" 
    ? articles 
    : articles.filter((a) => a.pillarTag === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
          Kho Tàng Tri Thức
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E]">
          Bài Viết Tâm Lý Hành Vi
        </h1>
        <p className="text-sm md:text-base text-[#6B726E]">
          Đúc kết khoa học thần kinh và kinh nghiệm thực chiến từ người thường dành cho người thường. Không giáo điều, không phán xét.
        </p>
      </div>

      {/* Tabs Filter theo 3 Trục Giá Trị Cốt Lõi */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === "ALL"
              ? "bg-[#3A5A40] text-white shadow-sm"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
          }`}
        >
          Tất Cả ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab("HieuHanhVi")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === "HieuHanhVi"
              ? "bg-[#3A5A40] text-white shadow-sm"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
          }`}
        >
          🧠 #HieuHanhVi
        </button>
        <button
          onClick={() => setActiveTab("ThucHanhThayDoi")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === "ThucHanhThayDoi"
              ? "bg-[#C27D53] text-white shadow-sm"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
          }`}
        >
          🛠️ #ThucHanhThayDoi
        </button>
        <button
          onClick={() => setActiveTab("SongCoChuDich")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === "SongCoChuDich"
              ? "bg-[#3A5A40] text-white shadow-sm"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
          }`}
        >
          🌅 #SongCoChuDich
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article key={article.slug} className="zen-card overflow-hidden flex flex-col p-6">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className={`px-2.5 py-1 rounded-full font-semibold ${
                article.pillarTag === "ThucHanhThayDoi"
                  ? "bg-[#F9EFE9] text-[#C27D53]"
                  : "bg-[#EBF0EC] text-[#3A5A40]"
              }`}>
                #{article.pillarTag}
              </span>
              <span className="text-[#6B726E] flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTime}
              </span>
            </div>
            
            <h2 className="text-lg font-bold font-serif text-[#2D312E] mb-3 leading-snug line-clamp-2">
              <Link href={`/bai-viet/${article.slug}`} className="hover:text-[#3A5A40] transition-colors">
                {article.title}
              </Link>
            </h2>
            
            <p className="text-xs text-[#6B726E] leading-relaxed mb-6 flex-1 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between text-xs font-semibold text-[#3A5A40]">
              <Link href={`/bai-viet/${article.slug}`} className="flex items-center gap-1 hover:underline">
                <span>Đọc bài viết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[#6B726E] font-normal flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {article.date}
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
