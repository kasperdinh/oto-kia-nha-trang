import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { getBaseUrl } from "@/lib/url-helper";
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
  metadataBase: new URL(getBaseUrl() as string),
  title: {
    default: "KIA Khánh Hòa | Bảng Giá & Ưu Đãi Mới Nhất",
    template: "%s | KIA Khánh Hòa",
  },
  description:
    "Showroom KIA Khánh Hòa - Chuyên cung cấp thông tin các dòng xe KIA chính hãng: Seltos, Sonet, Carnival, K3, Sportage. Cập nhật bảng giá, khuyến mãi và hỗ trợ trả góp tốt nhất tại Nha Trang, Khánh Hòa.",
  keywords: [
    "KIA Nha Trang",
    "KIA Khánh Hòa",
    "Showroom KIA Nha Trang",
    "Giá xe KIA Nha Trang",
    "Mua xe KIA trả góp Khánh Hòa",
    "KIA Morning",
    "KIA K3",
    "KIA Sonet",
    "KIA Seltos",
    "KIA Sportage",
    "KIA Sorento",
    "KIA Carnival",
  ],
  authors: [{ name: "KIA Khánh Hòa" }],
  creator: "KIA Khánh Hòa",
  publisher: "KIA Khánh Hòa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "KIA Khánh Hòa | Bảng Giá & Ưu Đãi",
    description:
      "KIA Khánh Hòa. Cung cấp thông tin các dòng xe KIA mới nhất với giá tốt nhất thị trường.",
    url: getBaseUrl(),
    siteName: "KIA Khánh Hòa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Showroom KIA Khánh Hòa",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KIA Khánh Hòa - Showroom KIA Chính Hãng",
    description:
      "Cập nhật bảng giá và ưu đãi xe KIA mới nhất tại Nha Trang, Khánh Hòa.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = getBaseUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "KIA Khánh Hòa",
    image: `${baseUrl}/og-image.jpg`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "0933806910",
    priceRange: "300.000.000 VNĐ - 2.000.000.000 VNĐ",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lô số 1, Khu vực 2, Đường 23/10, Vĩnh Hiệp",
      addressLocality: "Nha Trang",
      addressRegion: "Khánh Hòa",
      postalCode: "650000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.25701,
      longitude: 109.1354563,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/kiakhanhhoa",
      "https://zalo.me/0933806910",
    ],
  };

  return (
    <html lang="vi">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        <ContactWidget />
      </body>
    </html>
  );
}
