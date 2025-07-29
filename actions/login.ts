"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_AFTER_LOGIN
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" }

                default:
                    return { error: "Something went wrong!" }
            }
        }

        // Must throw error in order to redirect when using SignIn from nextauth instead of server actions
        throw error
    }

    return { success: "Login successfully!" }
}