import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Giới Thiệu — Mục Đích Ra Đời Của Trại Cai Nghiện",
  description: "Câu chuyện chân thành về lý do Trại Cai Nghiện ra đời, sứ mệnh giúp bạn trở về phiên bản tốt nhất của chính mình và triết lý không phán xét của chúng tôi.",
};

export default function GioiThieuPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 border-b border-[#E6E1D8] pb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
          Câu Chuyện & Sứ Mệnh
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E] leading-tight">
          Tại sao "Trại Cai Nghiện" ra đời?
        </h1>
        <p className="text-base md:text-lg text-[#6B726E] max-w-2xl mx-auto leading-relaxed">
          Chúng tôi ở đây để cùng bạn đối diện và vượt qua những cơn nghiện vô thức, giành lại sự tự do và làm chủ cuộc đời — trở về phiên bản tốt nhất của chính bạn.
        </p>
      </div>

      {/* Lời bộc bạch của bố / Người sáng lập */}
      <section className="space-y-6">
        <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C27D53]">Lời Bộc Bạch Thành Thật</span>
          <h2 className="text-2xl font-bold font-serif text-[#2D312E]">
            "Tôi không phải là chuyên gia tâm lý học hành vi..."
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[#2D312E] leading-relaxed">
            <p>
              Tôi không có bằng tiến sĩ thần kinh học, cũng không phải giáo sư đứng trên bục giảng để rao giảng đạo đức.
            </p>
            <p>
              Tôi là một người bình thường — một người từng có những đêm nằm cuộn tròn trên giường lướt video ngắn đến 2-3h sáng, mắt cay xè, máy nóng ran, đầu óc trống rỗng và tự căm ghét sự yếu đuối của chính mình. Tôi từng biết rất rõ việc thức khuya, ăn đồ ngọt vô tội vạ hay dán mắt vào màn hình là độc hại, nhưng tôi vẫn bất lực lặp lại nó ngày này qua ngày khác.
            </p>
            <p>
              Cho đến khi tôi nhận ra một sự thật: <strong>Chúng ta không thất bại vì chúng ta yếu đuối hay suy đồi đạo đức. Chúng ta thất bại vì chúng ta đang dùng ý chí trần trụi của người thời đồ đá để đối đầu với các siêu máy tính của Thung lũng Silicon.</strong>
            </p>
            <p>
              Tôi lập ra <strong>Trại Cai Nghiện</strong> không phải để dạy dỗ ai, mà để tạo ra một không gian của <em>"người thường chia sẻ kinh nghiệm thực tế cho người thường"</em> — nơi những cuốn sách kinh điển thế giới được dịch sang ngôn ngữ đời thực, và những vết thương cảm xúc được ôm ấp với sự bao dung trọn vẹn.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Giá trị cốt lõi */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E] text-center">
          Ba Trụ Cột Niềm Tin Của Chúng Tôi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-lg font-serif text-[#2D312E]">Hiểu Hành Vi</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Trước khi muốn thay đổi, bạn phải hiểu cơ chế sinh học thần kinh bên trong. Khi bạn hiểu chiếc bập bênh dopamine hoạt động ra sao, bạn sẽ xóa tan mặc cảm tội lỗi để bắt đầu chữa lành.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9EFE9] text-[#C27D53] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-lg font-serif text-[#2D312E]">Thực Hành Thay Đổi</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Không dùng "kỷ luật thép" hay cắt đứt đột ngột dễ sốc (Cold-turkey). Chúng tôi áp dụng tinh thần Kaizen: cải tiến 1% mỗi ngày, thiết kế lại môi trường và bao dung Wabi Sabi khi lỡ trượt chân.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0EC] text-[#3A5A40] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-lg font-serif text-[#2D312E]">Sống Có Chủ Đích</h3>
            <p className="text-xs text-[#6B726E] leading-relaxed">
              Cai nghiện không phải là sống trong thiếu thốn khổ hạnh. Cai nghiện là giải phóng năng lượng để thắp sáng Ikigai — lý do thức dậy mỗi sáng khiến dopamine rẻ tiền tự khắc biến thành vô vị.
            </p>
          </div>
        </div>
      </section>

      {/* Ranh giới an toàn y tế */}
      <section className="p-8 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#3A5A40]" />
          <h2 className="text-xl font-bold font-serif text-[#2D312E]">Ranh Giới An Toàn Của Trại Cai Nghiện</h2>
        </div>
        <div className="text-xs md:text-sm text-[#2D312E] leading-relaxed space-y-2">
          <p>
            • Dự án tập trung vào các <strong>thói quen gây nghiện hành vi thời hiện đại từ mức độ nhẹ đến trung bình</strong>: lướt mạng xã hội vô thức, nghiện video ngắn, game online, đồ ngọt, mua sắm bốc đồng, porn.
          </p>
          <p>
            • Trại Cai Nghiện <strong>không đưa ra chẩn đoán y khoa</strong>, không kê đơn thuốc và không thay thế các liệu pháp điều trị tâm thần học lâm sàng.
          </p>
          <p>
            • Đối với các trường hợp nghiện chất kích thích nặng, nghiện rượu bia nghiêm trọng hoặc trầm cảm lâm sàng sâu sắc, chúng tôi luôn khẩn thiết khuyến nghị bạn tìm kiếm sự trợ giúp từ các bác sĩ chuyên khoa hoặc bệnh viện uy tín.
          </p>
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-xl font-bold font-serif text-[#2D312E]">Bạn đã sẵn sàng cùng chúng tôi trở về phiên bản tốt nhất của bạn?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/trac-nghiem"
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all flex items-center justify-center gap-2"
          >
            <span>Làm bài trắc nghiệm nhận diện</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/bai-viet"
            className="px-7 py-3.5 rounded-xl font-semibold border border-[#E6E1D8] text-[#2D312E] hover:bg-black/5 transition-all"
          >
            Đọc kho bài viết
          </Link>
        </div>
      </div>

    </div>
  );
}
