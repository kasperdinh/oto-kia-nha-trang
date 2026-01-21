"use client";

import { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  createColorAction,
  updateColorAction,
  deleteColorAction,
} from "@/app/actions/colors";
import { useRouter } from "next/navigation";

// Color Type matches Prisma model roughly
type Color = {
  id: string;
  nameVI: string;
  nameEN: string | null;
  code: string;
  hexCode: string | null;
};

export default function ColorList({ colors }: { colors: Color[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nameVI: "",
    nameEN: "",
    code: "",
    hexCode: "#000000",
  });

  const router = useRouter();

  const resetForm = () => {
    setFormData({ nameVI: "", nameEN: "", code: "", hexCode: "#000000" });
    setEditingId(null);
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleEdit = (color: Color) => {
    setFormData({
      nameVI: color.nameVI,
      nameEN: color.nameEN || "",
      code: color.code,
      hexCode: color.hexCode || "#000000",
    });
    setEditingId(color.id);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa màu này?")) return;
    await deleteColorAction(id);
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nameVI", formData.nameVI);
    if (formData.nameEN) data.append("nameEN", formData.nameEN);
    data.append("code", formData.code);
    if (formData.hexCode) data.append("hexCode", formData.hexCode);

    let res;
    if (isEditing && editingId) {
      res = await updateColorAction(editingId, {}, data);
    } else {
      res = await createColorAction({}, data);
    }

    if (res.success) {
      alert(res.message);
      resetForm();
      router.refresh();
    } else {
      alert(res.message || "Có lỗi xảy ra");
      // Show validation errors if needed
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Quản lý Màu Sắc (Master)
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Danh sách màu sắc được dùng chung cho toàn bộ hệ thống xe.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="block rounded-md bg-kia-red px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Thêm màu mới
          </button>
        </div>
      </div>

      {/* Basic Modal/Form Area */}
      {isOpen && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? "Chỉnh sửa màu" : "Thêm màu mới"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên Tiếng Việt *
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
                value={formData.nameVI}
                onChange={(e) =>
                  setFormData({ ...formData, nameVI: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên Tiếng Anh
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
                value={formData.nameEN}
                onChange={(e) =>
                  setFormData({ ...formData, nameEN: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mã màu (Code) *
              </label>
              <input
                type="text"
                required
                placeholder="VD: GWP, ABP"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mã HEX (Hiển thị)
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  className="h-9 w-9 p-0 border-0 rounded overflow-hidden cursor-pointer"
                  value={formData.hexCode}
                  onChange={(e) =>
                    setFormData({ ...formData, hexCode: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="#FFFFFF"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-kia-red focus:ring-kia-red sm:text-sm p-2 border"
                  value={formData.hexCode}
                  onChange={(e) =>
                    setFormData({ ...formData, hexCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-kia-red rounded-md hover:bg-red-700"
              >
                {isEditing ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Mã (Code)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tên Tiếng Việt
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tên Tiếng Anh
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Màu hiển thị
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Hành động</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {colors.map((color) => (
                    <tr key={color.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {color.code}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {color.nameVI}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {color.nameEN || "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {color.hexCode && (
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: color.hexCode }}
                            ></span>
                            <span>{color.hexCode}</span>
                          </div>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(color)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(color.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {colors.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-sm text-gray-500"
                      >
                        Chưa có màu sắc nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
