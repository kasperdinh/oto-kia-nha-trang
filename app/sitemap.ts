import { MetadataRoute } from "next";
import prisma from "../lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use VERCEL_URL if available, otherwise localhost or fixed domain
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  // Static routes
  const routes = [
    "",
    "/xe",
    "/bao-gia",
    "/lai-thu",
    "/lien-he",
    "/gioi-thieu",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Cars)
  // Check if DB is available (might fail during build if not seeded/connected)
  let carRoutes: MetadataRoute.Sitemap = [];
  try {
    const cars = await prisma.car.findMany();
    carRoutes = cars.map((car) => ({
      url: `${baseUrl}/xe/${car.slug}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.warn("Could not fetch cars for sitemap generation", error);
  }

  return [...routes, ...carRoutes];
}
