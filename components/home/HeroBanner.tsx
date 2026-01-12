"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

export function HeroBanner() {
  return (
    <div className="relative bg-gray-900 min-h-150 lg:h-175 flex items-center overflow-hidden">
      {/* Background Image / Overlay - Using a solid color or gradient as fallback for now
          Replace src with actual banner image
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000"
          alt="KIA Car Banner"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-6">
            KIA MOTORS <br />
            <span className="text-kia-red">NHA TRANG</span>
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            Khám phá các dòng xe KIA mới nhất với thiết kế hiện đại, công nghệ
            tiện nghi và an toàn vượt trội. Đăng ký lái thử ngay hôm nay để trải
            nghiệm sự khác biệt.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-x-6">
            <Link
              href="/lai-thu"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Đăng ký lái thử
            </Link>
            <Link
              href="/xe"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "text-white border-white hover:bg-white hover:text-kia-dark",
              })}
            >
              Xem danh sách xe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
