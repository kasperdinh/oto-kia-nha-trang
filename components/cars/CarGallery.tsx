"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export function CarGallery({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 group">
        <Image
          src={images[currentImage]}
          alt={`Car view ${currentImage + 1}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prevImage}
            className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors shadow-lg"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={clsx(
              "relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
              currentImage === index
                ? "border-kia-red ring-2 ring-kia-red/20"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
