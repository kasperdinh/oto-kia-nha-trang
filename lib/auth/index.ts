import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { credentialsSchema } from "@/validators/auth.validator";
import { authenticateUser } from "@/services/auth.service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        return authenticateUser(email, password);
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
  session: { strategy: "jwt" },
});
