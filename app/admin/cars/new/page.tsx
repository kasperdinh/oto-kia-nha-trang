"use client";

import { createCar } from "@/app/actions/cars";
import { CarForm } from "@/components/admin/cars/CarForm";

export default function NewCarPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Thêm xe mới
          </h2>
        </div>
      </div>

      <CarForm action={createCar} submitLabel="Lưu xe" />
    </div>
  );
}
