"use client";

import { useState, useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { uploadImageAction } from "@/app/actions/upload";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  className?: string;
  folder?: string;
}

export default function ImageUpload({
  onUploadComplete,
  className = "",
  folder = "uploads",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await uploadImageAction(formData);

      if (res.success && res.url) {
        onUploadComplete(res.url);
      } else {
        alert(res.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`
            flex items-center justify-center gap-2 px-4 py-2
            bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kia-red
            disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isUploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang tải lên...
          </>
        ) : (
          <>
            <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
            <span>Upload Ảnh</span>
          </>
        )}
      </button>
    </div>
  );
}
