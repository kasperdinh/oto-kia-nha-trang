"use client";

import { CarCard } from "../cars/CarCard";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CarData } from "@/lib/data/cars";

interface FeaturedCarsProps {
  cars: CarData[];
}

export function FeaturedCars({ cars = [] }: FeaturedCarsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-kia-dark sm:text-4xl">
              Xe Nổi Bật
            </h2>
            <p className="mt-4 text-gray-500">
              Những mẫu xe KIA được yêu thích nhất hiện nay.
            </p>
          </div>
          <Link
            href="/xe"
            className="hidden sm:flex items-center text-kia-red font-semibold hover:text-red-700 transition-colors"
          >
            Xem tất cả xe <ChevronRightIcon className="w-5 h-5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/xe" className={buttonVariants({ variant: "outline" })}>
            Xem tất cả xe
          </Link>
        </div>
      </div>
    </section>
  );
}
