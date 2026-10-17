import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Clock, Users, Flame, Heart, Compass } from "lucide-react";
import { addictionSystemProducts } from "@/data/addictionSystem";

export const metadata = {
  title: "Hệ Thống Cai Nghiện | Trại Cai Nghiện",
  description: "Các giải pháp và lộ trình thực hành toàn diện giúp bạn cai nghiện dopamine rẻ tiền, trị não phân tâm và lấy lại quyền làm chủ cuộc đời.",
};

export default function HeThongCaiNghienPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="pt-16 md:pt-20 pb-12 px-6 text-center border-b border-[#E6E1D8]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EBF0EC] text-[#3A5A40]">
            <span>Giải Pháp Thực Chiến</span> • <span>Khoa Học Hành Vi</span> • <span>Không Phán Xét</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E] leading-tight">
            Hệ Thống Cai Nghiện & Chuyển Hóa
          </h1>
          
          <p className="text-base md:text-lg text-[#6B726E] max-w-2xl mx-auto leading-relaxed">
            Bạn không thể dùng ý chí trần trụi để chiến thắng một siêu máy tính nghìn tỷ USD của Thung lũng Silicon. Bạn cần một <strong>hệ thống phòng thủ và lộ trình từng bước</strong> để giành lại tâm trí của mình.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#6B726E]">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#3A5A40]" /> Dựa trên khoa học thần kinh & CBT</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-[#C27D53]" /> Không phán xét — Bảo mật tuyệt đối</span>
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-[#3A5A40]" /> Triết lý Kaizen 1% & Wabi Sabi</span>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CARDS GRID */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addictionSystemProducts.map((prod) => (
            <div
              key={prod.id}
              id={prod.id}
              className={`rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                prod.isPopular
                  ? "bg-white border-[#3A5A40] shadow-md ring-2 ring-[#3A5A40]/10"
                  : "bg-white border-[#E6E1D8] shadow-sm hover:border-[#3A5A40]/40"
              }`}
            >
              <div className="space-y-5">
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    prod.badgeColor === "emerald"
                      ? "bg-[#EBF0EC] text-[#3A5A40]"
                      : prod.badgeColor === "rose"
                      ? "bg-[#FDF2F2] text-[#9E2A2B]"
                      : prod.badgeColor === "blue"
                      ? "bg-[#EFF6FF] text-[#1D4ED8]"
                      : "bg-[#FFFBEB] text-[#B45309]"
                  }`}>
                    {prod.badge}
                  </span>
                  {prod.isPopular && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C27D53] bg-[#F9EFE9] px-2.5 py-0.5 rounded-full">
                      <Flame className="w-3.5 h-3.5" /> Được đón nhận nhất
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h2 className="text-2xl font-bold font-serif text-[#2D312E] mb-2 leading-snug">
                    {prod.title}
                  </h2>
                  <p className="text-xs md:text-sm font-semibold text-[#3A5A40]">
                    {prod.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#6B726E] leading-relaxed">
                  {prod.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-2 border-t border-[#E6E1D8]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D312E] block">
                    Đặc quyền của hệ thống:
                  </span>
                  <ul className="space-y-2 text-xs text-[#2D312E]">
                    {prod.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3A5A40] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#6B726E] bg-[#FAF7F2] p-3 rounded-xl border border-[#E6E1D8]/60">
                  <div>
                    <span className="font-semibold block text-[#2D312E]">Thời lượng:</span>
                    <span>{prod.duration}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-[#2D312E]">Hình thức:</span>
                    <span>{prod.format}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 mt-6 border-t border-[#E6E1D8] space-y-2">
                <Link
                  href="/trac-nghiem"
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    prod.isPopular
                      ? "bg-[#3A5A40] hover:bg-[#2F4A34] text-white shadow-md hover:shadow-lg"
                      : "bg-[#2D312E] hover:bg-black text-white"
                  }`}
                >
                  <span>{prod.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-[#6B726E]">
                  Khuyên dùng: Làm bài trắc nghiệm trước để xác định mức độ phù hợp
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. TRIẾT LÝ SÁNG LẬP: NGƯỜI THƯỜNG ĐỒNG HÀNH CÙNG NGƯỜI THƯỜNG */}
      <section className="px-6 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 bg-[#FAF7F2] border border-[#E6E1D8] space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3 py-1 rounded-full">
              Thành thật & Thấu hiểu
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">
              "Tụi mình không phải giáo sư giảng bài. Tụi mình là những người bạn đã từng ngã và đang cùng bạn đứng dậy."
            </h3>
            <p className="text-sm text-[#6B726E] leading-relaxed">
              Chúng ta đang sống trong kỷ nguyên mà mọi thuật toán sinh ra đều nhắm vào điểm yếu sinh học của bạn. Nói về kỷ luật thì dễ, nhưng nằm trên giường lúc 1h sáng với cái màn hình sáng rực mới là thực tế cuộc sống.
            </p>
            <p className="text-sm text-[#6B726E] leading-relaxed">
              Tại <strong>Trại Cai Nghiện</strong>, bạn không bao giờ bị phán xét hay bị gọi là kẻ lười biếng. Chúng tôi trao cho bạn những chiếc phao cứu sinh dựa trên khoa học thần kinh (Anna Lembke), thói quen nguyên tử (James Clear) và sự bao dung Wabi Sabi của người Nhật.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-[#E6E1D8]">
            <Link
              href="/trac-nghiem"
              className="px-6 py-3 rounded-xl bg-[#3A5A40] text-white font-bold text-xs hover:bg-[#2F4A34] transition-all"
            >
              Đo mức độ nghiện của bạn ngay
            </Link>
            <Link
              href="/gioi-thieu"
              className="px-6 py-3 rounded-xl border border-[#E6E1D8] text-[#2D312E] font-semibold text-xs hover:bg-black/5 transition-all"
            >
              Đọc tuyên ngôn sứ mệnh
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
