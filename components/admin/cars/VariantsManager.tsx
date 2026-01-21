/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  createVariantAction,
  deleteVariantAction,
  updateVariantAction,
  reorderVariantsAction,
} from "@/app/actions/car-variants";
import { reorderCarColorsAction } from "@/app/actions/car-colors";
import {
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/index";
import { Modal } from "@/components/ui/Modal";
import CarColorImageManager from "./CarColorImageManager";

export default function VariantsManager({
  car,
  colors,
}: {
  car: any;
  colors: any[];
}) {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  async function handleCreate(formData: FormData) {
    const res = await createVariantAction(car.id, formData);
    if (res.success) {
      setIsCreating(false);
      router.refresh();
    } else {
      alert("Error: " + res.message);
    }
  }

  async function handleReorder(fromIndex: number, toIndex: number) {
    if (!car.variants) return;
    const variants = [...car.variants];
    const [moved] = variants.splice(fromIndex, 1);
    variants.splice(toIndex, 0, moved);

    // Prepare updates
    const updates = variants.map((v: any, index: number) => ({
      id: v.id,
      order: index,
    }));

    // Optimistic UI update (optional, but relying on server refresh here)
    // Call server action
    const res = await reorderVariantsAction(updates);
    if (res.success) {
      router.refresh();
    } else {
      alert("Error reordering: " + res.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Danh sách phiên bản
        </h3>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-kia-red hover:bg-red-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Thêm phiên bản
        </button>
      </div>

      {isCreating && (
        <form
          action={handleCreate}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên phiên bản
              </label>
              <input
                name="name"
                required
                placeholder="VD: 1.4 Turbo Luxury"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá niêm yết
              </label>
              <input
                name="price"
                type="number"
                required
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá ưu đãi (nếu có)
              </label>
              <input
                name="promotionPrice"
                type="number"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-kia-red text-white rounded text-sm"
            >
              Lưu
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {car.variants?.map((variant: any, index: number) => (
            <VariantListItem
              key={variant.id}
              variant={variant}
              colors={colors}
              router={router}
              carSlug={car.slug}
              onMoveUp={
                index > 0 ? () => handleReorder(index, index - 1) : undefined
              }
              onMoveDown={
                index < (car.variants?.length || 0) - 1
                  ? () => handleReorder(index, index + 1)
                  : undefined
              }
            />
          ))}
          {(!car.variants || car.variants.length === 0) && (
            <li className="px-4 py-8 text-center text-gray-500">
              Chưa có phiên bản nào.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function ColorAssignmentForm({
  variantId,
  availableColors,
  assignedColorIds,
  onSuccess,
}: {
  variantId: string;
  availableColors: any[];
  assignedColorIds: string[];
  onSuccess: () => void;
}) {
  const [isAdding, setIsAdding] = useState(false);

  // Filter out colors that are already assigned
  const assignableColors = availableColors.filter(
    (c) => !assignedColorIds.includes(c.id),
  );

  async function handleAssign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const colorId = formData.get("colorMasterId") as string;

    if (!colorId) return;

    const { assignColorToVariantAction } =
      await import("@/app/actions/car-colors");
    const res = await assignColorToVariantAction(variantId, colorId);

    if (res.success) {
      setIsAdding(false);
      onSuccess();
    } else {
      alert(res.message);
    }
  }

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="text-xs font-semibold text-kia-red hover:underline flex items-center gap-1"
      >
        <PlusIcon className="w-3 h-3" /> Gán thêm màu
      </button>
    );
  }

  return (
    <form
      onSubmit={handleAssign}
      className="flex items-center gap-2 mt-2 animate-in fade-in slide-in-from-left-2"
    >
      <select
        name="colorMasterId"
        required
        className="text-xs border-gray-300 rounded focus:ring-kia-red focus:border-kia-red py-1 pr-8"
        autoFocus
      >
        <option value="">-- Chọn màu --</option>
        {assignableColors.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nameVI} ({c.code})
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-kia-red text-white text-xs px-2 py-1 rounded hover:bg-red-700"
      >
        Lưu
      </button>
      <button
        type="button"
        onClick={() => setIsAdding(false)}
        className="text-gray-500 text-xs hover:text-gray-700 px-1"
      >
        Hủy
      </button>
    </form>
  );
}

function VariantListItem({
  variant,
  colors,
  router,
  carSlug,
  onMoveUp,
  onMoveDown,
}: {
  variant: any;
  colors: any[];
  router: any;
  carSlug: string;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColorForImages, setSelectedColorForImages] =
    useState<any>(null);

  async function handleUpdate(formData: FormData) {
    const res = await updateVariantAction(variant.id, formData);
    if (res.success) {
      setIsEditing(false);
      router.refresh();
    } else {
      alert("Error: " + res.message);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this variant?")) return;
    await deleteVariantAction(variant.id);
    router.refresh();
  }

  async function handleColorReorder(fromIndex: number, toIndex: number) {
    if (!variant.colors) return;
    const colors = [...variant.colors];
    const [moved] = colors.splice(fromIndex, 1);
    colors.splice(toIndex, 0, moved);

    const updates = colors.map((c: any, index: number) => ({
      id: c.id,
      order: index,
    }));

    const res = await reorderCarColorsAction(updates);
    if (res.success) {
      router.refresh();
    } else {
      alert("Error reordering colors: " + res.message);
    }
  }

  return (
    <li className="px-4 py-4 sm:px-6">
      {isEditing ? (
        <form
          action={handleUpdate}
          className="space-y-3 p-3 bg-gray-50 rounded border"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Tên
              </label>
              <input
                name="name"
                defaultValue={variant.name}
                required
                className="w-full text-sm border rounded p-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Giá
              </label>
              <input
                name="price"
                type="number"
                defaultValue={variant.price}
                required
                className="w-full text-sm border rounded p-1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Giá ưu đãi
              </label>
              <input
                name="promotionPrice"
                type="number"
                defaultValue={variant.promotionPrice || ""}
                className="w-full text-sm border rounded p-1"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs px-2 py-1 bg-white border rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="text-xs px-2 py-1 bg-kia-red text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                {variant.name}
              </h4>
              <p className="text-sm text-gray-500">
                Giá: {formatCurrency(variant.price)}
                {variant.promotionPrice
                  ? ` (Ưu đãi: ${formatCurrency(variant.promotionPrice)})`
                  : ""}
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1 mr-2">
                {onMoveUp && (
                  <button
                    onClick={onMoveUp}
                    className="p-1 text-gray-400 hover:text-gray-600 border rounded hover:bg-gray-50"
                    title="Lên"
                  >
                    <ChevronUpIcon className="w-5 h-4.5" />
                  </button>
                )}
                {onMoveDown && (
                  <button
                    onClick={onMoveDown}
                    className="p-1 text-gray-400 hover:text-gray-600 border rounded hover:bg-gray-50"
                    title="Xuống"
                  >
                    <ChevronDownIcon className="w-5 h-4.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-900 border border-blue-200 px-2 py-1 rounded text-sm h-fit"
              >
                Sửa
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-900 border border-red-200 px-2 py-1 rounded text-sm h-fit"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Color Assignment UI */}
          <div className="mt-4 border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Màu sắc tùy chọn:
            </p>

            {/* List Assigned Colors */}
            <div className="flex flex-wrap gap-3 mb-3">
              {variant.colors?.map((vc: any, index: number) => (
                <div
                  key={vc.id}
                  className="inline-flex items-center px-2 py-1.5 rounded-md bg-white text-xs text-gray-700 border border-gray-200 shadow-sm gap-2"
                >
                  <div className="flex flex-row space-x-0.5">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleColorReorder(index, index - 1)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Sang trái"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                      </button>
                    )}
                    {index < (variant.colors?.length || 0) - 1 && (
                      <button
                        type="button"
                        onClick={() => handleColorReorder(index, index + 1)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Sang phải"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <span
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: vc.color.hex || "#ccc",
                    }}
                  />
                  <span>{vc.color.name}</span>

                  <button
                    onClick={async () => {
                      if (!confirm("Xóa màu này khỏi phiên bản?")) return;
                      const { removeColorFromVariantAction } =
                        await import("@/app/actions/car-colors");
                      const res = await removeColorFromVariantAction(vc.id);
                      if (res.success) {
                        router.refresh();
                      } else {
                        alert(res.message);
                      }
                    }}
                    className="text-gray-400 hover:text-red-600 rounded-full p-0.5 hover:bg-gray-100 transition-colors"
                    title="Xóa màu"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedColorForImages(vc)}
                    className="text-gray-400 hover:text-blue-600 rounded-full p-0.5 hover:bg-gray-100 transition-colors ml-1"
                    title="Quản lý ảnh"
                  >
                    <PhotoIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Assign New Color Form */}
            <ColorAssignmentForm
              variantId={variant.id}
              availableColors={colors}
              assignedColorIds={
                variant.colors?.map((c: any) => c.color.id) || []
              }
              onSuccess={() => router.refresh()}
            />
          </div>

          {/* Image Manager Modal */}
          <Modal
            isOpen={!!selectedColorForImages}
            onClose={() => setSelectedColorForImages(null)}
            title={`Quản lý ảnh: ${selectedColorForImages?.color?.name}`}
          >
            {selectedColorForImages && (
              <CarColorImageManager
                carColor={selectedColorForImages}
                carSlug={carSlug}
                colorCode={selectedColorForImages.color?.code}
                onUpdate={() => {
                  router.refresh();
                  setSelectedColorForImages(null);
                }}
              />
            )}
          </Modal>
        </>
      )}
    </li>
  );
}
