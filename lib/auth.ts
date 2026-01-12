import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(3), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          // Use environment variables for admin credentials
          const adminUsername = process.env.ADMIN_USERNAME;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (username === adminUsername && password === adminPassword) {
            return { id: "1", name: "Admin"};
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
