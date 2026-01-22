"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { ActionState } from "@/app/actions/cars";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import RichTextEditor from "@/components/ui/RichTextEditor";

type CarFormProps = {
  //
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initialData?: {
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description: string;
    isPublic: boolean;
  };
  submitLabel: string;
};

const initialState: ActionState = {
  message: "",
  errors: {},
};

export function CarForm({ action, initialData, submitLabel }: CarFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  return (
    <form
      action={formAction}
      className="space-y-8 divide-y divide-gray-200 bg-white p-6 rounded-lg shadow"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
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
                  defaultValue={initialData?.name}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm h-10 px-3 border"
                />
                {state?.errors?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
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
                  defaultValue={initialData?.category || "SUV"}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm h-10 px-3 border"
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
              <div className="space-y-4">
                {imageUrl && (
                  <div className="relative group h-40 w-64">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="object-cover rounded border border-gray-200 w-full h-full"
                    />
                  </div>
                )}
                <div className="max-w-xs">
                  <ImageUpload
                    onUploadComplete={(url) => setImageUrl(url)}
                    folder="cars/temp"
                  />
                </div>
                <input type="hidden" name="imageUrl" value={imageUrl} />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mô tả
              </label>
              <RichTextEditor content={description} onChange={setDescription} />
              <input type="hidden" name="description" value={description} />
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="isPublic"
                    name="isPublic"
                    type="checkbox"
                    value="true"
                    defaultChecked={initialData?.isPublic}
                    className="h-4 w-4 rounded border-gray-300 text-kia-red focus:ring-kia-red"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="isPublic"
                    className="font-medium text-gray-700"
                  >
                    Công khai
                  </label>
                  <p className="text-gray-500">
                    Cho phép xe hiển thị trên trang chủ và danh sách xe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Button type="submit" isLoading={isPending}>
            {submitLabel}
          </Button>
        </div>
        {state?.message && !state.success && (
          <p className="mt-4 text-sm text-red-600 text-center">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
