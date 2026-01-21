"use server";

import { uploadFile, deleteFile } from "@/lib/s3";

/**
 * Server action to upload an image to S3
 */
export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return { success: false, message: "No file provided" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a unique filename
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const key = `${folder}/${timestamp}-${cleanName}`;

    const url = await uploadFile(buffer, key, file.type);

    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, message: "Upload failed" };
  }
}

/**
 * Server action to delete an image from S3
 */
export async function deleteImageAction(url: string) {
  try {
    await deleteFile(url);
    return { success: true, message: "Deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, message: "Delete failed" };
  }
}
