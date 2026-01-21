import {
  findCars,
  findCarBySlug,
  createCarRepository,
  updateCarRepository,
  deleteCarRepository,
} from "@/repositories/car.repository";

// Helper to map relational car to flat structure for lists
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCarToList(car: any) {
  return {
    ...car,
    price: car.variants?.[0]?.price ?? 0,
    promotionPrice: car.variants?.[0]?.promotionPrice ?? null,
    imageUrl: car.imageUrl ?? car.images?.[0]?.url ?? null,
  };
}

export async function getCarDetail(slug: string) {
  return findCarBySlug(slug);
}

export async function getAllCars(category?: string) {
  const query = { page: 1, limit: 100, category };
  const cars = await findCars(query, false);
  return { data: cars.map(mapCarToList) };
}

export async function getPublicCars(category?: string) {
  const query = { page: 1, limit: 100, category };
  const cars = await findCars(query, true);
  return { data: cars.map(mapCarToList) };
}

export async function getHighLightCars() {
  const cars = await findCars({ page: 1, limit: 4 }, true);
  return { data: cars.map(mapCarToList) };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCar(data: any) {
  // Transform flat input (from Admin Form) to Relational Create
  const carCreateData = {
    slug: data.slug,
    name: data.name,
    category: data.category,
    description: data.description,
    isPublic: data.isPublic,
    // Create default variant "Standard"
    variants: {
      create: {
        name: "Standard",
        price: data.price || 0,
      },
    },
    // Create default image
    imageUrl: data.imageUrl,
  };

  return createCarRepository(carCreateData);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCar(slug: string, data: any) {
  const updateData = {
    name: data.name,
    category: data.category,
    description: data.description,
    isPublic: data.isPublic,
    imageUrl: data.imageUrl,
  };

  return updateCarRepository(slug, updateData);
}

export async function deleteCar(slug: string) {
  return deleteCarRepository(slug);
}
