"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#E6E1D8] dark:border-[#2E3531] bg-white/60 dark:bg-[#1E2220]/60 opacity-60"
        aria-hidden="true"
      >
        <span className="w-5 h-5 block" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#2D312E] dark:text-[#F0ECE6] bg-white/80 dark:bg-[#1E2220] border border-[#E6E1D8] dark:border-[#2E3531] shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all duration-200 group"
      aria-label={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon (shown in dark mode) */}
        <Sun
          className={`w-5 h-5 text-[#E6A055] transition-all duration-300 absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Moon Icon (shown in light mode) */}
        <Moon
          className={`w-5 h-5 text-[#3A5A40] transition-all duration-300 absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </div>
      <span className="sr-only">
        {isDark ? "Chế độ tối đang bật" : "Chế độ sáng đang bật"}
      </span>
    </button>
  );
}
