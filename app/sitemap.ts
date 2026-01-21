import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getBaseUrl } from "@/lib/url-helper";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // 1. Static Routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/xe`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bao-gia`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },

    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // 2. Dynamic Routes (Cars)
  let carRoutes: MetadataRoute.Sitemap = [];
  try {
    const cars = await prisma.car.findMany({
      where: {
        isPublic: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carRoutes = cars.map((car: any) => ({
      url: `${baseUrl}/xe/${car.slug}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch cars", error);
  }

  return [...staticRoutes, ...carRoutes];
}
