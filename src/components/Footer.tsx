import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E6E1D8] dark:border-[#2E3531] bg-[#FAF7F2] dark:bg-[#151816] text-[#2D312E] dark:text-[#F0ECE6] pt-16 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold font-serif text-[#2D312E] dark:text-[#F0ECE6]">Trại Cai Nghiện</span>
            </div>
            <p className="text-sm text-[#6B726E] dark:text-[#9DA39F] leading-relaxed max-w-md">
              "Chúng tôi ở đây để cùng bạn đối diện và vượt qua những cơn nghiện vô thức, giành lại sự tự do và làm chủ cuộc đời — trở về phiên bản tốt nhất của chính bạn."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#EBF0EC] dark:bg-[#202A23] text-[#3A5A40] dark:text-[#78A380] font-medium">#HieuHanhVi</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#F9EFE9] dark:bg-[#2D231C] text-[#C27D53] dark:text-[#D48C62] font-medium">#ThucHanhThayDoi</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#EBF0EC] dark:bg-[#202A23] text-[#3A5A40] dark:text-[#78A380] font-medium">#SongCoChuDich</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3A5A40] dark:text-[#6B9A73] mb-4">Các Mục Chính</h4>
            <ul className="space-y-2.5 text-sm text-[#6B726E] dark:text-[#9DA39F]">
              <li><Link href="/" className="hover:text-[#3A5A40] dark:hover:text-[#6B9A73] transition-colors">Trang Chủ</Link></li>
              <li><Link href="/he-thong-cai-nghien" className="text-[#3A5A40] dark:text-[#6B9A73] font-bold hover:underline">Hệ Thống Cai Nghiện</Link></li>
              <li><Link href="/trac-nghiem" className="hover:text-[#3A5A40] dark:hover:text-[#6B9A73] transition-colors">Đo Mức Độ Nghiện (25 câu)</Link></li>
              <li><Link href="/bai-viet" className="hover:text-[#3A5A40] dark:hover:text-[#6B9A73] transition-colors">Kho Bài Viết Tâm Lý</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-[#3A5A40] dark:hover:text-[#6B9A73] transition-colors">Giới Thiệu & Sứ Mệnh</Link></li>
            </ul>
          </div>

          {/* Column 3: Philosophy */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3A5A40] dark:text-[#6B9A73] mb-4">Tinh Thần Dự Án</h4>
            <ul className="space-y-2.5 text-sm text-[#6B726E] dark:text-[#9DA39F]">
              <li>🌸 <strong>Wabi Sabi:</strong> Tha thứ cho sự vụng về</li>
              <li>🌱 <strong>Kaizen:</strong> Tốt hơn 1% mỗi ngày</li>
              <li>🍵 <strong>Hara Hachi Bu:</strong> Dừng ở ngưỡng 80%</li>
              <li>🏮 <strong>Ikigai:</strong> Lý do thức dậy mỗi sáng</li>
              <li>🔥 <strong>Gambaru:</strong> Giữ mức tối thiểu không buông</li>
            </ul>
          </div>

        </div>

        {/* Ranh giới an toàn y tế */}
        <div className="p-4 rounded-2xl bg-[#EBF0EC]/60 dark:bg-[#202A23]/60 border border-[#E6E1D8] dark:border-[#2E3531] text-xs text-[#6B726E] dark:text-[#9DA39F] leading-relaxed mb-8 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#3A5A40] dark:text-[#6B9A73] shrink-0 mt-0.5" />
          <div>
            <strong>Ranh giới an toàn y tế:</strong> Trại Cai Nghiện là nền tảng chia sẻ kiến thức tâm lý học hành vi và kinh nghiệm thực tế của người thường dành cho người thường. Chúng tôi không đưa ra chẩn đoán y khoa, không kê đơn thuốc và không thay thế các liệu pháp điều trị tâm thần lâm sàng chuyên nghiệp.
          </div>
        </div>

        <div className="pt-8 border-t border-[#E6E1D8] dark:border-[#2E3531] flex flex-col md:flex-row items-center justify-between text-xs text-[#6B726E] dark:text-[#9DA39F] gap-4 text-center md:text-left">
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
