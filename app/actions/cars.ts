"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/auth";
import { uploadFile, extractKey } from "@/lib/s3";

export type ActionState = {
  message?: string;
  errors?: Record<string, string[]>;
  success?: boolean;
};

const CreateCarSchema = z.object({
  name: z.string().min(1, "Tên xe không được để trống"),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  category: z.string().min(1),
  // imageUrl is optional now because we might upload a file
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.coerce.boolean(),
});

// ... inside functions ...

export async function createCar(prevState: ActionState, formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  // Function to slugify name
  function slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/[^\w-]+/g, "") // remove all non-word chars
      .replace(/--+/g, "-") // replace multiple - with single -
      .trim();
  }

  // 1. Initial Data Extraction
  const imageFile = formData.get("imageFile") as File;
  // If we have a file, we can't expect imageUrl to be set yet, or it might be set but irrelevant.
  // We'll validate the REST of the data first.

  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl") as string | undefined, // Might be empty if file upload
    description: formData.get("description"),
    isPublic: formData.get("isPublic") === "true",
  };

  // 2. Validate
  const validated = CreateCarSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Vui lòng kiểm tra lại thông tin.",
    };
  }

  // 3. Generate Slug
  const slug = slugify(
    validated.data.name + "-" + Date.now().toString().slice(-4),
  );

  // 4. Handle Image Upload (Now we have slug)
  let finalImageUrl = validated.data.imageUrl;

  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = imageFile.name.split(".").pop() || "jpg";
      // Use structured path: cars/{slug}/avatar/...
      const key = `cars/${slug}/avatar/${Date.now()}.${ext}`;
      const uploadedUrl = await uploadFile(buffer, key, imageFile.type);
      finalImageUrl = extractKey(uploadedUrl);
    } catch (e) {
      console.error("Upload error", e);
      return { success: false, message: "Lỗi upload ảnh" };
    }
  }

  // 5. Service Call
  try {
    const { createCar: createCarService } =
      await import("@/services/car.service");
    await createCarService({
      name: validated.data.name,
      price: validated.data.price,
      category: validated.data.category,
      imageUrl: finalImageUrl,
      description: validated.data.description || "",
      isPublic: validated.data.isPublic,
      slug: slug,
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Lỗi khi tạo xe. Vui lòng thử lại.",
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/xe");
  redirect("/admin/cars");
}

const UpdateCarSchema = CreateCarSchema.omit({ price: true });

export async function updateCar(
  slug: string,
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

  // Handle Image Upload (Optional Update)
  const imageFile = formData.get("imageFile") as File;
  let imageUrl = formData.get("imageUrl") as string;

  if (imageFile && imageFile.size > 0) {
    try {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = imageFile.name.split(".").pop() || "jpg";
      // Use structured path: cars/{slug}/avatar/...
      const key = `cars/${slug}/avatar/${Date.now()}.${ext}`;
      imageUrl = await uploadFile(buffer, key, imageFile.type);
    } catch (e) {
      console.error("Upload error", e);
      return { success: false, message: "Lỗi upload ảnh" };
    }
  }

  const rawData = {
    name: formData.get("name"),
    category: formData.get("category"),
    imageUrl: extractKey(imageUrl),
    description: formData.get("description"),
    isPublic: formData.get("isPublic") === "true",
  };

  const validated = UpdateCarSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Vui lòng kiểm tra lại thông tin.",
    };
  }

  try {
    const { updateCar: updateCarService } =
      await import("@/services/car.service");

    // Construct Prisma Update Input
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      // Using any cast to avoid explicit Prisma type import in server action if clumsy
      name: validated.data.name,
      category: validated.data.category,
      description: validated.data.description || "",
      isPublic: validated.data.isPublic,
    };

    // If new image, add to images relation
    // For simplicity, we create a new image entry.
    // Ideally we might want to flag it as "primary" but currently just adding to list.
    if (validated.data.imageUrl) {
      updateData.imageUrl = validated.data.imageUrl;
    }

    await updateCarService(slug, updateData);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Lỗi khi cập nhật xe. Vui lòng thử lại.",
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath(`/admin/cars/${slug}`);
  revalidatePath("/xe");
  revalidatePath(`/xe/${slug}`);
  redirect("/admin/cars");
}

export async function deleteCar(slug: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "Bạn không có quyền thực hiện hành động này.",
    };
  }

  try {
    const { deleteCar: deleteCarService } =
      await import("@/services/car.service");
    await deleteCarService(slug);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Lỗi khi xóa xe.",
    };
  }

  revalidatePath("/admin/cars");
  revalidatePath("/xe");
  redirect("/admin/cars");
}
