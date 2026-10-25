import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Wrench, Compass, ShieldCheck, Heart, CheckCircle2, Clock, Calendar } from "lucide-react";
import { articles } from "@/data/articles";
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif text-[#2D312E] leading-tight md:whitespace-nowrap">
            Trở về phiên bản tốt nhất của bạn
          </h1>

          {/* Brand Manifesto */}
          <p className="text-lg md:text-xl text-[#6B726E] max-w-2xl mx-auto leading-relaxed">
            "Chúng tôi ở đây để cùng bạn đối diện và vượt qua những cơn nghiện vô thức, giành lại sự tự do và làm chủ cuộc đời — trở về phiên bản tốt nhất của chính bạn."
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
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#3A5A40]" /> 25 câu trắc nghiệm trong 3 phút</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-[#C27D53]" /> Tuyệt đối không phán xét</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#3A5A40]" /> Hoàn toàn miễn phí</span>
          </div>

        </div>
      </section>

      {/* 1.5. KHỐI ĐÁNH THẲNG VÀO INSIGHT NGƯỜI ĐỌC (THỨC TỈNH & ĐỒNG CẢM) */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12 bg-white border border-[#E6E1D8] shadow-sm space-y-10">
          
          {/* Header Insight (Căn giữa) */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C27D53] bg-[#F9EFE9] px-3.5 py-1.5 rounded-full inline-block">
              Lắng nghe tiếng lòng bạn
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#2D312E] leading-tight">
              Nếu bạn tìm đến trang web này, chắc hẳn sâu thẳm bên trong, bạn đang tìm kiếm một sự thay đổi.
            </h2>
            <p className="text-sm md:text-base text-[#6B726E] leading-relaxed max-w-2xl mx-auto">
              Đã bao lâu rồi bạn không cảm nhận được những niềm vui đơn giản, khi cuộc sống bị cuốn đi quá nhanh và bị chi phối bởi những cám dỗ số? Có phải bạn cũng đang gặp phải những điều này:
            </p>
          </div>

          {/* 6 Nỗi Đau Thực Tế (Grid 3 Cột) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Đi cafe dùng điện thoại */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  ☕
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  Đi cafe cùng bạn bè nhưng ai cũng cắm mặt vào điện thoại
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Ngồi cạnh nhau nhưng tâm trí mỗi người ở một thế giới ảo. Những cuộc trò chuyện sâu sắc, ánh mắt chân thành và tiếng cười tự nhiên dần biến mất.
                </p>
              </div>
            </div>

            {/* 2. 2h sáng cay mắt */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  🌙
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  2 giờ sáng mắt cay xè nhưng ngón tay vẫn không ngừng lướt
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Tự nhủ "lướt 5 phút rồi ngủ", nhưng ngẩng lên đã nửa đêm. Chiếc máy nóng ran, đầu óc trống rỗng và sáng hôm sau thức dậy trong cảm giác tội lỗi.
                </p>
              </div>
            </div>

            {/* 3. Mua sắm Shopee */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  🛍️
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  Chốt đơn Shopee, TikTok Shop trong vô thức lúc nửa đêm
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Mua sắm như một liều thuốc gây tê cảm xúc khi căng thẳng. Hàng giao về bóc ra chẳng buồn dùng, chỉ còn lại sự tiếc nuối và ví tiền vơi đi.
                </p>
              </div>
            </div>

            {/* 4. Mất tập trung */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  🧠
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  Không thể ngồi yên tập trung làm việc quá 10 phút
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Vừa mở tài liệu lên là tay lại vô thức nhảy tab, bấm vào Facebook, YouTube. Cả ngày bận rộn nhưng cuối ngày không hoàn thành được mục tiêu lớn nào.
                </p>
              </div>
            </div>

            {/* 5. Ăn uống cảm xúc */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  🍔
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  Bữa ăn vội vã với đồ ăn nhanh và màn hình trước mặt
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Ăn không phải để thưởng thức mà chỉ để có cớ xem video. Nạp vào người đồ ngọt, thức ăn nhanh trong vô thức, bụng no căng nhưng tâm trí vẫn cạn kiệt.
                </p>
              </div>
            </div>

            {/* 6. Cáu gắt người thân */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3 flex flex-col justify-between hover:border-[#3A5A40]/30 transition-all">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-center text-xl shadow-xs">
                  ⚡
                </div>
                <h3 className="font-bold font-serif text-[#2D312E] text-base leading-snug">
                  Dễ cáu gắt và mất kiên nhẫn với những người yêu thương
                </h3>
                <p className="text-xs text-[#6B726E] leading-relaxed">
                  Bực bội vô cớ khi cha mẹ, vợ con hay người yêu vô tình ngắt quãng một ván game hay đoạn video đang xem dở. "Con người nghiện" đang làm tổn thương họ.
                </p>
              </div>
            </div>

          </div>

          {/* Callout Kết Nối & Động Lực (Căn giữa) */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#EBF0EC]/70 border border-[#3A5A40]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1 max-w-xl">
              <p className="text-base font-bold font-serif text-[#2D312E]">
                Bạn không hề yếu đuối — bạn chỉ đang bị kẹt trong một hệ thống bẫy dopamine.
              </p>
              <p className="text-xs md:text-sm text-[#6B726E]">
                Bước đầu tiên để giành lại tự do là gọi tên chính xác điều gì đang chi phối bạn.
              </p>
            </div>
            <Link
              href="/trac-nghiem"
              className="px-6 py-3.5 rounded-xl text-xs md:text-sm font-bold text-white bg-[#3A5A40] hover:bg-[#2F4A34] shadow-sm shrink-0 transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>Đo mức độ nghiện ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                Trắc nghiệm nhập trại • 25 Câu Hỏi
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">
                Đo mức độ nghiện của bạn: Bạn thuộc Hệ Nghiện nào?
              </h2>
              <p className="text-sm md:text-base text-[#6B726E] leading-relaxed">
                Đêm muộn nằm lướt TikTok đến nóng máy không ngủ được, sáng ra lờ đờ, hay cáu gắt và mất tập trung? Bài trắc nghiệm 25 câu hỏi 5 chặng sẽ bóc tách chính xác 5 Hệ Nghiện thời hiện đại và Khoản Thuế Vô Hình bạn đang âm thầm gánh chịu.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#2D312E] pt-2">
                <span>🌙 Phân loại 5 Hệ Nghiện</span>
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
            <p className="p-4 rounded-2xl bg-white border border-[#E6E1D8] text-[#3A5A40] font-medium text-sm leading-relaxed">
              "Trại Cai Nghiện chỉ đơn giản là một nơi mà ở đó tụi mình giúp bạn tìm lại con người với nhiều động lực, ước mơ của bạn — một phiên bản fresh tươi mới mà bạn đã từng có. Tụi mình không bán gì cả, tụi mình chỉ ở đây để giúp bạn trở lại phiên bản tốt nhất của chính mình và của những người yêu thương bạn. Sự thay đổi của bạn chính là động lực lớn nhất của tụi mình."
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
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="group zen-card overflow-hidden flex flex-col p-5 hover:shadow-md transition-all duration-300 border border-[#E6E1D8] bg-white rounded-3xl"
            >
              {/* Thumbnail */}
              <Link
                href={`/bai-viet/${article.slug}`}
                className="relative h-48 md:h-52 w-full overflow-hidden rounded-2xl mb-4 bg-[#FAF7F2] block"
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                    article.pillarTag === "XayDungThoiQuen"
                      ? "bg-[#FAF7F2]/95 text-[#C27D53]"
                      : "bg-[#FAF7F2]/95 text-[#3A5A40]"
                  }`}
                >
                  #{article.pillarTag}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md bg-black/50 text-white shadow-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </Link>
              
              <h3 className="text-lg font-bold font-serif text-[#2D312E] mb-2 leading-snug line-clamp-2 group-hover:text-[#3A5A40] transition-colors">
                <Link href={`/bai-viet/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              
              <p className="text-xs text-[#6B726E] leading-relaxed mb-5 flex-1 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="pt-3.5 border-t border-[#E6E1D8] flex items-center justify-between text-xs font-semibold text-[#3A5A40]">
                <Link href={`/bai-viet/${article.slug}`} className="flex items-center gap-1 hover:underline">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <span className="text-[#6B726E] font-normal flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3" /> {article.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. CÔNG CỤ THỰC HÀNH PREVIEW */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E6E1D8] space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E6E1D8]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🛠️</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40]">Đồ Nghề Thực Chiến</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E]">Công Cụ Hỗ Trợ Chuyển Hóa</h3>
              <p className="text-xs md:text-sm text-[#6B726E] leading-relaxed max-w-2xl">
                Đừng chỉ dựa vào ý chí trần trụi. Hãy trang bị cho mình những rào cản và công cụ thông minh để khiến thói quen xấu trở nên khó khăn, và thói quen tốt trở nên dễ dàng.
              </p>
            </div>
            <Link
              href="/cong-cu"
              className="text-xs md:text-sm font-bold text-[#3A5A40] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Xem tất cả đồ nghề</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-2xl border border-[#E6E1D8] bg-[#FAF7F2] flex flex-col justify-between hover:border-[#3A5A40]/40 transition-all group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C27D53] px-2 py-0.5 rounded bg-[#F9EFE9] inline-block">
                    {tool.categoryLabel}
                  </span>
                  <h4 className="font-bold text-sm text-[#2D312E] leading-snug group-hover:text-[#3A5A40] transition-colors line-clamp-2">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-[#6B726E] leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E6E1D8]/60">
                  <Link
                    href="/cong-cu"
                    className="text-xs font-semibold text-[#3A5A40] flex items-center gap-1 hover:underline"
                  >
                    <span>Khám phá</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
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
