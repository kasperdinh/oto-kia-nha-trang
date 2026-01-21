export interface CarImage {
  id: string;
  url: string;
  carId: string;
}

export interface CarSpec {
  id: string;
  carId: string;
  engine: string | null;
  power: string | null;
  torque: string | null;
  transmission: string | null;
  fuelType: string | null;
  fuelConsumption: string | null;
  seats: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  wheelbase: number | null;
  features: string;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  price: number;
  promotionPrice: number | null;
  description: string;
  category: string | null;
  brand: string | null;
  isPublic: boolean;
  seats: number | null;
  engine: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;

  images?: CarImage[];
  specs?: CarSpec | null;
  variants?: CarVariant[];
}

export interface CarColor {
  id: string;
  name: string;
  code: string;
  englishName?: string;
  hex?: string;
}

export interface CarVariant {
  id: string;
  name: string;
  price: number;
  promotionPrice: number | null;
  colors?: {
    color: CarColor;
    images: string[];
  }[];
}

export type CarQuery = {
  brand?: string;
  category?: string;
  sortBy?: "latest" | "price_asc" | "price_desc";
  page: number;
  limit: number;
};
