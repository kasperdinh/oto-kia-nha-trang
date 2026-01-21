"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { ActionState } from "@/app/actions/cars";

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

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Giá niêm yết (VNĐ)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={initialData?.price}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm h-10 px-3 border"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Danh mục (Sedan, SUV, Hatchback...)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="category"
                  id="category"
                  defaultValue={initialData?.category}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm h-10 px-3 border"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Link hình ảnh
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  defaultValue={initialData?.imageUrl}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm h-10 px-3 border"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Mô tả
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={initialData?.description}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-3 border"
                />
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
