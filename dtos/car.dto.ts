import { Car } from "@/types/car";
import { toCloudFrontUrl } from "@/lib/s3";

export interface CarDTO {
  id: string;
  name: string;
  price: number;
  promotionPrice: number | null;
  category: string | null;
  imageUrl: string | null;
  slug: string;
  isPublic: boolean;
  createdAt: string;
}

export interface DocumentDTO {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface CarColorDTO {
  id: string;
  name: string;
  code: string;
  englishName?: string;
  hex?: string;
}

export interface CarVariantDTO {
  id: string;
  name: string;
  price: number;
  promotionPrice: number | null;
  colors: {
    id: string;
    color: CarColorDTO;
    images: {
      id: string;
      url: string;
    }[];
  }[];
}

export interface CarDetailDTO extends CarDTO {
  description: string;
  images: { id: string; url: string }[];
  documents: DocumentDTO[];
  variants: CarVariantDTO[];
}

// Use Pick for the input because list queries only select specific fields
export type CarSummaryInput = Pick<
  Car,
  | "id"
  | "name"
  | "price"
  | "promotionPrice"
  | "category"
  | "imageUrl"
  | "slug"
  | "createdAt"
>;

export function toCarDTO(
  car: CarSummaryInput & { isPublic?: boolean },
): CarDTO {
  return {
    id: car.id,
    name: car.name,
    price: car.price,
    promotionPrice: car.promotionPrice ?? null,
    category: car.category ?? null,
    imageUrl: toCloudFrontUrl(car.imageUrl) ?? null,
    slug: car.slug,
    isPublic: car.isPublic ?? true,
    createdAt: car.createdAt.toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCarDetailDTO(car: any): CarDetailDTO {
  const base: CarDTO = {
    id: car.id,
    name: car.name,
    price: car.variants?.[0]?.price ?? 0,
    promotionPrice: car.variants?.[0]?.promotionPrice ?? null,
    category: car.category ?? null,
    imageUrl:
      toCloudFrontUrl(car.imageUrl) ??
      toCloudFrontUrl(car.images?.[0]?.url) ??
      null,
    slug: car.slug,
    isPublic: car.isPublic,
    createdAt: car.createdAt?.toISOString() || new Date().toISOString(),
  };

  return {
    ...base,
    description: car.description || "",
    images:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      car.images?.map((img: any) => ({
        id: img.id,
        url: toCloudFrontUrl(img.url),
      })) || [],
    documents:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      car.documents?.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        url: toCloudFrontUrl(doc.url),
      })) || [],
    variants:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      car.variants?.map((v: any) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        promotionPrice: v.promotionPrice,
        colors:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          v.colors?.map((c: any) => ({
            id: c.id,
            color: {
              id: c.colorMaster.id,
              name: c.colorMaster.nameVI,
              code: c.colorMaster.code,
              englishName: c.colorMaster.nameEN,
              hex: c.colorMaster.hexCode,
            },
            images:
              c.images?.map((img: { id: string; url: string }) => ({
                id: img.id,
                url: toCloudFrontUrl(img.url),
              })) || [],
          })) || [],
      })) || [],
  };
}
