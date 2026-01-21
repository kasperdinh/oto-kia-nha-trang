"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/auth";
import {
  createColor,
  updateColor,
  deleteColor as deleteColorService,
} from "@/services/color.service";

const ColorSchema = z.object({
  nameVI: z.string().min(1, "Tên màu (TV) là bắt buộc"),
  nameEN: z.string().optional(),
  code: z.string().min(1, "Mã màu là bắt buộc"),
  hexCode: z.string().optional(),
});

export type ActionState = {
  message?: string;
  errors?: Record<string, string[]>;
  success?: boolean;
};

export async function createColorAction(
  prevState: ActionState,
  formData: FormData,
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "Bạn không có quyền thực hiện hành động này.",
    };
  }

  const rawData = {
    nameVI: formData.get("nameVI"),
    nameEN: formData.get("nameEN") || undefined,
    code: formData.get("code"),
    hexCode: formData.get("hexCode") || undefined,
  };

  const validated = ColorSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Dữ liệu không hợp lệ.",
    };
  }

  try {
    await createColor(validated.data);
    revalidatePath("/admin/colors");
    return { success: true, message: "Thêm màu thành công!" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint error
      return { success: false, message: "Mã màu đã tồn tại." };
    }
    console.error(error);
    return { success: false, message: "Lỗi hệ thống khi thêm màu." };
  }
}

export async function updateColorAction(
  id: string,
  prevState: ActionState,
  formData: FormData,
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Forbidden" };
  }

  const rawData = {
    nameVI: formData.get("nameVI"),
    nameEN: formData.get("nameEN") || undefined,
    code: formData.get("code"),
    hexCode: formData.get("hexCode") || undefined,
  };

  const validated = ColorSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Data invalid",
    };
  }

  try {
    await updateColor(id, validated.data);
    revalidatePath("/admin/colors");
    return { success: true, message: "Cập nhật thành công!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Update failed." };
  }
}

export async function deleteColorAction(id: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  try {
    await deleteColorService(id);
    revalidatePath("/admin/colors");
    return { success: true, message: "Đã xóa màu." };
  } catch {
    return { success: false, message: "Lỗi khi xóa." };
  }
}
