import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email({
        error: "Email is required to be login"
    }),
    password: z.string().min(1, "Password is required")
})

export const RegisterSchema = z.object({
    email: z.email({
        error: "Email is required to be registered"
    }),
    password: z.string().min(6, "Minimum 6 characters required"),
    name: z.string().min(1, "Name is required"),
})