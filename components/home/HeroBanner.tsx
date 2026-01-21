"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <div className="relative bg-gray-900 min-h-150 lg:h-175 flex items-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000"
          alt="KIA Car Banner"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-kia-black/90 via-kia-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-black tracking-tighter text-white sm:text-7xl mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            KIA MOTORS <br />
            <span className="text-kia-red inline-block relative">
              NHA TRANG
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-2 bg-kia-red opacity-50 blur-sm"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p
            className="text-xl leading-8 text-gray-200 mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Khám phá các dòng xe KIA mới nhất với thiết kế hiện đại, công nghệ
            tiện nghi và an toàn vượt trội. Đăng ký lái thử ngay hôm nay để trải
            nghiệm sự khác biệt.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
