import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CarDetail } from "../../../../components/cars/CarDetail";

// Since this is a dynamic route, we need to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const car = getCarBySlug(resolvedParams.slug);

  if (!car) {
    return {
      title: "Không tìm thấy xe",
    };
  }

  return {
    title: `${car.name} | Thông Số, Giá Lăn Bánh, Khuyến Mãi | KIA Nha Trang`,
    description: car.description,
  };
}

// Define CarData interface for mock data
interface CarData {
  id: string;
  name: string;
  slug: string;
  price: number;
  promotionPrice?: number;
  description: string;
  images: string[];
  specs: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    fuelType: string;
    fuelConsumption: string;
    seats: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
      wheelbase: number;
    };
    features: string[];
  };
}

// Mock data fetcher
function getCarBySlug(slug: string) {
  // This would typically fetch from an API
  const vehicles: Record<string, CarData> = {
    "kia-seltos": {
      id: "1",
      name: "KIA Seltos",
      slug: "kia-seltos",
      price: 604000000,
      promotionPrice: 599000000,
      description:
        "KIA Seltos - Mẫu SUV đô thị dẫn đầu xu hướng với thiết kế mạnh mẽ, thể thao, nhiều tiện nghi cao cấp và khả năng vận hành linh hoạt.",
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
      ],
      specs: {
        engine: "1.4L Turbo",
        power: "138 HP",
        torque: "242 Nm",
        transmission: "7 DCT",
        fuelType: "Xăng",
        fuelConsumption: "6.3L/100km",
        seats: 5,
        dimensions: {
          length: 4315,
          width: 1800,
          height: 1645,
          wheelbase: 2610,
        },
        features: [
          "Màn hình giải trí 10.25 inch",
          "Đèn Moodlight",
          "Cửa sổ trời",
          "Làm mát ghế",
        ],
      },
    },
    "kia-sonet": {
      id: "2",
      name: "KIA Sonet",
      slug: "kia-sonet",
      price: 519000000,
      description:
        "KIA Sonet - SUV Đô thị nhỏ gọn, năng động và thông minh. Thiết kế hiện đại, gầm cao linh hoạt.",
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
      ],
      specs: {
        engine: "1.5L Smartstream",
        power: "113 HP",
        torque: "144 Nm",
        transmission: "IVT",
        fuelType: "Xăng",
        fuelConsumption: "5.7L/100km",
        seats: 5,
        dimensions: {
          length: 4120,
          width: 1790,
          height: 1642,
          wheelbase: 2500,
        },
        features: [
          "Sạc không dây",
          "Đề nổ từ xa",
          "Cửa sổ trời",
          "Màn hình 10.25 inch",
        ],
      },
    },
    "kia-carnival": {
      id: "3",
      name: "KIA Carnival",
      slug: "kia-carnival",
      price: 1189000000,
      description:
        "KIA Carnival - SUV đô thị cỡ lớn, sang trọng và đẳng cấp. Tiện nghi hàng đầu phân khúc.",
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
      ],
      specs: {
        engine: "2.2L Smartstream Diesel",
        power: "199 HP",
        torque: "440 Nm",
        transmission: "8 AT",
        fuelType: "Dầu",
        fuelConsumption: "7.0L/100km",
        seats: 7,
        dimensions: {
          length: 5155,
          width: 1995,
          height: 1775,
          wheelbase: 3090,
        },
        features: [
          "Ghế thương gia",
          "Cửa trượt điện",
          "Màn hình kép 12.3 inch",
          "ADAS cao cấp",
        ],
      },
    },
    "kia-k3": {
      id: "4",
      name: "KIA K3",
      slug: "kia-k3",
      price: 549000000,
      description:
        "KIA K3 - Sedan hạng C chuẩn mực công nghệ, thiết kế thể thao và trẻ trung.",
      images: [
        "https://images.unsplash.com/photo-1594950965706-538be29d1f5e?auto=format&fit=crop&q=80&w=1200",
      ],
      specs: {
        engine: "1.6L Gamma",
        power: "126 HP",
        torque: "155 Nm",
        transmission: "6 AT",
        fuelType: "Xăng",
        fuelConsumption: "6.5L/100km",
        seats: 5,
        dimensions: {
          length: 4640,
          width: 1800,
          height: 1450,
          wheelbase: 2700,
        },
        features: [
          "Sạc không dây",
          "Cốp điện thông minh",
          "Làm mát ghế",
          "Cửa sổ trời",
        ],
      },
    },
    // Add more mocks as needed...
  };

  return vehicles[slug] || null;
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const car = getCarBySlug(resolvedParams.slug);

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
