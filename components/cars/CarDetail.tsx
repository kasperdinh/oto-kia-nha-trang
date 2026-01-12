"use client";

import { CarGallery } from "./CarGallery";
import { CarSpecs } from "./CarSpecs";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";
import {
  PhoneIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import { CarData } from "@/lib/data/cars";

export function CarDetail({ car }: { car: CarData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
      {/* Left Column: Gallery & Description - Spans 2 cols */}
      <div className="lg:col-span-2 space-y-8">
        <CarGallery images={car.images} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-kia-dark mb-4">Giới thiệu</h2>
          <div className="prose prose-red max-w-none text-gray-600">
            <p>{car.description}</p>
            {/* Fallback description content if needed */}
            <p>
              {car.name} mang đến trải nghiệm lái xe vượt trội với thiết kế hiện
              đại, công nghệ tiên tiến và khả năng vận hành mạnh mẽ. Đây là sự
              lựa chọn hoàn hảo cho những ai đang tìm kiếm sự tiện nghi, an toàn
              và phong cách.
            </p>
          </div>
        </div>

        {car.specs && <CarSpecs specs={car.specs} />}
      </div>

      {/* Right Column: Pricing & CTAs - Spans 1 col */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h1 className="text-3xl font-bold text-kia-dark mb-2">
              {car.name}
            </h1>
            <div className="mb-6">
              {car.promotionPrice ? (
                <>
                  <p className="text-sm text-gray-500 line-through mb-1">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(car.price)}
                  </p>
                  <p className="text-3xl font-bold text-kia-red">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(car.promotionPrice)}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold text-kia-red">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(car.price)}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                * Giá lăn bánh tạm tính chưa bao gồm ưu đãi
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/bao-gia"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full",
                })}
              >
                Nhận Báo Giá Lăn Bánh
              </Link>
              <Link
                href="/lai-thu"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full",
                })}
              >
                Đăng Ký Lái Thử
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg text-kia-red">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Hotline tư vấn
                  </p>
                  <a
                    href="tel:0905123456"
                    className="text-lg font-bold text-kia-red hover:underline"
                  >
                    0123.123.123
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <ChatBubbleLeftIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Chat Zalo</p>
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Chat ngay
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
              Cam kết từ KIA Nha Trang
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Xe có sẵn, giao ngay
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Hỗ trợ trả góp 80%, lãi suất ưu đãi
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Bảo hành chính hãng 5 năm
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Hỗ trợ đăng ký, đăng kiểm trọn gói
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
