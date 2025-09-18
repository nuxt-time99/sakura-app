import { z } from "zod";

export const refreshTokenDto = z.object({
    sub: z.uuid(),
    email: z.email(),
    tokenHash: z.string(),
    userAgent: z.string().optional(),
    ipAddress: z.ipv4().optional(),
    isRevoked: z.boolean().default(false),
});

export type RefreshTokenDTO = z.infer<typeof refreshTokenDto>;
