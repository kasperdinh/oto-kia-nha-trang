"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/auth";
import prisma from "@/lib/prisma";
import { uploadFile, extractKey } from "@/lib/s3";

const DocumentSchema = z.object({
  carId: z.string().min(1),
  type: z.enum(["BROCHURE", "SPEC_SHEET"]),
  name: z.string().min(1),
});

export async function uploadCarDocumentAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  const file = formData.get("file") as File;
  const carId = formData.get("carId") as string;
  const carSlug = formData.get("carSlug") as string;
  const type = formData.get("type") as "BROCHURE" | "SPEC_SHEET";
  const name = formData.get("name") as string;

  if (!file || file.size === 0) {
    return { success: false, message: "File is required" };
  }

  const validated = DocumentSchema.safeParse({ carId, type, name });
  if (!validated.success) {
    return { success: false, message: "Invalid data" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "pdf";
    const folder = carSlug ? `cars/${carSlug}/documents` : `documents/${carId}`;
    const key = `${folder}/${Date.now()}.${ext}`;
    const url = await uploadFile(buffer, key, file.type);

    await prisma.carDocument.create({
      data: {
        carId,
        type,
        name,
        url: extractKey(url),
      },
    });

    revalidatePath("/admin/cars");
    return { success: true, message: "Upload thành công" };
  } catch (error) {
    console.error("Upload document error:", error);
    return { success: false, message: "Lỗi khi upload file" };
  }
}

export async function deleteCarDocumentAction(id: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return { success: false, message: "Forbidden" };

  try {
    const doc = await prisma.carDocument.findUnique({ where: { id } });
    if (!doc) return { success: false, message: "Not found" };

    // Try to delete from S3 (optional, might want to keep or soft delete)
    // Extract key from URL if possible, or simple fire and forget
    // Assuming S3 URL format... logic to extract key not strictly generic here
    // For now, just database delete to be safe.

    await prisma.carDocument.delete({ where: { id } });
    revalidatePath("/admin/cars");
    return { success: true, message: "Đã xóa tài liệu" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Lỗi khi xóa" };
  }
}

import { getPresignedUrl } from "@/lib/s3";

export async function getDocumentUrlAction(urlOrKey: string) {
  try {
    let key = urlOrKey;
    if (urlOrKey.startsWith("http")) {
      try {
        const urlObj = new URL(urlOrKey);
        key = urlObj.pathname.substring(1);
      } catch {
        // If invalid URL, assume it's already a key or invalid
      }
    }

    // Decode key in case it was URL encoded
    key = decodeURIComponent(key);

    const signedUrl = await getPresignedUrl(key);
    return { success: true, url: signedUrl };
  } catch (error) {
    console.error("Presigned URL Error:", error);
    return { success: false, message: "Could not generate link" };
  }
}
