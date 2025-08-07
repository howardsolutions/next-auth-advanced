import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token
        },
        
        async signIn({user, account}) {
            // Allow OAuth provider bypass (without) email verification extra step

            if (account?.provider !== "credentials") {
                return true; // true means continuing to login
            }
            
            // Otherwise, if the user is not verified their email ,BLOCK them from logging in 
            const existingUser = await getUserById(user.id as string);

            if (!existingUser?.emailVerified) return false;

            // TODO: 2FA Check


            // By Default
            return true;
        },
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    ...authConfig
});