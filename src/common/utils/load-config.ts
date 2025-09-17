import { z } from "zod";
import { envSchema } from "@helpers/schema-validation";
import { ServerException } from "@exception/server.exception";

export function loadConfiguration(schema: Record<string, unknown>) {
    const parsed = envSchema.safeParse(schema);

    if (!parsed.success) {
        console.warn("Failed to load environment variables:", z.prettifyError(parsed.error));
        throw new ServerException("Failed to load environment variables");
    }

    return parsed.data;
}
