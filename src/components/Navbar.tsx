"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, BookOpen, Compass, CheckCircle2, Bookmark, Wrench } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/gioi-thieu", label: "Giới Thiệu" },
    { href: "/trac-nghiem", label: "Trắc Nghiệm" },
    { href: "/bai-viet", label: "Bài Viết" },
    { href: "/sach", label: "Sách" },
    { href: "/cong-cu", label: "Công Cụ" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E6E1D8]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#3A5A40] text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
            🌿
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block font-serif text-[#2D312E]">
              Trại Cai Nghiện
            </span>
            <span className="text-[10px] block tracking-wide uppercase font-semibold text-[#6B726E]">
              Giành lại sự chú ý
            </span>
          </div>
        </Link>

        {/* Desktop 6 Menu Items */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  active
                    ? "text-[#3A5A40] font-bold"
                    : "text-[#2D312E] hover:text-[#3A5A40]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A5A40] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/trac-nghiem"
            className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Đo Mức Độ Nghiện</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/trac-nghiem"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#3A5A40]"
          >
            Đo Nghiện
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2D312E] hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#2D312E]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E6E1D8] bg-[#FAF7F2] px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive(link.href) ? "text-[#3A5A40] font-bold" : "text-[#2D312E]"
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
