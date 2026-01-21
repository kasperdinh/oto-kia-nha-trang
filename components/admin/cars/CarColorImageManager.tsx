/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

"use client";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import {
  addImageToCarColorAction,
  removeImageFromCarColorAction,
} from "@/app/actions/car-colors";

interface CarColorImageManagerProps {
  carColor: any;
  onUpdate: () => void;
  carSlug?: string;
  colorCode?: string;
}

export default function CarColorImageManager({
  carColor,
  onUpdate,
  carSlug,
  colorCode,
}: CarColorImageManagerProps) {
  async function handleUpload(url: string) {
    const res = await addImageToCarColorAction(carColor.id, url);
    if (res.success) {
      onUpdate();
    } else {
      alert(res.message);
    }
  }

  async function handleDelete(imageId: string) {
    if (!confirm("Xóa ảnh này?")) return;
    const res = await removeImageFromCarColorAction(imageId);
    if (res.success) {
      onUpdate();
    } else {
      alert(res.message);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {carColor.images?.map((img: any) => (
          <div
            key={img.id}
            className="relative group h-32 bg-gray-100 rounded overflow-hidden"
          >
            <Image
              src={img.url}
              alt="Car Color Image"
              fill
              className="object-cover"
              sizes="100px"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Empty state or upload trigger */}
        {(!carColor.images || carColor.images.length === 0) && (
          <div className="col-span-3 text-center py-4 text-gray-400 text-sm border-2 border-dashed rounded">
            Chưa có ảnh chi tiết cho màu này
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thêm ảnh mới
        </label>
        <ImageUpload
          onUploadComplete={handleUpload}
          folder={
            carSlug && colorCode
              ? `cars/${carSlug}/colors/${colorCode}`
              : `cars/variants/${carColor.variantId}`
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
