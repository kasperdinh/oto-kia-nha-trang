"use server";

import { getCurrentUser } from "@/lib/auth/auth";
import { deleteFile, extractKey } from "@/lib/s3";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ImageActionResponse = {
  success: boolean;
  message: string;
};

export async function addGalleryImageAction(
  carId: string,
  url: string,
): Promise<ImageActionResponse> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const objectKey = extractKey(url);

    if (!objectKey) {
      return {
        success: false,
        message: "Failed to extract key from uploaded URL",
      };
    }

    await prisma.carImage.create({
      data: {
        carId: carId,
        url: objectKey,
      },
    });

    revalidatePath("/admin/cars");
    // We don't know the slug here easily unless passed, but we can revalidate all cars
    // or fetch slug. For now, revalidating list is good.
    // Ideally we should receive slug too if we want to revalidate specific page
    // But client will router.refresh() anyway.
    return { success: true, message: "Image added to gallery" };
  } catch (error) {
    console.error("Gallery add error:", error);
    return { success: false, message: "Failed to add image" };
  }
}

export async function deleteGalleryImageAction(
  imageId: string,
): Promise<ImageActionResponse> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const image = await prisma.carImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return { success: false, message: "Image not found" };
    }

    // Delete from S3
    await deleteFile(image.url);

    // Delete from DB
    await prisma.carImage.delete({
      where: { id: imageId },
    });

    revalidatePath("/admin/cars");
    return { success: true, message: "Deleted successfully" };
  } catch (error) {
    console.error("Gallery delete error:", error);
    return { success: false, message: "Delete failed" };
  }
}
