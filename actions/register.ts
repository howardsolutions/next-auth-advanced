"use server";

import { RegisterSchema } from "@/schemas";
import z from "zod";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, email, password } = validatedFields.data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check the email is not taken
    const isExistingUser = await getUserByEmail(email);

    if (isExistingUser) {
        return { error: "Email is already in use!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // VERIFY real human after register 
    // 1) generate token
    const verificationToken = await generateVerificationToken(email);
    
    // 2) Send verification token email

    return { success: "Confirmation Email Sent to your inbox!" }
} 