import { prisma } from "@/lib/prisma";
import { CarQuery } from "@/types/car";
import { Prisma } from "@prisma/client";

export async function findCars(query: CarQuery, isPublicOnly: boolean) {
  // Build where clause based on query and visibility
  const where = {
    brand: query.brand
      ? { contains: query.brand, mode: "insensitive" as const }
      : undefined,
    category: query.category
      ? { contains: query.category, mode: "insensitive" as const }
      : undefined,
    isPublic: isPublicOnly ? true : undefined,
  };

  // Execute query
  return prisma.car.findMany({
    where,
    include: {
      variants: {
        select: {
          price: true,
          promotionPrice: true,
        },
        orderBy: {
          price: "asc",
        },
      },
      images: {
        take: 1,
      },
    },
    take: query.limit,
    skip: (query.page - 1) * query.limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function countCars(query: CarQuery, isPublicOnly: boolean) {
  const where = {
    brand: query.brand
      ? { contains: query.brand, mode: "insensitive" as const }
      : undefined,
    category: query.category
      ? { contains: query.category, mode: "insensitive" as const }
      : undefined,
    isPublic: isPublicOnly ? true : undefined,
  };
  return prisma.car.count({ where });
}

export async function findCarBySlug(slug: string) {
  return prisma.car.findUnique({
    where: { slug },
    include: {
      variants: {
        orderBy: [{ order: "asc" }, { price: "asc" }],
        include: {
          colors: {
            orderBy: {
              order: "asc",
            },
            include: {
              colorMaster: true,
              images: true,
            },
          },
        },
      },
      images: true,
      documents: true,
    },
  });
}

export async function createCarRepository(data: Prisma.CarCreateInput) {
  return prisma.car.create({
    data,
  });
}

export async function updateCarRepository(
  slug: string,
  data: Prisma.CarUpdateInput,
) {
  return prisma.car.update({
    where: { slug },
    data,
  });
}

export async function deleteCarRepository(slug: string) {
  return prisma.car.delete({
    where: { slug },
  });
}
