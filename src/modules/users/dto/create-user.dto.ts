import { z } from "zod";

export const createUserDto = z.object({
    email: z
        .email("Invalid email address")
        .min(1, "Email is required")
        .trim()
        .transform((value) => value.toLowerCase()),
    username: z
        .string()
        .trim()
        .min(8, "Username must be at least 8 characters long")
        .max(24, "Username is too long")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username must be only contains letters, numbers, and underscores"
        )
        .transform((value) => value.toLowerCase()),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .max(16, "Password is too long")
        .regex(/^[a-zA-Z0-9]+$/, "Password must be only contains letters, and numbers"),
    displayName: z.string().trim().min(1, "Name is required").max(24, "Name is too long"),
});

export type CreateUserDTO = z.infer<typeof createUserDto>;
