"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const categories = [
  {
    tag: "HieuHanhVi",
    label: "Hiểu Hành Vi",
    icon: "🌱",
    desc: "Cơ chế dopamine & bẫy tiện nghi",
  },
  {
    tag: "XayDungThoiQuen",
    label: "Xây Dựng Thói Quen",
    icon: "🛠️",
    desc: "Atomic Habits & Kaizen 1% mỗi ngày",
  },
  {
    tag: "LayLaiSuTapTrung",
    label: "Lấy Lại Sự Tập Trung",
    icon: "🎯",
    desc: "Trị sương mù não & Deep Work",
  },
  {
    tag: "TrietHocCuocSong",
    label: "Triết Học Cuộc Sống",
    icon: "📜",
    desc: "Stoicism, Wabi Sabi & Ikigai",
  },
  {
    tag: "QuanTriCamXuc",
    label: "Quản Trị Cảm Xúc",
    icon: "🌊",
    desc: "Cân bằng tâm lý & làm chủ xung động",
  },
  {
    tag: "HieuUngTamLy",
    label: "Hiệu Ứng Tâm Lý",
    icon: "🧠",
    desc: "Bẫy nhận thức & điểm mù tâm trí",
  },
  {
    tag: "SachHay",
    label: "Sách Hay",
    icon: "📚",
    desc: "Tinh hoa 14 cuốn sách kinh điển",
  },
  {
    tag: "RenLuyenBoNao",
    label: "Rèn Luyện Bộ Não",
    icon: "⚡",
    desc: "Tái lập nơ-ron, rèn trí lực & phản xạ",
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 dark:bg-[#151816]/90 backdrop-blur-md border-b border-[#E6E1D8] dark:border-[#2E3531] transition-colors duration-300">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0 mr-8 lg:mr-12 xl:mr-16">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#FAF7F2] dark:bg-[#202722] border border-[#E6E1D8] dark:border-[#354037] shadow-sm flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
            <Image
              src="/images/logo-totem.webp"
              alt="Logo Con quay Totem Trại Cai Nghiện"
              width={44}
              height={44}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold block font-serif text-[#2D312E] dark:text-[#F0ECE6] leading-tight tracking-tight">
              Trại Cai Nghiện
            </span>
            <span className="text-[11px] block text-[#6B726E] dark:text-[#9DA39F] font-medium tracking-tight mt-0.5 whitespace-nowrap">
              Trở về phiên bản tốt nhất của bạn
            </span>
          </div>
        </Link>

        {/* Desktop Menu Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors py-1 relative ${
              isActive("/")
                ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
            }`}
          >
            Trang Chủ
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
            )}
          </Link>

          <Link
            href="/he-thong-cai-nghien"
            className={`transition-colors py-1 relative ${
              isActive("/he-thong-cai-nghien")
                ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
            }`}
          >
            Hệ Thống Cai Nghiện
            {isActive("/he-thong-cai-nghien") && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
            )}
          </Link>

          <Link
            href="/trac-nghiem"
            className={`transition-colors py-1 relative ${
              isActive("/trac-nghiem")
                ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
            }`}
          >
            Trắc Nghiệm
            {isActive("/trac-nghiem") && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
            )}
          </Link>

          {/* Bài Viết with Dropdown Menu */}
          <div className="relative group/dropdown py-6">
            <Link
              href="/bai-viet"
              className={`transition-colors py-1 inline-flex items-center gap-1.5 relative ${
                isActive("/bai-viet")
                  ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                  : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
              }`}
            >
              <span>Bài Viết</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180 opacity-70" />
              {isActive("/bai-viet") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
              )}
            </Link>

            {/* Dropdown Panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none group-hover/dropdown:pointer-events-auto z-50">
              <div className="rounded-2xl p-4 bg-[#FAF7F2] dark:bg-[#181C1A] border border-[#E6E1D8] dark:border-[#2E3531] shadow-2xl space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E6E1D8] dark:border-[#2E3531]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A5A40] dark:text-[#78A380] flex items-center gap-1.5">
                    <span>📖</span> Khám Phá Bài Viết Theo Chủ Đề
                  </span>
                  <Link
                    href="/bai-viet"
                    className="text-xs font-semibold text-[#6B726E] dark:text-[#9DA39F] hover:text-[#3A5A40] dark:hover:text-[#78A380] flex items-center gap-1 transition-colors"
                  >
                    <span>Xem tất cả bài viết</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* 2-column Grid of Categories - Trực quan, không bị cắt cụt chữ */}
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.tag}
                      href={`/bai-viet?chude=${cat.tag}`}
                      className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-[#202722] border border-transparent hover:border-[#E6E1D8] dark:hover:border-[#354037] transition-all flex items-start gap-3 group/item"
                    >
                      <span className="text-xl shrink-0 p-1.5 rounded-lg bg-black/5 dark:bg-white/5 group-hover/item:scale-110 transition-transform">
                        {cat.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-bold text-[#2D312E] dark:text-[#F0ECE6] group-hover/item:text-[#3A5A40] dark:group-hover/item:text-[#78A380] transition-colors block leading-snug mb-0.5">
                          {cat.label}
                        </span>
                        <p className="text-[11px] text-[#6B726E] dark:text-[#9DA39F] leading-tight line-clamp-1">
                          {cat.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/gioi-thieu"
            className={`transition-colors py-1 relative ${
              isActive("/gioi-thieu")
                ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
            }`}
          >
            Giới Thiệu
            {isActive("/gioi-thieu") && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Action Button & Theme Toggle (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/trac-nghiem"
            className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] dark:bg-[#527A59] dark:hover:bg-[#63926B] shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Đo Mức Độ Nghiện</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/trac-nghiem"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#3A5A40] dark:bg-[#527A59]"
          >
            Đo Nghiện
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2D312E] dark:text-[#F0ECE6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E6E1D8] dark:border-[#2E3531] bg-[#FAF7F2] dark:bg-[#151816] px-6 py-4 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive("/") ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" : "text-[#2D312E] dark:text-[#D1CCC4]"
            }`}
          >
            Trang Chủ
          </Link>

          <Link
            href="/he-thong-cai-nghien"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive("/he-thong-cai-nghien") ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" : "text-[#2D312E] dark:text-[#D1CCC4]"
            }`}
          >
            Hệ Thống Cai Nghiện
          </Link>

          <Link
            href="/trac-nghiem"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive("/trac-nghiem") ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" : "text-[#2D312E] dark:text-[#D1CCC4]"
            }`}
          >
            Trắc Nghiệm
          </Link>

          {/* Mobile Accordion for Bài Viết */}
          <div className="py-1">
            <div className="flex items-center justify-between py-1">
              <Link
                href="/bai-viet"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive("/bai-viet") ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" : "text-[#2D312E] dark:text-[#D1CCC4]"
                }`}
              >
                Bài Viết (Tất cả)
              </Link>
              <button
                onClick={() => setMobileArticlesOpen(!mobileArticlesOpen)}
                className="p-1 rounded-lg text-[#6B726E] dark:text-[#9DA39F] hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Toggle categories"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileArticlesOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Mobile Categories Submenu - Không hashtag, hiển thị rõ ràng */}
            {mobileArticlesOpen && (
              <div className="pl-3 pr-1 py-2 my-1 space-y-1.5 border-l-2 border-[#E6E1D8] dark:border-[#2E3531]">
                {categories.map((cat) => (
                  <Link
                    key={cat.tag}
                    href={`/bai-viet?chude=${cat.tag}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 text-xs text-[#6B726E] dark:text-[#9DA39F] hover:text-[#3A5A40] dark:hover:text-[#78A380] transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span className="font-semibold">{cat.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/gioi-thieu"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive("/gioi-thieu") ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" : "text-[#2D312E] dark:text-[#D1CCC4]"
            }`}
          >
            Giới Thiệu
          </Link>
        </div>
      )}
    </header>
  );
}
