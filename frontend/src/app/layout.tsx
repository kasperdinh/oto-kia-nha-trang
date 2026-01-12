import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "KIA Nha Trang - Đại lý chính hãng",
  description: "Mua bán xe ô tô KIA chính hãng tại Nha Trang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
