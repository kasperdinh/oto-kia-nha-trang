"use server";

import { z } from "zod";
import { submitLead } from "@/services/lead.service";

const ContactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  message: z.string().optional(),
});

const QuoteSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  carModel: z.string().min(1, "Vui lòng chọn dòng xe"),
  installment: z.string().optional(),
  location: z.string().optional(),
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
};

export async function submitContact(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const validated = ContactSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Vui lòng kiểm tra lại thông tin.",
    };
  }

  try {
    await submitLead({
      type: "CONTACT",
      name: validated.data.name,
      phone: validated.data.phone,
      message: validated.data.message || undefined,
    }); // returns Lead or throws

    return {
      success: true,
      message: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!",
    };
  } catch {
    return {
      success: false,
      message: "Gửi liên hệ thất bại. Vui lòng thử lại sau.",
    };
  }

  return {
    success: true,
    message: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!",
  };
}

export async function submitQuote(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    carModel: formData.get("carModel"),
    installment: formData.get("installment"),
    location: formData.get("location"),
  };

  const validated = QuoteSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Vui lòng kiểm tra lại thông tin.",
    };
  }

  try {
    await submitLead({
      type: "QUOTE",
      name: validated.data.name,
      phone: validated.data.phone,
      carModel: validated.data.carModel,
      installment: validated.data.installment || undefined,
      location: validated.data.location || undefined,
    });

    return {
      success: true,
      message: "Yêu cầu báo giá thành công. Chúng tôi sẽ liên hệ sớm!",
    };
  } catch {
    return {
      success: false,
      message: "Gửi yêu cầu thất bại. Vui lòng thử lại sau.",
    };
  }

  return {
    success: true,
    message: "Yêu cầu báo giá thành công. Chúng tôi sẽ liên hệ sớm!",
  };
}
