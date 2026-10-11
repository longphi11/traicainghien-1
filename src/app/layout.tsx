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
  title: "Trại Cai Nghiện — Giành lại sự chú ý. Làm chủ thói quen. Sống có chủ đích.",
  description: "Một nơi để hiểu vì sao chúng ta lặp lại những hành vi mình không thực sự muốn, học cách thay đổi chúng bằng những phương pháp thực tế và từng bước lấy lại quyền chủ động đối với cuộc sống.",
  keywords: ["cai nghiện dopamine", "thói quen nguyên tử", "làm chủ sự chú ý", "ikigai", "kaizen", "cai nghiện điện thoại"],
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
