import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Wrench, Compass, ShieldCheck, Heart, CheckCircle2 } from "lucide-react";
import { articles } from "@/data/articles";
import { books } from "@/data/books";
import { tools } from "@/data/tools";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="pt-16 md:pt-24 pb-16 px-6 text-center border-b border-[#E6E1D8]">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Badge 3 Giá trị cốt lõi */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EBF0EC] text-[#3A5A40]">
            <span>Hiểu hành vi</span> • <span>Thực hành thay đổi</span> • <span>Sống có chủ đích</span>
          </div>

          {/* Slogan Tagline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif text-[#2D312E] leading-[1.15]">
            Giành lại sự chú ý.<br className="hidden md:block" /> Làm chủ thói quen. Sống có chủ đích.
          </h1>

          {/* Brand Manifesto */}
          <p className="text-lg md:text-xl text-[#6B726E] max-w-2xl mx-auto leading-relaxed">
            "Một nơi để hiểu vì sao chúng ta lặp lại những hành vi mình không thực sự muốn, học cách thay đổi chúng bằng những phương pháp thực tế và từng bước lấy lại quyền chủ động đối với cuộc sống."
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/trac-nghiem"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>Đo mức độ nghiện của bạn (3 phút)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gioi-thieu"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-semibold border border-[#E6E1D8] text-[#2D312E] hover:bg-black/5 transition-all"
            >
              Đọc câu chuyện sáng lập
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B726E]">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#3A5A40]" /> 10 câu trắc nghiệm nhanh 3 phút</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-[#C27D53]" /> Tuyệt đối không phán xét</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#3A5A40]" /> Hoàn toàn miễn phí</span>
          </div>

        </div>
      </section>

      {/* 2. THẺ BÀI TEST NHẬN DIỆN (LEAD MAGNET) */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 border border-[#E6E1D8] bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md bg-[#F9EFE9] text-[#C27D53] inline-block">
                Trắc nghiệm nhập trại (3 phút)
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">
                Đo mức độ nghiện của bạn: Bộ não đang đòi nợ đến ngưỡng nào?
              </h2>
              <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
                Đêm muộn nằm lướt TikTok đến nóng máy không ngủ được, sáng ra lờ đờ, hay cáu gắt và mất tập trung? Bài trắc nghiệm 10 câu hỏi sẽ giúp bạn gọi tên chính xác mức độ nghiện hành vi và điểm mặt trigger chính của bạn.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#2D312E] pt-2">
                <span>📊 Trả điểm & phân cấp ngay</span>
                <span>💡 Kèm 1 hành động Kaizen vi mô</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-center gap-3 shrink-0">
              <Link
                href="/trac-nghiem"
                className="w-full md:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-[#3A5A40] hover:bg-[#2F4A34] shadow-md hover:scale-105 transition-all text-center"
              >
                Bắt đầu đo mức độ nghiện
              </Link>
              <span className="text-[11px] text-[#6B726E]">Nhận kết quả phân tích tức thì</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BỐN TRỤ CỘT TRI THỨC */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40]">Hành Trình Chuyển Hóa</span>
          <h2 className="text-3xl font-bold font-serif text-[#2D312E]">Bốn Trụ Cột Tri Thức & Hành Động</h2>
          <p className="text-sm text-[#6B726E]">
            Chúng tôi không hô hào khẩu hiệu sáo rỗng. Mọi phương pháp đều dựa trên khoa học hành vi và tinh thần Á Đông bền bỉ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <span className="text-2xl">🧠</span>
            <h3 className="font-bold text-base font-serif text-[#2D312E]">1. Hiểu cơ chế hành vi</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Giải mã bập bênh dopamine của Dr. Anna Lembke. Hiểu cơ chế sinh học để xóa bỏ hoàn toàn mặc cảm tội lỗi hay tự trách mình lười.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <span className="text-2xl">⚖️</span>
            <h3 className="font-bold text-base font-serif text-[#2D312E]">2. Nhận diện cái giá</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Nhìn thẳng vào những tổn thất âm thầm: sự cáu gắt với người thân, chai sạn cảm xúc và việc tự nguyện làm nô lệ cho các thuật toán.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <span className="text-2xl">🛠️</span>
            <h3 className="font-bold text-base font-serif text-[#2D312E]">3. Thay đổi không dùng ý chí</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Thay thế Routine xấu bằng thói quen vi mô Kaizen 1%, thiết kế môi trường sống Atomic Habits và lòng bao dung Wabi Sabi khi vấp ngã.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <span className="text-2xl">🌅</span>
            <h3 className="font-bold text-base font-serif text-[#2D312E]">4. Sống chủ động</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Thắp sáng Ikigai (lý do thức dậy mỗi sáng), chiếm lĩnh 60 phút đầu ngày không màn hình và tìm lại dòng chảy sáng tạo sâu sắc.
            </p>
          </div>
        </div>
      </section>

      {/* 4. GÓC BÀI VIẾT NỔI BẬT */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40]">Nội Dung Thực Chiến</span>
            <h2 className="text-3xl font-bold font-serif text-[#2D312E] mt-1">Bài Viết Mới Nhất</h2>
          </div>
          <Link href="/bai-viet" className="mt-3 md:mt-0 text-sm font-semibold text-[#3A5A40] hover:underline flex items-center gap-1">
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="zen-card overflow-hidden flex flex-col p-6">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className={`px-2.5 py-1 rounded-full font-semibold ${
                  article.pillarTag === "ThucHanhThayDoi"
                    ? "bg-[#F9EFE9] text-[#C27D53]"
                    : "bg-[#EBF0EC] text-[#3A5A40]"
                }`}>
                  #{article.pillarTag}
                </span>
                <span className="text-[#6B726E]">{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-bold font-serif text-[#2D312E] mb-3 leading-snug line-clamp-2">
                <Link href={`/bai-viet/${article.slug}`} className="hover:text-[#3A5A40] transition-colors">
                  {article.title}
                </Link>
              </h3>
              
              <p className="text-xs text-[#6B726E] leading-relaxed mb-6 flex-1 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between text-xs font-semibold text-[#3A5A40]">
                <Link href={`/bai-viet/${article.slug}`} className="flex items-center gap-1 hover:underline">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#6B726E] font-normal">{article.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. TỦ SÁCH & CÔNG CỤ PREVIEW (HAI MỤC RIÊNG BIỆT) */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box Sách */}
          <div className="p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <h3 className="text-2xl font-bold font-serif text-[#2D312E]">Tủ Sách Chắt Lọc</h3>
              </div>
              <Link href="/sach" className="text-xs font-bold text-[#3A5A40] hover:underline">Xem tất cả →</Link>
            </div>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Đúc kết thực tế từ 14 cuốn sách kinh điển về dopamine, thói quen và lẽ sống. Chúng tôi chỉ chia sẻ những cuốn sách đã đọc thật và thấy có ích thực sự.
            </p>
            <div className="space-y-3">
              {books.slice(0, 2).map((book) => (
                <div key={book.id} className="p-3.5 rounded-xl border border-[#E6E1D8] bg-[#FAF7F2] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2D312E] block">{book.title}</span>
                    <span className="text-[#6B726E] text-[11px]">{book.author}</span>
                  </div>
                  <Link href="/sach" className="text-[#3A5A40] font-semibold hover:underline shrink-0 ml-3">
                    Xem đúc kết →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Box Công Cụ */}
          <div className="p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <h3 className="text-2xl font-bold font-serif text-[#2D312E]">Công Cụ Thực Hành</h3>
              </div>
              <Link href="/cong-cu" className="text-xs font-bold text-[#3A5A40] hover:underline">Xem tất cả →</Link>
            </div>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Các đồ nghề đồng hành cùng bạn: ứng dụng khóa màn hình nghiêm ngặt, bảng theo dõi streak và tài liệu Dopamine Menu tải về miễn phí.
            </p>
            <div className="space-y-3">
              {tools.slice(0, 2).map((tool) => (
                <div key={tool.id} className="p-3.5 rounded-xl border border-[#E6E1D8] bg-[#FAF7F2] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2D312E] block">{tool.name}</span>
                    <span className="text-[#6B726E] text-[11px]">{tool.categoryLabel}</span>
                  </div>
                  <Link href="/cong-cu" className="text-[#3A5A40] font-semibold hover:underline shrink-0 ml-3">
                    Xem chi tiết →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. HỘP ĐĂNG KÝ BẢN TIN SUBSTACK */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-[#EBF0EC] border border-[#E6E1D8] text-center space-y-6">
          <span className="text-2xl">✉️</span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">
            Mỗi tuần một câu chuyện tâm lý thực tế
          </h2>
          <p className="text-sm text-[#6B726E] max-w-xl mx-auto leading-relaxed">
            Không spam, không quảng cáo bán hàng. Chỉ gửi vào sáng Chủ nhật: những quan sát sâu sắc về thói quen, cách não bộ hoạt động và bài học từ những người đang giành lại cuộc đời.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 rounded-xl border border-[#E6E1D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3A5A40]"
            />
            <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all">
              Đăng ký đọc
            </button>
          </div>
          <p className="text-[11px] text-[#6B726E]">Bạn có thể hủy đăng ký bất cứ lúc nào với 1 cú click.</p>
        </div>
      </section>

    </div>
  );
}
