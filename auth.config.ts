import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        // if user doesn't have password, they use other providers
        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) return user;

        return null;
      }
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;