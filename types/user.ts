export type UserRole = "user" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name?: string;
  email?: string;
}
