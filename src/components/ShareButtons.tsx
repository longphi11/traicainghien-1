"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://www.traicainghien.com/bai-viet/${slug}`;
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${title} — Trại Cai Nghiện`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleShareTelegram = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="py-8 px-6 sm:px-8 border-y border-[#E6E1D8] bg-[#FAF7F2] rounded-3xl my-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div className="flex items-center gap-3.5 text-center md:text-left">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center shrink-0 shadow-inner">
          <Share2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-[#2D312E] leading-tight">
            Chia sẻ bài viết này để giúp ai đó thức tỉnh!
          </h3>
          <p className="text-xs sm:text-sm text-[#6B726E] mt-1">
            Một lần chia sẻ của bạn có thể cứu rỗi sự bình yên của một người thân yêu.
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap justify-center gap-2.5">
        {/* Facebook */}
        <button
          onClick={handleShareFacebook}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E6E1D8] bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] text-[#2D312E] transition-all flex items-center gap-2 shadow-sm"
          title="Chia sẻ lên Facebook"
        >
          <span className="font-bold text-sm">f</span>
          <span>Facebook</span>
        </button>

        {/* X / Twitter */}
        <button
          onClick={handleShareTwitter}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E6E1D8] bg-white hover:bg-black hover:text-white hover:border-black text-[#2D312E] transition-all flex items-center gap-2 shadow-sm"
          title="Chia sẻ lên X"
        >
          <span className="font-bold">𝕏</span>
          <span>Twitter / X</span>
        </button>

        {/* Telegram */}
        <button
          onClick={handleShareTelegram}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E6E1D8] bg-white hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9] text-[#2D312E] transition-all flex items-center gap-2 shadow-sm"
          title="Chia sẻ qua Telegram"
        >
          <span>✈️</span>
          <span>Telegram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#E6E1D8] bg-white hover:bg-[#3A5A40] hover:text-white hover:border-[#3A5A40] text-[#2D312E] transition-all flex items-center gap-2 shadow-sm"
          title="Sao chép liên kết bài viết"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#6B726E]" />}
          <span>{copied ? "Đã sao chép liên kết!" : "Sao chép link"}</span>
        </button>
      </div>
    </div>
  );
}
