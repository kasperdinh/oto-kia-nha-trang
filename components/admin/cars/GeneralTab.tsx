/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { updateCar } from "@/app/actions/cars";
import RichTextEditor from "@/components/ui/RichTextEditor";
import ImageUpload from "@/components/admin/ui/ImageUpload";

const initialState = {
  message: "",
  errors: {},
  success: false,
};

export default function GeneralTab({ car }: { car: any }) {
  const updateCarWithSlug = updateCar.bind(null, car.slug);
  const [state, formAction] = useActionState(updateCarWithSlug, initialState);

  const [description, setDescription] = useState(car.description || "");
  const [newImageUrl, setNewImageUrl] = useState(car.imageUrl || "");

  return (
    <form action={formAction} className="space-y-6 animate-in fade-in">
      {state.message && (
        <div
          className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên xe
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={car.name}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
            />
          </div>
          {state.errors?.name && (
            <p className="text-red-600 text-xs mt-1">{state.errors.name}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Danh mục
          </label>
          <div className="mt-1">
            <select
              id="category"
              name="category"
              defaultValue={car.category || "SUV"}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-6 border-t pt-4 border-b pb-4 border-dashed border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh đại diện
          </label>
          <div className="flex items-center gap-4">
            {(newImageUrl || car.imageUrl) && (
              <div className="relative group h-20 w-32">
                <Image
                  src={newImageUrl || car.imageUrl}
                  alt="Current"
                  fill
                  className="object-cover rounded border border-gray-200"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="max-w-xs">
                <ImageUpload
                  onUploadComplete={(url) => {
                    setNewImageUrl(url);
                  }}
                  folder={`cars/${car.slug}/avatar`}
                />
              </div>

              <input
                type="hidden"
                name="imageUrl"
                value={newImageUrl || car.imageUrl || ""}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload ảnh mới để thay thế ảnh hiển thị xe ngoài trang chính.
              </p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                value="true"
                defaultChecked={car.isPublic}
                className="h-4 w-4 rounded border-gray-300 text-kia-red focus:ring-kia-red"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="isPublic" className="font-medium text-gray-700">
                Công khai
              </label>
              <p className="text-gray-500">
                Hiển thị xe này trên trang chủ và danh sách.
              </p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới thiệu
          </label>
          <RichTextEditor content={description} onChange={setDescription} />
          <input type="hidden" name="description" value={description} />
        </div>
      </div>

      <div className="flex justify-end pt-5">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-kia-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-kia-red focus:ring-offset-2"
        >
          Lưu thông tin chung
        </button>
      </div>
    </form>
  );
}
