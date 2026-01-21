"use client";

import { CarGallery } from "./CarGallery";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import {
  PhoneIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { CarDetailDTO, CarVariantDTO, CarColorDTO } from "@/dtos/car.dto";

export function CarDetail({ car }: { car: CarDetailDTO }) {
  const [selectedVariant, setSelectedVariant] = useState<CarVariantDTO | null>(
    car.variants?.[0] || null,
  );

  // Initialize color based on variant
  const [selectedColor, setSelectedColor] = useState<{
    color: CarColorDTO;
    images: { id: string; url: string }[];
  } | null>(car.variants?.[0]?.colors?.[0] || null);

  // Handle variant change
  const handleVariantChange = (variant: CarVariantDTO) => {
    setSelectedVariant(variant);

    // Update color when variant changes
    if (variant.colors && variant.colors.length > 0) {
      // Try to keep the same color code if it exists in the new variant
      const sameColor = variant.colors.find(
        (c) => c.color.code === selectedColor?.color.code,
      );
      setSelectedColor(sameColor || variant.colors[0]!);
    } else {
      setSelectedColor(null);
    }
  };

  // Derived state
  const currentPrice = selectedVariant ? selectedVariant.price : car.price;
  const currentPromotionPrice = selectedVariant
    ? selectedVariant.promotionPrice
    : car.promotionPrice;
  const generalImages = car.images?.map((img) => img.url) || [];
  const colorImages =
    selectedColor && selectedColor.images && selectedColor.images.length > 0
      ? selectedColor.images.map((img) => img.url)
      : [];

  // Combine: Color images first, then general images
  // Use Set to remove duplicates if any image URL appears in both
  const currentImages = Array.from(new Set([...colorImages, ...generalImages]));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 xl:gap-12">
      {/* 1. Gallery - Order 1 on Mobile, Top-Left on Desktop */}
      <div className="order-1 lg:col-span-2">
        <CarGallery images={currentImages} />
      </div>

      {/* 2. Pricing & CTAs - Order 2 on Mobile, Right Sidebar on Desktop */}
      <div className="order-2 lg:col-span-1 lg:row-span-3">
        <div className="sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
            {/* Title & Badge */}
            <div className="mb-3 border-b border-gray-100 pb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {car.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-kia-red">
                  {selectedVariant ? selectedVariant.name : "Tiêu chuẩn"}
                </span>
                {car.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {car.category}
                  </span>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {currentPromotionPrice ? (
                  <>
                    <p className="text-lg text-gray-400 line-through">
                      {formatPrice(currentPrice)}
                    </p>
                    <p className="text-3xl xl:text-4xl font-extrabold text-kia-red tracking-tight">
                      {formatPrice(currentPromotionPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl xl:text-4xl font-extrabold text-kia-red tracking-tight">
                    {formatPrice(currentPrice)}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic flex items-center gap-1">
                <InformationCircleIcon className="w-4 h-4 text-gray-400" />
                Giá niêm yết (chưa bao gồm ưu đãi & lăn bánh)
              </p>
            </div>

            {/* Variants Selector */}
            {car.variants && car.variants.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 mb-3 block uppercase tracking-wide">
                  Phiên bản
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {car.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleVariantChange(v)}
                      className={clsx(
                        "relative w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex justify-between items-center group",
                        selectedVariant?.id === v.id
                          ? "border-kia-red bg-red-50/50 text-kia-red ring-1 ring-kia-red"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                      )}
                    >
                      <span className="font-medium">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selector */}
            {selectedVariant &&
              selectedVariant.colors &&
              selectedVariant.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Màu sắc
                    </label>
                  </div>

                  <div className="pl-1 flex flex-wrap gap-3">
                    {selectedVariant.colors.map((c) => (
                      <button
                        key={c.color.id}
                        onClick={() => setSelectedColor(c)}
                        className={clsx(
                          "group relative p-0.5 rounded-full transition-all duration-200 ease-out",
                          selectedColor?.color.id === c.color.id
                            ? "ring-2 ring-offset-0 ring-kia-red scale-110"
                            : "hover:scale-110 hover:ring-1 hover:ring-offset-0 hover:ring-gray-300",
                        )}
                        title={`${c.color.name}`}
                      >
                        <span className="sr-only">{c.color.name}</span>
                        <div
                          className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                          style={{
                            backgroundColor: c.color.hex || "#ccc",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Detailed Color Info */}
                  {selectedColor && (
                    <div className="mt-4 p-4 bg-gray-50/80 rounded-xl border border-gray-100 text-sm space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                        <span className="text-gray-500 font-medium">
                          Mã màu
                        </span>
                        <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                          {selectedColor.color.code}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                        <span className="text-gray-500 font-medium">
                          Tên Tiếng Việt
                        </span>
                        <span className="font-medium text-gray-700 text-right">
                          {selectedColor.color.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">
                          Tên Tiếng Anh
                        </span>
                        <span className="font-medium text-gray-700 text-right">
                          {selectedColor.color.englishName || "N/A"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* CTAs */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Link
                href="/bao-gia"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full h-14 text-base font-bold",
                })}
              >
                NHẬN BÁO GIÁ LĂN BÁNH
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:0933806910"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:bg-red-50 hover:text-kia-red hover:border-red-100 transition-all group"
                >
                  <PhoneIcon className="w-6 h-6 mb-1 text-gray-500 group-hover:text-kia-red transition-colors" />
                  <span className="text-xs font-bold">0933.806.910</span>
                </a>

                <a
                  href="https://zalo.me/0933806910"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all group"
                >
                  <ChatBubbleLeftIcon className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs font-bold">Chat Zalo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Commitment Card */}
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheckIcon className="w-32 h-32" />
            </div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
              <ShieldCheckIcon className="w-6 h-6 text-kia-red" />
              Cam kết chính hãng
            </h3>
            <ul className="space-y-3 relative z-10">
              {[
                "Hỗ trợ trả góp lên đến 85%",
                "Bảo hành 5 năm",
                "Hỗ trợ đăng ký trọn gói",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 items-center text-sm text-gray-300"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-kia-red text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Introduction & Specs - Order 3 on Mobile, Bottom-Left on Desktop */}
      <div className="order-3 lg:col-span-2 space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-kia-dark mb-4">Giới thiệu</h2>
          <div className="prose prose-red max-w-none text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: car.description }} />
            {/* Fallback description content if needed */}
            {!car.description && (
              <p>
                {car.name} mang đến trải nghiệm lái xe vượt trội với thiết kế
                hiện đại, công nghệ tiên tiến và khả năng vận hành mạnh mẽ. Đây
                là sự lựa chọn hoàn hảo cho những ai đang tìm kiếm sự tiện nghi,
                an toàn và phong cách.
              </p>
            )}
          </div>
        </div>

        {/* Documents / Specs Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {car.documents?.find((d) => d.type === "SPEC_SHEET") ? (
            <a
              href={car.documents.find((d) => d.type === "SPEC_SHEET")?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full flex items-center justify-center gap-2",
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              Xem thông số kỹ thuật
            </a>
          ) : (
            <button
              disabled
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full opacity-50 cursor-not-allowed",
              })}
            >
              Đang cập nhật thông số kỹ thuật
            </button>
          )}

          {car.documents?.find((d) => d.type === "BROCHURE") ? (
            <a
              href={car.documents.find((d) => d.type === "BROCHURE")?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "w-full flex items-center justify-center gap-2",
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              Xem tài liệu giới thiệu
            </a>
          ) : (
            <button
              disabled
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full opacity-50 cursor-not-allowed",
              })}
            >
              Đang cập nhật tài liệu giới thiệu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
