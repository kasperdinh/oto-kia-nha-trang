/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  DocumentIcon,
  TrashIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import {
  uploadCarDocumentAction,
  deleteCarDocumentAction,
} from "@/app/actions/documents";

export default function DocumentsTab({ car }: { car: any }) {
  const [isUploading, setIsUploading] = useState(false);

  const documents = car.documents || [];

  async function handleUpload(type: "BROCHURE" | "SPEC_SHEET") {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("carId", car.id);
      formData.append("carSlug", car.slug);
      formData.append("type", type);
      formData.append("name", file.name); // Or custom name
      formData.append("file", file);

      await uploadCarDocumentAction(formData);
      setIsUploading(false);
    };
    input.click();
  }

  async function handleDelete(id: string) {
    if (!confirm("Xóa tài liệu này?")) return;
    await deleteCarDocumentAction(id);
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Tại đây bạn có thể quản lý file PDF Thông số kỹ thuật và Brochure.
              Những file này sẽ hiển thị thay thế cho bảng thông số cũ.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spec Sheet Section */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Thông số kỹ thuật (PDF)
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUpload("SPEC_SHEET")}
              isLoading={isUploading}
            >
              <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
              Upload PDF
            </Button>
          </div>

          <div className="space-y-2">
            {documents
              .filter((d: any) => d.type === "SPEC_SHEET")
              .map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <DocumentIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate max-w-xs"
                    >
                      {doc.name}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            {documents.filter((d: any) => d.type === "SPEC_SHEET").length ===
              0 && (
              <p className="text-sm text-gray-500 italic">Chưa có file nào.</p>
            )}
          </div>
        </div>

        {/* Brochure Section */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Tài liệu giới thiệu - Brochure (PDF)
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUpload("BROCHURE")}
              isLoading={isUploading}
            >
              <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
              Upload PDF
            </Button>
          </div>

          <div className="space-y-2">
            {documents
              .filter((d: any) => d.type === "BROCHURE")
              .map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <DocumentIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate max-w-xs"
                    >
                      {doc.name}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            {documents.filter((d: any) => d.type === "BROCHURE").length ===
              0 && (
              <p className="text-sm text-gray-500 italic">Chưa có file nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
