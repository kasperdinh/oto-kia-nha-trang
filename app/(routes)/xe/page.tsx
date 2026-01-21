import { Metadata } from "next";
import { CarList } from "@/components/cars/CarList";
import { getPublicCars } from "@/services/car.service";
import { toCarDTO } from "@/dtos/car.dto";

export const metadata: Metadata = {
  title: "Danh Sách Xe | KIA Khánh Hòa",
  description:
    "Khám phá các dòng xe KIA mới nhất: Morning, Soluto, K3, K5, Sonet, Seltos, Sportage, Sorento, Carnival.",
};

export const dynamic = "force-dynamic";

export default async function CarListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { data } = await getPublicCars(category);
  const cars = data.map(toCarDTO);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-kia-dark sm:text-4xl mb-4">
            Danh Sách Sản Phẩm
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Lựa chọn mẫu xe phù hợp với nhu cầu và phong cách của bạn. Khám phá
            các công nghệ tiên tiến và thiết kế đẳng cấp từ KIA.
          </p>
        </div>

        <CarList cars={cars} currentCategory={category} />
      </div>
    </div>
  );
}
