import { Metadata } from "next";
import { CarList } from "../../../components/cars/CarList";

export const metadata: Metadata = {
  title: "Danh Sách Xe | KIA Nha Trang",
  description:
    "Khám phá các dòng xe KIA mới nhất: Morning, Soluto, K3, K5, Sonet, Seltos, Sportage, Sorento, Carnival.",
};

// Mock data - In a real app, fetch from API
const ALL_CARS = [
  {
    id: "1",
    name: "KIA Seltos",
    slug: "kia-seltos",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 604000000,
    category: "SUV",
    seats: 5,
    engine: "1.4L Turbo",
  },
  {
    id: "2",
    name: "KIA Sonet",
    slug: "kia-sonet",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 519000000,
    category: "SUV",
    seats: 5,
    engine: "1.5L Smartstream",
  },
  {
    id: "3",
    name: "KIA Carnival",
    slug: "kia-carnival",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 1189000000,
    category: "MPV",
    seats: 7,
    engine: "2.2L Diesel",
  },
  {
    id: "4",
    name: "KIA K3",
    slug: "kia-k3",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 549000000,
    category: "Sedan",
    seats: 5,
    engine: "1.6L Gamma",
  },
  {
    id: "5",
    name: "KIA Morning",
    slug: "kia-morning",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 369000000,
    category: "Hatchback",
    seats: 5,
    engine: "1.2L Kappa",
  },
  {
    id: "6",
    name: "KIA Sorento",
    slug: "kia-sorento",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    price: 999000000,
    category: "SUV",
    seats: 7,
    engine: "2.2L Diesel",
  },
];

export default function CarListPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-kia-dark sm:text-4xl mb-4">
            Danh Sách Sản Phẩm
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Lựa chọn mẫu xe phù hợp với nhu cầu và phong cách của bạn. Khám phá
            các công nghệ tiên tiến và thiết kế đẳng cấp từ KIA.
          </p>
        </div>

        <CarList cars={ALL_CARS} />
      </div>
    </div>
  );
}
