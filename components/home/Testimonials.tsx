"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Tôi rất hài lòng với dịch vụ tại KIA Nha Trang. Nhân viên nhiệt tình, tư vấn chuyên nghiệp. Xe giao đúng hẹn và đầy đủ phụ kiện như cam kết.",
    author: "Nguyễn Văn A",
    role: "Khách hàng mua xe Seltos",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: 2,
    quote:
      "Thủ tục mua xe trả góp rất nhanh chóng và đơn giản. Cảm ơn bạn tư vấn bán hàng đã hỗ trợ tôi rất nhiệt tình.",
    author: "Trần Thị B",
    role: "Khách hàng mua xe K3",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: 3,
    quote:
      "Xe KIA đẹp, nhiều option, giá cả hợp lý. Showroom rộng rãi, hiện đại. Sẽ giới thiệu bạn bè đến mua xe tại đây.",
    author: "Lê Văn C",
    role: "Khách hàng mua xe Carnival",
    rating: 4,
    avatar: null, // Test case without avatar
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 50 },
  },
};

export function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-kia-dark sm:text-4xl">
            Khách hàng nói gì về chúng tôi?
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Sự hài lòng của khách hàng là động lực phát triển của KIA Nha Trang.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <motion.div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={item}
                className="rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-x-1 text-accent-gold">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-accent-gold"
                          : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-900 mt-4">
                  <p className="italic text-gray-700">{`"${testimonial.quote}"`}</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-x-4 border-t border-gray-100 pt-4">
                  {testimonial.avatar ? (
                    <div className="relative h-10 w-10 rounded-full bg-gray-50 overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-kia-red to-red-800 flex items-center justify-center text-white font-bold shadow-sm">
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm leading-6 text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
