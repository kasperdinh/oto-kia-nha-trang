"use client";

import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { CarDetailDTO } from "@/dtos/car.dto";
import { useRouter } from "next/navigation";
import {
  addGalleryImageAction,
  deleteGalleryImageAction,
} from "@/app/actions/car-gallery";

export default function GalleryTab({ car }: { car: CarDetailDTO }) {
  const router = useRouter();

  async function handleUpload(url: string) {
    const res = await addGalleryImageAction(car.id, url);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.message);
    }
  }

  async function handleDelete(imageId: string) {
    if (!confirm("Xóa ảnh này khỏi thư viện chung?")) return;
    const res = await deleteGalleryImageAction(imageId);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.message);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Thư viện ảnh chung
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Hình ảnh không phụ thuộc vào màu sắc (Nội thất, Tính năng, Vận
          hành...)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {car.images?.map((img) => (
          <div
            key={img.id}
            className="relative group aspect-4/3 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
          >
            <Image
              src={img.url}
              alt="Gallery Image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white hover:text-red-700"
              title="Xóa ảnh"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {(!car.images || car.images.length === 0) && (
        <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Chưa có ảnh nào trong thư viện chung.</p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thêm ảnh mới vào thư viện
        </label>
        <div className="max-w-xs">
          <ImageUpload
            onUploadComplete={handleUpload}
            folder={`cars/${car.slug}/gallery`}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
