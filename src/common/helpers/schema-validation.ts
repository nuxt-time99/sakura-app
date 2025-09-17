import { loadEnvironment } from "@utils/load-env";
import { z } from "zod";

loadEnvironment();
export const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["test", "provision", "production", "development"]).default("development"),
    LOG_LEVEL: z.enum(["info", "warn", "debug", "error", "silly", "verbose"]).default("debug"),

    CLIENT_URL: z.url(),
    CORS_ORIGIN: z.url(),

    DB_PORT: z.coerce.number(),
    DB_NAME: z.string(),
    DB_HOST: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),

    ACCESS_TOKEN_SECRET_KEY: z.string().min(64),
    REFRESH_TOKEN_SECRET_KEY: z.string().min(64),
});
