import { auth } from "./index";
import { UserRole } from "@/types/user";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;

  return {
    id: session.user.id!,
    role: (session.user.role as UserRole) ?? "user",
    email: session.user.email ?? undefined,
    name: session.user.name ?? undefined,
  };
}
