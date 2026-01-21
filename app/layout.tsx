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

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { ContactWidget } from "@/components/layout/ContactWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://kiakhanhhoa.vercel.app"),
  title: "KIA Khánh Hòa - Giới thiệu xe ô tô KIA chính hãng tại Khánh Hòa",
  description:
    "Giới thiệu xe ô tô KIA chính hãng tại Khánh Hòa. Cập nhật bảng giá xe KIA mới nhất, ưu đãi và khuyến mãi hấp dẫn.",
  openGraph: {
    title: "KIA Khánh Hòa",
    description: "Giới thiệu xe ô tô KIA chính hãng tại Khánh Hòa",
    url: "https://kiakhanhhoa.vercel.app",
    siteName: "KIA Khánh Hòa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
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
        <ContactWidget />
      </body>
    </html>
  );
}
