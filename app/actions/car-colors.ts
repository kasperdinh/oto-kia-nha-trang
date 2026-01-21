"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

// Assign a Master Color to a specific Car Variant
export async function assignColorToVariantAction(
  variantId: string,
  colorMasterId: string,
) {
  try {
    // Check if it already exists
    const existing = await prisma.carColor.findUnique({
      where: {
        variantId_colorMasterId: {
          variantId,
          colorMasterId,
        },
      },
    });

    if (existing) {
      return {
        success: false,
        message: "Màu này đã được gán cho phiên bản rồi.",
      };
    }

    await prisma.carColor.create({
      data: {
        variantId,
        colorMasterId,
      },
    });

    revalidatePath("/admin/cars/[slug]", "page");
    return { success: true, message: "Đã gán màu thành công" };
  } catch (error) {
    console.error("Error assigning color:", error);
    return { success: false, message: "Lỗi khi gán màu" };
  }
}

// Remove a color assignment from a variant
export async function removeColorFromVariantAction(carColorId: string) {
  try {
    await prisma.carColor.delete({
      where: { id: carColorId },
    });

    revalidatePath("/admin/cars/[slug]", "page");
    return { success: true, message: "Đã xóa màu khỏi phiên bản" };
  } catch (error) {
    console.error("Error removing color:", error);
    return { success: false, message: "Lỗi khi xóa màu" };
  }
}

// Add an image to a CarColor
export async function addImageToCarColorAction(
  carColorId: string,
  url: string,
) {
  try {
    await prisma.carImage.create({
      data: {
        carColorId,
        url,
      },
    });

    revalidatePath("/admin/cars/[slug]", "page");
    return { success: true, message: "Thêm ảnh thành công" };
  } catch (error) {
    console.error("Error adding image:", error);
    return { success: false, message: "Lỗi khi thêm ảnh" };
  }
}

// Remove an image from a CarColor
export async function removeImageFromCarColorAction(carImageId: string) {
  try {
    await prisma.carImage.delete({
      where: { id: carImageId },
    });

    revalidatePath("/admin/cars/[slug]", "page");
    return { success: true, message: "Xóa ảnh thành công" };
  } catch (error) {
    console.error("Error removing image:", error);
    return { success: false, message: "Lỗi khi xóa ảnh" };
  }
}

export async function reorderCarColorsAction(
  updates: { id: string; order: number }[],
) {
  try {
    await prisma.$transaction(
      updates.map(({ id, order }) =>
        prisma.carColor.update({
          where: { id },
          data: { order },
        }),
      ),
    );
    revalidatePath("/admin/cars/[slug]", "page");
    return { success: true, message: "Reordered colors" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error reordering colors" };
  }
}
