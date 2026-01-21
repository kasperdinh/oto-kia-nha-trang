import { notFound } from "next/navigation";
import { getCarDetail } from "@/services/car.service";
import { getAllColors } from "@/services/color.service";
import CarEditor from "@/components/admin/cars/CarEditor";
import DeleteCarButton from "@/components/admin/cars/DeleteCarButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditCarPage(props: Props) {
  const params = await props.params;

  // Parallel fetch
  const [rawCar, colors] = await Promise.all([
    getCarDetail(params.slug),
    getAllColors(),
  ]);

  if (!rawCar) {
    notFound();
  }

  const { toCarDetailDTO } = await import("@/dtos/car.dto");
  const car = toCarDetailDTO(rawCar);

  return (
    <div className="mx-auto py-8 text-left">
      <div className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Chỉnh sửa: {car.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý chi tiết xe, phiên bản và màu sắc.
          </p>
        </div>
        <DeleteCarButton slug={car.slug} />
      </div>

      <CarEditor car={car} colors={colors} />
    </div>
  );
}
