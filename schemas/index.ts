import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email({
        error: "Email is required to be login"
    }),
    password: z.string().min(1, "Password is required")
})