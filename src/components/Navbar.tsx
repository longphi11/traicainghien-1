"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/he-thong-cai-nghien", label: "Hệ Thống Cai Nghiện" },
    { href: "/trac-nghiem", label: "Trắc Nghiệm" },
    { href: "/bai-viet", label: "Bài Viết" },
    { href: "/gioi-thieu", label: "Giới Thiệu" },
  ];

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
          <div className="w-11 h-11 rounded-xl bg-[#3A5A40] dark:bg-[#527A59] text-white flex items-center justify-center font-bold text-xl shadow-sm transition-transform group-hover:scale-105 shrink-0">
            🌿
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
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  active
                    ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold"
                    : "text-[#2D312E] dark:text-[#D1CCC4] hover:text-[#3A5A40] dark:hover:text-[#6B9A73]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] dark:bg-[#6B9A73] rounded-full" />
                )}
              </Link>
            );
          })}
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive(link.href) 
                  ? "text-[#3A5A40] dark:text-[#6B9A73] font-bold" 
                  : "text-[#2D312E] dark:text-[#D1CCC4]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
