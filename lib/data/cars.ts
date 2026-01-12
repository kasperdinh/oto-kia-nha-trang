export interface CarSpec {
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
}

export interface CarData {
  id: string;
  name: string;
  slug: string;
  price: number;
  promotionPrice?: number;
  description: string;
  images: string[];
  specs: CarSpec;

  // Summary fields for listing
  category: string;
  imageUrl: string; // Main image for card
}

export const CARS: Record<string, CarData> = {
  "kia-seltos": {
    id: "1",
    name: "KIA Seltos",
    slug: "kia-seltos",
    price: 604000000,
    promotionPrice: 599000000,
    category: "SUV",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
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
    category: "SUV",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
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
    category: "MPV",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
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
    category: "Sedan",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    description:
      "KIA K3 - Sedan hạng C chuẩn mực công nghệ, thiết kế thể thao và trẻ trung.",
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
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
  "kia-morning": {
    id: "5",
    name: "KIA Morning",
    slug: "kia-morning",
    price: 369000000,
    category: "Hatchback",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    description:
      "KIA Morning - Mẫu xe đô thị nhỏ gọn, linh hoạt và tiết kiệm nhiên liệu.",
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: {
      engine: "1.2L Kappa",
      power: "83 HP",
      torque: "120 Nm",
      transmission: "4 AT",
      fuelType: "Xăng",
      fuelConsumption: "5.5L/100km",
      seats: 5,
      dimensions: {
        length: 3595,
        width: 1595,
        height: 1485,
        wheelbase: 2400,
      },
      features: ["Màn hình AVN 8 inch", "Camera lùi", "Điều hòa tự động"],
    },
  },
  "kia-sorento": {
    id: "6",
    name: "KIA Sorento",
    slug: "kia-sorento",
    price: 999000000,
    category: "SUV",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
    description:
      "KIA Sorento - SUV 7 chỗ sang trọng, mạnh mẽ và an toàn hàng đầu.",
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
    ],
    specs: {
      engine: "2.2L Smartstream Diesel",
      power: "198 HP",
      torque: "440 Nm",
      transmission: "8 DCT",
      fuelType: "Dầu",
      fuelConsumption: "6.0L/100km",
      seats: 7,
      dimensions: {
        length: 4810,
        width: 1900,
        height: 1700,
        wheelbase: 2815,
      },
      features: [
        "Màn hình 12.3 inch",
        "Camera 360",
        "Phanh tay điện tử",
        "Cần số nút xoay",
      ],
    },
  },
};

export function getAllCars() {
  return Object.values(CARS);
}

export function getCarBySlug(slug: string) {
  return CARS[slug] || null;
}
