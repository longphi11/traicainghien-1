import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trại Cai Nghiện — Trở về phiên bản tốt nhất của bạn",
  description: "Trại Cai Nghiện giúp bạn tìm lại con người với nhiều động lực, ước mơ — trở về phiên bản tốt nhất của chính mình và của những người yêu thương bạn.",
  keywords: ["trại cai nghiện", "cai nghiện dopamine", "trở về phiên bản tốt nhất", "thói quen nguyên tử", "làm chủ thói quen", "ikigai", "kaizen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${lora.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D312E] font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
