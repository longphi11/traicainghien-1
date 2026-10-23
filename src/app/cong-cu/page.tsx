"use client";

import React from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import { Wrench, Download, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CongCuPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
          Đồ Nghề Thực Chiến
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E]">
          Đồ Nghề Cho Phiên Bản Tốt Nhất
        </h1>
        <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
          Đừng chỉ dựa vào ý chí trần trụi. Hãy trang bị cho mình những rào cản và công cụ thông minh để khiến thói quen xấu trở nên khó khăn, và thói quen tốt trở nên dễ dàng.
        </p>
      </div>

      {/* Grid Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <div key={tool.id} className="zen-card p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full font-semibold bg-[#EBF0EC] text-[#3A5A40]">
                  {tool.categoryLabel}
                </span>
                <span className="text-[#C27D53] font-semibold text-xs">{tool.badge}</span>
              </div>

              <div>
                <h2 className="text-xl font-bold font-serif text-[#2D312E] leading-snug">
                  {tool.name}
                </h2>
              </div>

              <p className="text-xs md:text-sm text-[#6B726E] leading-relaxed">
                {tool.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#2D312E] uppercase tracking-wide block">
                  Đặc điểm nổi bật:
                </span>
                <ul className="space-y-2 text-xs text-[#6B726E]">
                  {tool.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#3A5A40] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-4 border-t border-[#E6E1D8]">
              {tool.isFree && tool.url === "#" ? (
                <button
                  onClick={() => alert("File PDF Dopamine Menu đang được cập nhật bản in chất lượng cao. Bố và Mây sẽ hoàn thiện ngay trong bản cập nhật tới!")}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{tool.linkText}</span>
                </button>
              ) : (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#3A5A40] border border-[#3A5A40] hover:bg-[#3A5A40] hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{tool.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Lời khuyên Kaizen về công cụ */}
      <div className="p-8 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] text-center space-y-3 max-w-3xl mx-auto">
        <h3 className="text-base font-bold font-serif text-[#2D312E]">Nguyên tắc sử dụng công cụ của Trại Cai Nghiện:</h3>
        <p className="text-xs md:text-sm text-[#6B726E] leading-relaxed">
          "Không có ứng dụng nào thay thế được sự tỉnh thức của bạn. Công cụ chỉ là chiếc nạng giúp bạn đứng vững trong những tuần đầu tiên, cho đến khi bộ não của bạn tự tái lập được sự cân bằng tự nhiên."
        </p>
      </div>

    </div>
  );
}
