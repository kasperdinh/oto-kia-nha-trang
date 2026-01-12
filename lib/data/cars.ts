import prisma from "@/lib/prisma";

export interface CarSpec {
  engine: string | null;
  power: string | null;
  torque: string | null;
  transmission: string | null;
  fuelType: string | null;
  fuelConsumption: string | null;
  seats: number | null;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
    wheelbase: number | null;
  };
  features: string[];
}

export interface CarData {
  id: string;
  name: string;
  slug: string;
  price: number;
  promotionPrice?: number | null;
  description: string;
  images: string[];
  specs: CarSpec | null;

  // Summary fields for listing
  category: string | null;
  imageUrl: string | null; // Main image for card
}

// Helper to map Prisma result to CarData interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPrismaCarToCarData(car: any): CarData {
  let parsedFeatures: string[] = [];
  if (car.specs?.features) {
    try {
      parsedFeatures = JSON.parse(car.specs.features);
    } catch {
      parsedFeatures = [];
    }
  }

  return {
    id: car.id,
    name: car.name,
    slug: car.slug,
    price: car.price,
    promotionPrice: car.promotionPrice,
    description: car.description,
    category: car.category,
    imageUrl: car.imageUrl,
    images: car.images.map((img: { url: string }) => img.url),
    specs: car.specs
      ? {
          engine: car.specs.engine,
          power: car.specs.power,
          torque: car.specs.torque,
          transmission: car.specs.transmission,
          fuelType: car.specs.fuelType,
          fuelConsumption: car.specs.fuelConsumption,
          seats: car.specs.seats,
          dimensions: {
            length: car.specs.length,
            width: car.specs.width,
            height: car.specs.height,
            wheelbase: car.specs.wheelbase,
          },
          features: parsedFeatures,
        }
      : null,
  };
}

export async function getAllCars(): Promise<CarData[]> {
  try {
    const cars = await prisma.car.findMany({
      include: {
        specs: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return cars.map(mapPrismaCarToCarData);
  } catch (error) {
    console.error("Error fetching all cars:", error);
    return [];
  }
}

export async function getCarBySlug(slug: string): Promise<CarData | null> {
  try {
    const car = await prisma.car.findUnique({
      where: { slug },
      include: {
        specs: true,
        images: true,
      },
    });

    if (!car) return null;

    return mapPrismaCarToCarData(car);
  } catch (error) {
    console.error(`Error fetching car with slug ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedCars(): Promise<CarData[]> {
  try {
    // For now, simple logic: get first 4 cars
    const cars = await prisma.car.findMany({
      include: {
        specs: true,
        images: true,
      },
      orderBy: {
        price: "desc", // Just an example sort
      },
      take: 4,
    });
    return cars.map(mapPrismaCarToCarData);
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    return [];
  }
}
