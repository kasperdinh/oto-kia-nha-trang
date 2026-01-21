"use server";

import { updateLeadStatus, deleteLead, getAllLeads } from "@/services/lead.service";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/auth";

export type AdminActionState = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function updateLeadStatusAction(
  id: string,
  status: string,
): Promise<AdminActionState> {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      error: "Bạn không có quyền thực hiện hành động này",
    };
  }

  try {
    await updateLeadStatus(id, status);
    revalidatePath("/admin/leads");
    return { success: true, message: "Cập nhật trạng thái thành công" };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false, error: "Cập nhật trạng thái thất bại" };
  }
}

export async function deleteLeadAction(id: string): Promise<AdminActionState> {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      error: "Bạn không có quyền thực hiện hành động này",
    };
  }

  try {
    await deleteLead(id);
    revalidatePath("/admin/leads");
    return { success: true, message: "Xoá lead thành công" };
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return { success: false, error: "Xoá lead thất bại" };
  }
}

export async function getLeadsAction(
  page: number = 1,
  limit: number = 10,
  filters: { status?: string; type?: string; sort?: "asc" | "desc" } = {},
) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    throw new Error("Bạn không có quyền xem danh sách leads");
  }

  try {
    return await getAllLeads(page, limit, filters);
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    throw new Error("Lỗi khi tải danh sách leads");
  }
}
