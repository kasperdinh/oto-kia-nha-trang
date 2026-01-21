"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CarCard } from "./CarCard";
import { Button } from "@/components/ui/Button";

import { CarDTO } from "@/dtos/car.dto";

const CATEGORIES = ["Tất cả", "SUV", "Sedan", "Hatchback"];

export function CarList({
  cars,
  currentCategory = "Tất cả",
}: {
  cars: CarDTO[];
  currentCategory?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "Tất cả") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/xe?${params.toString()}`);
  };

  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentCategory === category ||
              (!currentCategory && category === "Tất cả")
                ? "bg-kia-red text-white shadow-md transform scale-105"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {cars.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            Không tìm thấy dòng xe nào trong danh mục này.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => handleCategoryChange("Tất cả")}
          >
            Xem tất cả xe
          </Button>
        </div>
      )}
    </div>
  );
}
