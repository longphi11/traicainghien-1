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

      {/* 2. HỆ THỐNG CAI NGHIỆN (PRODUCT SUITE TƯƠNG TỰ DANNY TRAN) */}
      <section className="px-6 max-w-6xl mx-auto" id="he-thong">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1.5 rounded-full inline-block">
            Giải Pháp Thực Chiến
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2D312E]">
            Hệ Thống Cai Nghiện & Chuyển Hóa
          </h2>
          <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
            Bạn không thể dùng ý chí trần trụi để chiến đấu với các thuật toán gây nghiện. Đây là các hệ thống được thiết kế riêng cho từng nỗi đau của thời đại số.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: 28 Ngày Tái Sinh */}
          <div className="rounded-3xl p-8 bg-white border border-[#3A5A40] shadow-md ring-2 ring-[#3A5A40]/10 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EBF0EC] text-[#3A5A40]">
                  Giao thức cốt lõi
                </span>
                <span className="text-xs font-bold text-[#C27D53] bg-[#F9EFE9] px-2 py-0.5 rounded-md">
                  ★ Phổ biến nhất
                </span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#2D312E]">
                28 Ngày Tái Sinh
              </h3>
              <p className="text-xs font-semibold text-[#3A5A40]">
                Tái thiết lập hệ thần kinh & thoát bẫy dopamine rẻ tiền
              </p>
              <p className="text-xs text-[#6B726E] leading-relaxed">
                28 ý tưởng và bài tập vi mô Kaizen 1% mỗi ngày giúp bạn hạ nhiệt kích thích siêu ngưỡng, cai lướt đêm và tìm lại cảm giác hạnh phúc trong đời thực.
              </p>
              <ul className="space-y-2 text-xs text-[#2D312E] pt-2 border-t border-[#E6E1D8]">
                <li className="flex items-center gap-2">✓ Bẻ gãy bẫy ăn bù kích thích (Rebound)</li>
                <li className="flex items-center gap-2">✓ Chiếm lĩnh 60 phút buổi sáng không màn hình</li>
                <li className="flex items-center gap-2">✓ Tự thực hành (DIY) hoặc Có bạn đồng hành</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E6E1D8]">
              <Link
                href="/he-thong-cai-nghien#28-ngay-tai-sinh"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#3A5A40] hover:bg-[#2F4A34] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Tìm hiểu về 28 Ngày Tái Sinh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Tâm Tĩnh Khí Thuần */}
          <div className="rounded-3xl p-8 bg-white border border-[#E6E1D8] shadow-sm hover:border-[#3A5A40]/40 flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FDF2F2] text-[#9E2A2B] inline-block">
                Hồi phục sinh lực
              </span>
              <h3 className="text-2xl font-bold font-serif text-[#2D312E]">
                Tâm Tĩnh Khí Thuần
              </h3>
              <p className="text-xs font-semibold text-[#9E2A2B]">
                Hệ thống hồi phục toàn diện khỏi Pỏn & Khoái cảm ảo
              </p>
              <p className="text-xs text-[#6B726E] leading-relaxed">
                Xóa tan nỗi xấu hổ và mặc cảm tội lỗi. Giải mã cơ chế Coolidge Effect và trang bị nút bấm SOS 3 phút cắt đứt xung động nguy hiểm nhất.
              </p>
              <ul className="space-y-2 text-xs text-[#2D312E] pt-2 border-t border-[#E6E1D8]">
                <li className="flex items-center gap-2">✓ Giao thức cấp cứu SOS khi cơn thèm ập đến</li>
                <li className="flex items-center gap-2">✓ Khôi phục độ nhạy cảm xúc & bản lĩnh nam giới</li>
                <li className="flex items-center gap-2">✓ Hoàn toàn bảo mật và không phán xét</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E6E1D8]">
              <Link
                href="/he-thong-cai-nghien#tam-tinh-khi-thuan"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#2D312E] hover:bg-black text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Tìm hiểu về Tâm Tĩnh Khí Thuần</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Dòng Chảy Tĩnh Lặng */}
          <div className="rounded-3xl p-8 bg-white border border-[#E6E1D8] shadow-sm hover:border-[#3A5A40]/40 flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] inline-block">
                Trị não phân tâm
              </span>
              <h3 className="text-2xl font-bold font-serif text-[#2D312E]">
                Dòng Chảy Tĩnh Lặng
              </h3>
              <p className="text-xs font-semibold text-[#1D4ED8]">
                Thiết kế hệ thống năng suất cho não bộ dễ xao nhãng
              </p>
              <p className="text-xs text-[#6B726E] leading-relaxed">
                Dành cho người không thể ngồi yên 15 phút hay có triệu chứng ADHD. Cung cấp bộ công cụ Time-boxing và Hộp chứa xao nhãng trực quan.
              </p>
              <ul className="space-y-2 text-xs text-[#2D312E] pt-2 border-t border-[#E6E1D8]">
                <li className="flex items-center gap-2">✓ Đập tan tình trạng nhảy tab & quá tải nhận thức</li>
                <li className="flex items-center gap-2">✓ Đạt trạng thái dòng chảy (Flow) trong 25 phút</li>
                <li className="flex items-center gap-2">✓ Mẫu Template Notion & Sổ tay cá nhân hóa</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#E6E1D8]">
              <Link
                href="/he-thong-cai-nghien#dong-chay-tinh-lang"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#2D312E] hover:bg-black text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Tìm hiểu về Dòng Chảy Tĩnh Lặng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        <div className="text-center pt-8">
          <Link
            href="/he-thong-cai-nghien"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#3A5A40] hover:underline"
          >
            <span>Xem đầy đủ thông số các lộ trình cai nghiện</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. THẺ BÀI TEST NHẬN DIỆN (LEAD MAGNET) */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 border border-[#E6E1D8] bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md bg-[#F9EFE9] text-[#C27D53] inline-block">
                Trắc nghiệm nhập trại • 20 Câu Hỏi
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">
                Đo mức độ nghiện của bạn: Bạn thuộc Hệ Nghiện nào?
              </h2>
              <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
                Đêm muộn nằm lướt TikTok đến nóng máy không ngủ được, sáng ra lờ đờ, hay cáu gắt và mất tập trung? Bài trắc nghiệm 20 câu hỏi 4 chặng sẽ bóc tách chính xác 4 Hệ Nghiện thời hiện đại và Khoản Thuế Vô Hình bạn đang âm thầm gánh chịu.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#2D312E] pt-2">
                <span>🌙 Phân loại 4 Hệ Nghiện</span>
                <span>⚖️ Bóc trần Khoản Thuế Vô Hình</span>
                <span>💡 Kèm đơn thuốc Kaizen 1%</span>
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

      {/* 4. VỀ CHÚNG TÔI (STORYTELLING THÀNH THẬT THEO PHONG CÁCH DANNY TRAN) */}
      <section className="px-6 max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 bg-[#FAF7F2] border border-[#E6E1D8] space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3A5A40] text-white flex items-center justify-center font-bold text-xl">
              🌿
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#3A5A40] block">Người Đồng Hành</span>
              <h3 className="text-2xl font-bold font-serif text-[#2D312E]">Về Trại Cai Nghiện</h3>
            </div>
          </div>

          <div className="space-y-4 text-sm md:text-base text-[#2D312E] leading-relaxed">
            <p>
              Chào bạn, tụi mình là những người sáng lập <strong>Trại Cai Nghiện</strong>. Tụi mình không phải giáo sư tâm thần học, cũng chẳng phải chuyên gia self-help luôn miệng rao giảng về "kỷ luật thép 5 giờ sáng".
            </p>
            <p>
              Tụi mình là những <strong>người bình thường</strong> đã từng trải qua trọn vẹn những đêm tối bế tắc nhất: Nằm dán mắt vào màn hình điện thoại tới 3 giờ sáng, mắt cay xè nhưng ngón tay vẫn quẹt, sáng hôm sau nhìn vào gương thấy đôi mắt thâm quầng và tự sỉ vả mình thậm tệ.
            </p>
            <p className="p-4 rounded-2xl bg-white border border-[#E6E1D8] text-[#3A5A40] font-medium text-sm">
              "Điểm khác biệt duy nhất là tụi mình đã dám nhìn thẳng vào cơ chế sinh học của bộ não, thử nghiệm qua hàng chục cuốn sách kinh điển của thế giới (Anna Lembke, James Clear, Neil Postman) kết hợp triết lý Kaizen, Wabi Sabi của người Nhật để tìm ra lối thoát thực tế."
            </p>
            <p className="text-xs md:text-sm text-[#6B726E]">
              Đến với Trại Cai Nghiện, bạn được quyền là một con người bình thường có những lúc yếu đuối và trượt chân. Bạn không cần hoàn hảo, chỉ cần mỗi ngày bạn nhích lên 1% cùng tụi mình.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E6E1D8] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-[#6B726E]">
              <span>✓ Cho trước — Tin tưởng — Đồng hành</span>
              <span>✓ Hoàn toàn phi phán xét</span>
            </div>
            <Link
              href="/gioi-thieu"
              className="text-xs font-bold text-[#3A5A40] hover:underline flex items-center gap-1"
            >
              <span>Đọc toàn bộ tâm sự sáng lập</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
