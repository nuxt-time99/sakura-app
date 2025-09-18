import { email, z } from "zod";

export const accessTokenDto = z.object({
    sub: z.uuid(),
    email: z.email(),
});

export type AccessTokenDTO = z.infer<typeof accessTokenDto>;
