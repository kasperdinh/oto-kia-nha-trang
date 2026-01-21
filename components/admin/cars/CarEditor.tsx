"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

import DocumentsTab from "./DocumentsTab";
import GeneralTab from "./GeneralTab";
import VariantsManager from "./VariantsManager";
import GalleryTab from "./GalleryTab";

// Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Car = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Color = any;

export default function CarEditor({
  car,
  colors,
}: {
  car: Car;
  colors: Color[];
}) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "Thông tin chung", icon: InformationCircleIcon },
    { id: "variants", name: "Phiên bản & Giá", icon: DocumentDuplicateIcon },
    { id: "documents", name: "Tài liệu (PDF)", icon: DocumentIcon },
    { id: "gallery", name: "Thư viện ảnh chung", icon: PhotoIcon },
  ];

  return (
    <div className="bg-white shadow sm:rounded-lg min-h-150 flex flex-col">
      <div className="border-b border-gray-200">
        <nav
          className="-mb-px flex space-x-8 px-6 overflow-x-auto"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-kia-red text-kia-red"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <tab.icon
                className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${activeTab === tab.id ? "text-kia-red" : "text-gray-400 group-hover:text-gray-500"}
                `}
                aria-hidden="true"
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 flex-1">
        {activeTab === "general" && <GeneralTab car={car} />}
        {activeTab === "variants" && (
          <VariantsManager car={car} colors={colors} />
        )}
        {activeTab === "documents" && <DocumentsTab car={car} />}
        {activeTab === "gallery" && <GalleryTab car={car} />}
      </div>
    </div>
  );
}
