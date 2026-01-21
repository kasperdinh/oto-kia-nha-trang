import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CarDetail } from "@/components/cars/CarDetail";
import { getCarDetail } from "@/services/car.service";
import { toCarDetailDTO } from "@/dtos/car.dto";

// Since this is a dynamic route, we need to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const car = await getCarDetail(resolvedParams.slug);

  if (!car) {
    return {
      title: "Không tìm thấy xe",
    };
  }

  return {
    title: `${car.name} | Thông Số, Giá Lăn Bánh, Khuyến Mãi | KIA Khánh Hòa`,
    description: car.description,
  };
}

export const dynamic = "force-dynamic";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const carData = await getCarDetail(resolvedParams.slug);

  if (!carData) {
    notFound();
  }

  const car = toCarDetailDTO(carData);

  if (!car) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb could go here */}
        <CarDetail car={car} />
      </div>
    </div>
  );
}
