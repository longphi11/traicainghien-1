"use client";

import React, { useState } from "react";
import Link from "next/link";
import { assessmentQuestions, calculateResult, AssessmentResult } from "@/data/questions";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Heart } from "lucide-react";

export default function TracNghiemPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(10).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const currentQ = assessmentQuestions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / assessmentQuestions.length) * 100);

  const handleSelectOption = (score: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = score;
    setSelectedAnswers(updatedAnswers);

    // Auto next after 250ms for smooth flow
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 250);
    } else {
      // Finished all 10 questions
      submitAssessment(updatedAnswers);
    }
  };

  const submitAssessment = (answers: number[]) => {
    const score = answers.reduce((acc, curr) => acc + (curr >= 0 ? curr : 0), 0);
    setTotalScore(score);
    const calculated = calculateResult(score);
    setResult(calculated);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setSelectedAnswers(Array(10).fill(-1));
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      
      {!isCompleted ? (
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
              Trắc Nghiệm Nhập Trại • 10 Câu Hỏi
            </span>
            <h1 className="text-2xl md:text-4xl font-bold font-serif text-[#2D312E]">
              Đo Mức Độ Nghiện Của Bạn
            </h1>
            <p className="text-xs md:text-sm text-[#6B726E] max-w-xl mx-auto leading-relaxed">
              Không phán xét, không giáo điều. Hãy trả lời thành thật để gọi tên những hành vi bạn không thực sự muốn và xem bộ não của bạn đang ở ngưỡng nào.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#6B726E]">
              <span>Câu hỏi {currentQuestionIndex + 1} / {assessmentQuestions.length}</span>
              <span>{progressPercent}% Hoàn thành</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E6E1D8] overflow-hidden">
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
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                      isSelected ? "border-[#3A5A40] bg-[#3A5A40] text-white" : "border-[#E6E1D8]"
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
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B726E] hover:text-[#2D312E] disabled:opacity-40 disabled:hover:text-[#6B726E] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>

              {currentQuestionIndex < assessmentQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  disabled={selectedAnswers[currentQuestionIndex] === -1}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  Tiếp theo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => submitAssessment(selectedAnswers)}
                  disabled={selectedAnswers.some((a) => a === -1)}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C27D53] hover:bg-[#A9663E] disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  Xem Kết Quả <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-[#6B726E] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3A5A40]" />
            <span>Mọi câu trả lời của bạn hoàn toàn ẩn danh và không lưu trữ thông tin cá nhân.</span>
          </div>

        </div>
      ) : (
        /* KẾT QUẢ TRẢ VỀ */
        <div className="space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] bg-[#EBF0EC] px-3.5 py-1 rounded-full inline-block">
              Kết Quả Đánh Giá Của Bạn
            </span>
            <h1 className="text-2xl md:text-4xl font-bold font-serif text-[#2D312E]">
              {result?.title}
            </h1>
            <p className="text-xs text-[#6B726E]">
              Tổng điểm của bạn: <strong className="text-[#3A5A40] text-sm">{totalScore} / 30 điểm</strong>
            </p>
          </div>

          {/* Result Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#E6E1D8] shadow-sm space-y-6">
            
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF7F2] border border-[#E6E1D8] text-[#2D312E]">
              {result?.badge}
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#2D312E] uppercase tracking-wide">
                1. Thực trạng não bộ hiện tại:
              </h3>
              <p className="text-sm md:text-base text-[#2D312E] leading-relaxed">
                {result?.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] space-y-2">
              <span className="text-xs font-bold text-[#3A5A40] uppercase tracking-wide flex items-center gap-1.5">
                🧠 Giải mã khoa học hành vi
              </span>
              <p className="text-xs md:text-sm text-[#6B726E] leading-relaxed">
                {result?.scientificInsight}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EBF0EC] border border-[#E6E1D8] space-y-2">
              <span className="text-xs font-bold text-[#3A5A40] uppercase tracking-wide flex items-center gap-1.5">
                🌱 Hành động Kaizen vi mô làm ngay hôm nay:
              </span>
              <p className="text-xs md:text-sm text-[#2D312E] font-medium leading-relaxed">
                {result?.actionKaizen}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E6E1D8] flex flex-col sm:flex-row gap-3">
              <Link
                href="/bai-viet/ban-khong-he-yeu-duoi"
                className="flex-1 py-3.5 px-6 rounded-xl text-center text-xs md:text-sm font-semibold text-white bg-[#3A5A40] hover:bg-[#2F4A34] transition-all flex items-center justify-center gap-2"
              >
                <span>Đọc bài phân tích: Bạn không yếu đuối</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleRestart}
                className="py-3.5 px-6 rounded-xl text-center text-xs md:text-sm font-semibold border border-[#E6E1D8] text-[#6B726E] hover:text-[#2D312E] hover:bg-black/5 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Làm lại bài test</span>
              </button>
            </div>

          </div>

          {/* Gợi ý tủ sách & công cụ */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E1D8] text-center space-y-3">
            <h4 className="text-sm font-bold font-serif text-[#2D312E]">Muốn đi sâu hơn vào giải pháp?</h4>
            <p className="text-xs text-[#6B726E]">
              Khám phá tủ sách đúc kết 14 cuốn kinh điển và bộ công cụ khóa màn hình hỗ trợ cai nghiện thực chiến.
            </p>
            <div className="flex justify-center gap-4 text-xs font-semibold pt-1">
              <Link href="/sach" className="text-[#3A5A40] hover:underline">Xem Tủ Sách →</Link>
              <Link href="/cong-cu" className="text-[#C27D53] hover:underline">Xem Công Cụ →</Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
