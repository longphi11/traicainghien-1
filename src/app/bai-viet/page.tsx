"use client";

import React, { useState } from "react";
import Link from "next/link";
import { articles, ArticleTag } from "@/data/articles";
import { ArrowRight, ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react";

const ITEMS_PER_PAGE = 15;

export default function BaiVietPage() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const filteredArticles = activeTab === "ALL" 
    ? articles 
    : articles.filter((a) => a.pillarTag === activeTab);

  const getCount = (tag: string) => {
    if (tag === "ALL") return articles.length;
    return articles.filter((a) => a.pillarTag === tag).length;
  };

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HieuHanhVi":
        return "bg-[#EBF0EC] text-[#3A5A40]";
      case "XayDungThoiQuen":
        return "bg-[#F9EFE9] text-[#C27D53]";
      case "LayLaiSuTapTrung":
        return "bg-blue-50 text-blue-800";
      case "SachHay":
        return "bg-amber-50 text-amber-800";
      case "CongCuHoTro":
        return "bg-emerald-50 text-emerald-800";
      default:
        return "bg-[#FAF7F2] text-[#6B726E]";
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-4 py-1.5 rounded-full inline-block">
          Kho Tàng Tri Thức • Trại Cai Nghiện
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[#2D312E] tracking-tight">
          Bài Viết Tâm Lý Hành Vi
        </h1>
        <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
          Đúc kết khoa học thần kinh và kinh nghiệm thực chiến từ người thường dành cho người thường. Không giáo điều, không phán xét, trao phương pháp để bạn làm chủ cuộc đời.
        </p>
      </div>

      {/* 5 Chủ Đề Hashtag Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
        <button
          onClick={() => handleTabChange("ALL")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm ${
            activeTab === "ALL"
              ? "bg-[#3A5A40] text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-[#3A5A40]"
          }`}
        >
          Tất Cả ({getCount("ALL")})
        </button>

        <button
          onClick={() => handleTabChange("HieuHanhVi")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeTab === "HieuHanhVi"
              ? "bg-[#3A5A40] text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-[#3A5A40]"
          }`}
        >
          <span>🧠</span>
          <span>#HieuHanhVi</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
            activeTab === "HieuHanhVi" ? "bg-white/20 text-white" : "bg-[#EBF0EC] text-[#3A5A40]"
          }`}>
            {getCount("HieuHanhVi")}
          </span>
        </button>

        <button
          onClick={() => handleTabChange("XayDungThoiQuen")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeTab === "XayDungThoiQuen"
              ? "bg-[#C27D53] text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-[#C27D53]"
          }`}
        >
          <span>🛠️</span>
          <span>#XayDungThoiQuen</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
            activeTab === "XayDungThoiQuen" ? "bg-white/20 text-white" : "bg-[#F9EFE9] text-[#C27D53]"
          }`}>
            {getCount("XayDungThoiQuen")}
          </span>
        </button>

        <button
          onClick={() => handleTabChange("LayLaiSuTapTrung")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeTab === "LayLaiSuTapTrung"
              ? "bg-[#3A5A40] text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-[#3A5A40]"
          }`}
        >
          <span>🎯</span>
          <span>#LayLaiSuTapTrung</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
            activeTab === "LayLaiSuTapTrung" ? "bg-white/20 text-white" : "bg-blue-50 text-blue-800"
          }`}>
            {getCount("LayLaiSuTapTrung")}
          </span>
        </button>

        <button
          onClick={() => handleTabChange("SachHay")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeTab === "SachHay"
              ? "bg-amber-700 text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-amber-600"
          }`}
        >
          <span>📚</span>
          <span>#SachHay</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
            activeTab === "SachHay" ? "bg-white/20 text-white" : "bg-amber-50 text-amber-800"
          }`}>
            {getCount("SachHay")}
          </span>
        </button>

        <button
          onClick={() => handleTabChange("CongCuHoTro")}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeTab === "CongCuHoTro"
              ? "bg-emerald-800 text-white shadow-md scale-105"
              : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:border-emerald-700"
          }`}
        >
          <span>🧰</span>
          <span>#CongCuHoTro</span>
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
            activeTab === "CongCuHoTro" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-800"
          }`}>
            {getCount("CongCuHoTro")}
          </span>
        </button>
      </div>

      {/* Articles Grid (To hơn 25%, mở rộng sang 2 bên) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {currentArticles.map((article) => (
          <article
            key={article.slug}
            className="group zen-card overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border border-[#E6E1D8] bg-white rounded-3xl"
          >
            {/* Thumbnail Box - Tràn viền hoàn toàn không còn viền trắng bao quanh */}
            <Link
              href={`/bai-viet/${article.slug}`}
              className="relative h-52 sm:h-56 md:h-52 lg:h-56 w-full overflow-hidden bg-[#FAF7F2] block"
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span
                className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${getTagColor(
                  article.pillarTag
                )}`}
              >
                #{article.pillarTag}
              </span>
              <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-black/60 text-white shadow-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </Link>

            {/* Nội dung bên dưới bài viết có padding đệm êm ái */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              {/* Date & Metadata Row (Phong cách tinh tế theo ảnh mẫu) */}
              <div className="text-[11px] font-semibold tracking-wider text-[#6B726E] uppercase mb-2 flex items-center gap-1.5">
                <span>{article.date}</span>
                <span>•</span>
                <span className="text-[#3A5A40] font-bold">#{article.pillarTag}</span>
              </div>

              {/* Title (Khoảng cách dòng thoáng đãng, vừa khít 2 dòng không díu chữ) */}
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#2D312E] mb-3 leading-[1.42] sm:leading-[1.46] tracking-normal line-clamp-2 group-hover:text-[#3A5A40] transition-colors">
                <Link href={`/bai-viet/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#6B726E] leading-relaxed mb-6 flex-1 line-clamp-3">
                “{article.excerpt}”
              </p>

              {/* Footer Row */}
              <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#3A5A40]">
                <Link href={`/bai-viet/${article.slug}`} className="flex items-center gap-1.5 hover:underline font-bold">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <span className="text-[#6B726E] font-normal flex items-center gap-1 text-xs">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination (Hiển thị tối đa 15 box / 1 trang) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#E6E1D8] bg-white text-[#6B726E] hover:text-[#2D312E] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Trang trước
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                currentPage === idx + 1
                  ? "bg-[#3A5A40] text-white shadow-sm"
                  : "bg-white border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E]"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#E6E1D8] bg-white text-[#6B726E] hover:text-[#2D312E] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1 transition-all"
          >
            Trang sau <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
