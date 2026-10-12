"use client";

import React, { useState } from "react";
import Link from "next/link";
import { assessmentQuestions, calculateDetailedResult, DetailedResult } from "@/data/questions";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Copy,
  Check,
  Share2,
  Heart,
  Flame,
  BatteryCharging,
} from "lucide-react";

export default function TracNghiemPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(20).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<DetailedResult | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQ = assessmentQuestions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / assessmentQuestions.length) * 100);

  const handleSelectOption = (score: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = score;
    setSelectedAnswers(updatedAnswers);

    // Auto next after 200ms for smooth fluid experience
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 200);
    } else {
      submitAssessment(updatedAnswers);
    }
  };

  const submitAssessment = (answers: number[]) => {
    const calculated = calculateDetailedResult(answers);
    setResult(calculated);
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setSelectedAnswers(Array(20).fill(-1));
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyResult = () => {
    if (!result) return;
    const textToCopy = `🌿 [TRẠI CAI NGHIỆN] Kết quả đo mức độ nghiện của tôi:\n• Điểm số: ${result.totalScore}/${result.maxScore} điểm (${result.percentage}%)\n• Hệ nghiện: ${result.archetype.name} (${result.archetype.tagline})\n• Đánh giá: ${result.title}\n👉 Đo mức độ nghiện của bạn tại: https://www.traicainghien.com/trac-nghiem`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      
      {!isCompleted ? (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
              Trắc Nghiệm Nhập Trại • 20 Câu Hỏi
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#2D312E]">
              Đo Mức Độ Nghiện Của Bạn
            </h1>
            <p className="text-xs md:text-sm text-[#6B726E] max-w-xl mx-auto leading-relaxed">
              Không phán xét, không giáo điều. 20 câu hỏi bóc tách 4 tầng hành vi đời thực để gọi tên những điều bạn đang vô thức lặp lại mỗi ngày.
            </p>
          </div>

          {/* Milestone & Progress Bar */}
          <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#E6E1D8] shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#3A5A40] flex items-center gap-1.5">
                <span>{currentQ.stageIcon}</span>
                <span>Chặng {currentQ.stageId}/4: {currentQ.stageName}</span>
              </span>
              <span className="font-semibold text-[#6B726E]">
                Câu {currentQuestionIndex + 1} / 20 ({progressPercent}%)
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-[#E6E1D8] overflow-hidden">
              <div
                className="h-full bg-[#3A5A40] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E6E1D8] shadow-sm space-y-6">
            <div>
              <span className="text-xs text-[#C27D53] font-semibold block mb-1">
                Tình huống: {currentQ.scenario}
              </span>
              <h2 className="text-lg md:text-xl font-bold font-serif text-[#2D312E] leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 text-xs md:text-sm ${
                      isSelected
                        ? "border-[#3A5A40] bg-[#EBF0EC] text-[#2D312E] font-medium shadow-sm"
                        : "border-[#E6E1D8] bg-[#FAF7F2] text-[#2D312E] hover:border-[#3A5A40] hover:bg-white"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                      isSelected ? "border-[#3A5A40] bg-[#3A5A40] text-white" : "border-[#E6E1D8] text-[#6B726E]"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E6E1D8]">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B726E] hover:text-[#2D312E] disabled:opacity-30 disabled:hover:text-[#6B726E] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>

              {currentQuestionIndex < assessmentQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  disabled={selectedAnswers[currentQuestionIndex] === -1}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] disabled:opacity-30 transition-all flex items-center gap-1.5"
                >
                  Tiếp theo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => submitAssessment(selectedAnswers)}
                  disabled={selectedAnswers.some((a) => a === -1)}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C27D53] hover:bg-[#A9663E] disabled:opacity-30 transition-all flex items-center gap-1.5 shadow-md"
                >
                  Hoàn thành & Xem Kết Quả <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-[#6B726E] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3A5A40]" />
            <span>Mọi câu trả lời của bạn hoàn toàn ẩn danh 100% và không lưu trữ danh tính.</span>
          </div>

        </div>
      ) : (
        /* ================= KẾT QUẢ TRẢ VỀ TOÀN DIỆN ================= */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Result Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
              Hồ Sơ Sàng Lọc Nhập Trại
            </span>
            <h1 className="text-2xl md:text-4xl font-bold font-serif text-[#2D312E]">
              {result?.title}
            </h1>
            <p className="text-xs md:text-sm text-[#6B726E]">
              Tổng điểm của bạn: <strong className="text-[#3A5A40] text-base">{result?.totalScore} / {result?.maxScore} điểm</strong> ({result?.percentage}% độ lệch bập bênh)
            </p>
          </div>

          {/* 1. ARCHETYPE CARD (HỆ NGHIỆN NỔI BẬT) */}
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E6E1D8] shadow-md space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#C27D53] tracking-wider block">
                  Hệ Nghiện Nổi Bật Của Bạn
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2D312E] flex items-center gap-2">
                  <span>{result?.archetype.icon}</span>
                  <span>{result?.archetype.name}</span>
                </h2>
                <span className="text-xs font-medium text-[#6B726E] italic block">
                  ({result?.archetype.tagline})
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase ${
                  result?.level === "severe"
                    ? "bg-rose-100 text-rose-700"
                    : result?.level === "mild"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {result?.badge}
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-[#2D312E] leading-relaxed bg-[#FAF7F2] p-5 rounded-2xl border border-[#E6E1D8]">
              "{result?.archetype.description}"
            </p>

            {/* 4 Chặng Điểm Số */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <span className="text-gray-500 block text-[11px]">🌙 Đêm muộn</span>
                <strong className="text-sm text-[#2D312E]">{result?.stageScores.stage1}/15</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <span className="text-gray-500 block text-[11px]">🧠 Chú ý</span>
                <strong className="text-sm text-[#2D312E]">{result?.stageScores.stage2}/15</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <span className="text-gray-500 block text-[11px]">🛡️ Đối phó</span>
                <strong className="text-sm text-[#2D312E]">{result?.stageScores.stage3}/15</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                <span className="text-gray-500 block text-[11px]">⚖️ Thuế ngầm</span>
                <strong className="text-sm text-[#2D312E]">{result?.stageScores.stage4}/15</strong>
              </div>
            </div>
          </div>

          {/* 2. KHOẢN THUẾ VÔ HÌNH (THE HIDDEN TAX) */}
          <div className="p-8 rounded-3xl bg-white border border-[#E6E1D8] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C27D53]" />
              <h3 className="text-lg font-bold font-serif text-[#2D312E]">
                Khoản "Thuế Vô Hình" Bạn Đang Âm Thầm Trả Mỗi Ngày:
              </h3>
            </div>
            <p className="text-xs text-[#6B726E]">
              Cuộc sống bạn chưa sụp đổ, nhưng những thói quen này đang âm thầm trừ tiền vào chất lượng sống của bạn:
            </p>
            <ul className="space-y-2.5 text-xs md:text-sm text-[#2D312E]">
              {result?.hiddenTaxes.map((tax, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E1D8]">
                  <span className="text-[#C27D53] font-bold">⚠️</span>
                  <span className="leading-relaxed">{tax}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. GIẢI MÃ KHOA HỌC THẦN KINH */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-3">
            <span className="text-xs font-bold text-[#3A5A40] uppercase tracking-wider block">
              🧠 Giải Mã Sinh Học Thần Kinh (Dr. Anna Lembke — Stanford)
            </span>
            <p className="text-xs md:text-sm text-[#2D312E] leading-relaxed">
              {result?.scientificAnalysis}
            </p>
          </div>

          {/* 4. ĐƠN THUỐC KAIZEN & TINH THẦN WABI SABI */}
          <div className="p-8 rounded-3xl bg-[#EBF0EC] border border-[#E6E1D8] space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3A5A40]" />
              <h3 className="text-lg font-bold font-serif text-[#2D312E]">
                Đơn Thuốc Kaizen Vi Mô Làm Ngay Tối Nay:
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E6E1D8] space-y-2">
              <span className="font-bold text-sm text-[#3A5A40] block">
                🌱 {result?.kaizenAction.title}
              </span>
              <p className="text-xs md:text-sm text-[#2D312E] leading-relaxed">
                {result?.kaizenAction.description}
              </p>
            </div>

            <p className="text-xs italic text-[#6B726E] text-center pt-2">
              🌸 <em>"{result?.kaizenAction.wabiSabiQuote}"</em>
            </p>
          </div>

          {/* ACTION BUTTONS & SHARE */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyResult}
                className="flex-1 py-3.5 px-6 rounded-2xl text-center text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Đã sao chép kết quả!" : "Sao chép tóm tắt kết quả (để chia sẻ)"}</span>
              </button>

              <button
                onClick={handleRestart}
                className="py-3.5 px-6 rounded-2xl text-center text-xs md:text-sm font-semibold border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] bg-white hover:bg-black/5 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Làm lại bài test</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/bai-viet/ban-khong-he-yeu-duoi"
                className="text-xs font-bold text-[#3A5A40] hover:underline"
              >
                Đọc bài phân tích: Bạn không hề yếu đuối... Bạn chỉ đang bị bộ não đòi nợ mà thôi →
              </Link>
            </div>
          </div>

          {/* Gợi ý Tủ Sách & Công Cụ */}
          <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] text-center space-y-3">
            <h4 className="text-sm font-bold font-serif text-[#2D312E]">Trang bị công cụ bẻ gãy thói quen</h4>
            <p className="text-xs text-[#6B726E]">
              Khám phá tủ sách đúc kết 14 cuốn kinh điển và các app khóa màn hình thực chiến để hỗ trợ bạn trong những ngày đầu.
            </p>
            <div className="flex justify-center gap-4 text-xs font-semibold pt-1">
              <Link href="/sach" className="text-[#3A5A40] hover:underline">Vào Tủ Sách →</Link>
              <Link href="/cong-cu" className="text-[#C27D53] hover:underline">Xem Công Cụ →</Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
