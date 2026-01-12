"use client";

import { useState } from "react";
import { CarCard } from "./CarCard";
import { Button } from "../ui/Button";

// Extended Car Interface for List
interface CarSummary {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  category: string;
  seats: number;
  engine: string;
}

const CATEGORIES = ["Tất cả", "Sedan", "SUV", "MPV", "Hatchback"];

export function CarList({ cars }: { cars: CarSummary[] }) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredCars =
    activeCategory === "Tất cả"
      ? cars
      : cars.filter((car) => car.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-kia-red text-white shadow-md transform scale-105"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            Không tìm thấy dòng xe nào trong danh mục này.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveCategory("Tất cả")}
          >
            Xem tất cả xe
          </Button>
        </div>
      )}
    </div>
  );
}
