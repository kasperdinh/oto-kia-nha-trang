"use client";

import { CarCard } from "../cars/CarCard";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline"; // Fixed import

// Mock data
const FEATURED_CARS = [
  {
    id: "1",
    name: "KIA Seltos",
    slug: "kia-seltos",
    imageUrl:
      "https://images.unsplash.com/photo-1626880556276-888e228519d5?auto=format&fit=crop&q=80&w=800",
    price: 604000000,
    category: "SUV",
    seats: 5,
    engine: "1.4L Turbo",
  },
  {
    id: "2",
    name: "KIA Sonet",
    slug: "kia-sonet",
    imageUrl:
      "https://images.unsplash.com/photo-1658428172911-39659f71c991?auto=format&fit=crop&q=80&w=800",
    price: 519000000,
    category: "SUV",
    seats: 5,
    engine: "1.5L Smartstream",
  },
  {
    id: "3",
    name: "KIA Carnival",
    slug: "kia-carnival",
    imageUrl:
      "https://images.unsplash.com/photo-1626241957262-4217351658cb?auto=format&fit=crop&q=80&w=800",
    price: 1189000000,
    category: "MPV",
    seats: 7,
    engine: "2.2L Diesel",
  },
  {
    id: "4",
    name: "KIA K3",
    slug: "kia-k3",
    imageUrl:
      "https://images.unsplash.com/photo-1594950965706-538be29d1f5e?auto=format&fit=crop&q=80&w=800",
    price: 549000000,
    category: "Sedan",
    seats: 5,
    engine: "1.6L Gamma",
  },
];

export function FeaturedCars() {
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
          {FEATURED_CARS.map((car) => (
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
