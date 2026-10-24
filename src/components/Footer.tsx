import React from "react";
import Link from "next/link";
import { ShieldAlert, Heart, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E6E1D8] bg-[#FAF7F2] text-[#2D312E] pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold font-serif text-[#2D312E]">Trại Cai Nghiện</span>
            </div>
            <p className="text-sm text-[#6B726E] leading-relaxed max-w-md">
              "Chúng tôi ở đây để cùng bạn đối diện và vượt qua những cơn nghiện vô thức, giành lại sự tự do và làm chủ cuộc đời — trở về phiên bản tốt nhất của chính bạn."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#EBF0EC] text-[#3A5A40] font-medium">#HieuHanhVi</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F9EFE9] text-[#C27D53] font-medium">#ThucHanhThayDoi</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#EBF0EC] text-[#3A5A40] font-medium">#SongCoChuDich</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3A5A40] mb-4">Các Mục Chính</h4>
            <ul className="space-y-2.5 text-sm text-[#6B726E]">
              <li><Link href="/" className="hover:text-[#3A5A40] transition-colors">Trang Chủ</Link></li>
              <li><Link href="/he-thong-cai-nghien" className="text-[#3A5A40] font-bold hover:underline">Hệ Thống Cai Nghiện</Link></li>
              <li><Link href="/trac-nghiem" className="hover:text-[#3A5A40] transition-colors">Đo Mức Độ Nghiện (25 câu)</Link></li>
              <li><Link href="/bai-viet" className="hover:text-[#3A5A40] transition-colors">Kho Bài Viết Tâm Lý</Link></li>
              <li><Link href="/cong-cu" className="hover:text-[#3A5A40] transition-colors">Công Cụ Thực Hành</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-[#3A5A40] transition-colors">Giới Thiệu & Sứ Mệnh</Link></li>
            </ul>
          </div>

          {/* Column 3: Philosophy */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3A5A40] mb-4">Tinh Thần Dự Án</h4>
            <ul className="space-y-2.5 text-sm text-[#6B726E]">
              <li>🌸 <strong>Wabi Sabi:</strong> Tha thứ cho sự vụng về</li>
              <li>🌱 <strong>Kaizen:</strong> Tốt hơn 1% mỗi ngày</li>
              <li>🍵 <strong>Hara Hachi Bu:</strong> Dừng ở ngưỡng 80%</li>
              <li>🏮 <strong>Ikigai:</strong> Lý do thức dậy mỗi sáng</li>
              <li>🔥 <strong>Gambaru:</strong> Giữ mức tối thiểu không buông</li>
            </ul>
          </div>

        </div>

        {/* Ranh giới an toàn y tế */}
        <div className="p-4 rounded-2xl bg-[#EBF0EC]/60 border border-[#E6E1D8] text-xs text-[#6B726E] leading-relaxed mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#3A5A40] shrink-0 mt-0.5" />
          <div>
            <strong>Ranh giới an toàn y tế:</strong> Trại Cai Nghiện là nền tảng chia sẻ kiến thức tâm lý học hành vi và kinh nghiệm thực tế của người thường dành cho người thường. Chúng tôi không đưa ra chẩn đoán y khoa, không kê đơn thuốc và không thay thế các liệu pháp điều trị tâm thần lâm sàng chuyên nghiệp.
          </div>
        </div>

        <div className="pt-8 border-t border-[#E6E1D8] flex flex-col md:flex-row items-center justify-between text-xs text-[#6B726E] gap-4 text-center md:text-left">
          <div>
            © 2026 Trại Cai Nghiện • Trở về phiên bản tốt nhất của bạn.
          </div>
          <div className="flex items-center gap-1">
            <span>Đồng hành cùng bố & cộng đồng bởi Mây</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
