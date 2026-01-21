"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/Button";
import { motion } from "framer-motion";

export function Promotions() {
  return (
    <section className="bg-kia-light py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="overflow-hidden rounded-2xl bg-linear-to-br from-kia-dark to-gray-900 shadow-2xl lg:grid lg:grid-cols-2 lg:gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-6 pb-12 pt-10 sm:px-12 sm:pt-16 lg:py-16 lg:pr-0 xl:px-20 xl:py-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block text-kia-red">ƯU ĐÃI ĐẶC BIỆT</span>
                <span className="block">DÀNH CHO KHÁCH HÀNG MỚI</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-300">
                Nhận ngay gói phụ kiện chính hãng trị giá 10 triệu đồng và ưu
                đãi lệ phí trước bạ khi mua xe trong tháng này.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/bao-gia"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Nhận Báo Giá Ngay
                </Link>
                <Link
                  href="/xe"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "border-white text-white hover:bg-white hover:text-black",
                  })}
                >
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          </div>
          <div className="aspect-3/2 md:mt-0 relative min-h-75 group overflow-hidden">
            {/* Placeholder for promotion image */}

            <motion.img
              className="absolute inset-0 h-full w-full object-cover object-center lg:rounded-r-2xl transition-transform duration-700"
              src="/promotions-banner.webp"
              alt="KIA Promotion"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 via-gray-900/0 lg:bg-linear-to-l lg:from-gray-900/0 lg:via-gray-900/20 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
