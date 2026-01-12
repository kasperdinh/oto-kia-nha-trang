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

// Placeholder type definition suitable for UI display
interface Car {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  category: string;
  seats: number;
  engine: string;
}

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
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
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl group-hover:text-kia-red transition-colors">
          <Link href={`/xe/${car.slug}`}>{car.name}</Link>
        </CardTitle>
        <div className="text-sm text-gray-500 font-medium flex gap-2">
          <span>{car.seats} chỗ</span>
          <span>•</span>
          <span>{car.engine}</span>
        </div>
      </CardHeader>

      <CardContent className="py-2 grow">
        <p className="text-lg font-bold text-kia-dark">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(car.price)}
        </p>
        <p className="text-xs text-gray-400 mt-1">Giá niêm yết</p>
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
