import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/repositories/user.repository";

export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || !user.password) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return user;
}
