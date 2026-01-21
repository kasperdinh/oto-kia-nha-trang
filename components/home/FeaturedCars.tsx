"use client";

import { CarCard } from "../cars/CarCard";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CarDTO } from "@/dtos/car.dto";
import { motion } from "framer-motion";

interface FeaturedCarsProps {
  cars: CarDTO[];
}

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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 50 },
  },
};

export function FeaturedCars({ cars = [] }: FeaturedCarsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-kia-dark sm:text-4xl">
              Xe Nổi Bật
            </h2>
            <p className="mt-4 text-gray-500">
              Những mẫu xe KIA được yêu thích nhất hiện nay.
            </p>
          </motion.div>
          <Link
            href="/xe"
            className="hidden sm:flex items-center text-kia-red font-semibold hover:text-red-700 transition-colors group"
          >
            Xem tất cả xe{" "}
            <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cars.map((car) => (
            <motion.div key={car.id} variants={item} className="h-full">
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/xe" className={buttonVariants({ variant: "outline" })}>
            Xem tất cả xe
          </Link>
        </div>
      </div>
    </section>
  );
}
