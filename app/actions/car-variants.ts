"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/auth";
import { z } from "zod";

const VariantSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  promotionPrice: z.coerce.number().optional(),
});

export async function createVariantAction(carId: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    promotionPrice: formData.get("promotionPrice") || undefined,
  };

  const validated = VariantSchema.safeParse(rawData);
  if (!validated.success) return { success: false, message: "Invalid data" };

  try {
    await prisma.carVariant.create({
      data: {
        carId,
        name: validated.data.name,
        price: validated.data.price,
        promotionPrice: validated.data.promotionPrice,
      },
    });
    revalidatePath("/admin/cars");
    return { success: true, message: "Created variant" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating variant" };
  }
}

export async function deleteVariantAction(variantId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  try {
    await prisma.carVariant.delete({ where: { id: variantId } });
    revalidatePath("/admin/cars");
    return { success: true, message: "Deleted variant" };
  } catch {
    return { success: false, message: "Error deleting variant" };
  }
}

export async function updateVariantAction(
  variantId: string,
  formData: FormData,
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    promotionPrice: formData.get("promotionPrice") || undefined,
  };

  const validated = VariantSchema.safeParse(rawData);
  if (!validated.success) return { success: false, message: "Invalid data" };

  try {
    await prisma.carVariant.update({
      where: { id: variantId },
      data: {
        name: validated.data.name,
        price: validated.data.price,
        promotionPrice: validated.data.promotionPrice,
      },
    });
    revalidatePath("/admin/cars");
    return { success: true, message: "Updated variant" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating variant" };
  }
}

export async function reorderVariantsAction(
  updates: { id: string; order: number }[],
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  try {
    await prisma.$transaction(
      updates.map(({ id, order }) =>
        prisma.carVariant.update({
          where: { id },
          data: { order },
        }),
      ),
    );
    revalidatePath("/admin/cars");
    return { success: true, message: "Reordered variants" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error reordering variants" };
  }
}
