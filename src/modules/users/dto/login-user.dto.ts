import { z } from "zod";

export const loginUserDto = z.object({
    identifier: z
        .string()
        .min(1, "Email or username is required")
        .trim()
        .transform((value) => value.toLowerCase()),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .max(16, "Password is too long")
        .regex(/^[a-zA-Z0-9]+$/, "Password must be only contains letters and numbers only"),
});

export type LoginUserDTO = z.infer<typeof loginUserDto>;
