"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export function CarGallery({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImages, setPrevImages] = useState(images);

  // Reset to first image when image list changes (Render-time update)
  if (images !== prevImages) {
    setPrevImages(images);
    setCurrentImage(0);
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  // Safeguard: Ensure currentImage is within bounds
  const safeIndex = currentImage >= images.length ? 0 : currentImage;
  const activeUrl = images[safeIndex];

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
          key={activeUrl} // Force re-render on image change to prevent stale image artifact
          src={activeUrl}
          alt={`Car view ${safeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority // Eager load the main image
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="p-2 rounded-full bg-white/80 text-gray-900 hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-10">
          {safeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            onClick={() => setCurrentImage(index)}
            className={clsx(
              "relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
              safeIndex === index
                ? "border-kia-red ring-2 ring-kia-red/20 opacity-100"
                : "border-transparent opacity-60 hover:opacity-100",
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
