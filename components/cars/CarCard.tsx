"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { buttonVariants } from "../ui/Button";

import { CarData } from "@/lib/data/cars";

interface CarCardProps {
  car: CarData;
}

export function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {/* Placeholder for when no image is available, or use next/image */}
        {car.imageUrl ? (
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="bg-kia-red text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase">
            {car.category}
          </span>
        </div>
        {car.promotionPrice && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              Ưu đãi
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pt-3 pb-1 px-3 grow">
        <CardTitle className="text-lg font-bold group-hover:text-kia-red transition-colors line-clamp-2">
          <Link href={`/xe/${car.slug}`}>{car.name}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-3 px-3 grow">
        <p className="text-xs text-gray-400 mt-1">Giá niêm yết</p>
        <div className="flex items-baseline gap-2">
          {car.promotionPrice ? (
            <>
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(car.price)}
              </p>
              <p className="text-lg font-bold text-kia-red">
                {formatPrice(car.promotionPrice)}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-kia-dark">
              {formatPrice(car.price)}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 pt-2">
        <Link
          href={`/xe/${car.slug}`}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "w-full",
          })}
        >
          Chi tiết
        </Link>
        <Link
          href="/bao-gia"
          className={buttonVariants({
            variant: "primary",
            size: "sm",
            className: "w-full",
          })}
        >
          Báo giá
        </Link>
      </CardFooter>
    </Card>
  );
}
