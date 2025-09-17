import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

export function loadEnvironment() {
    const currentEnv = process.env.NODE_ENV || "development";
    const envFile = `.env.${currentEnv}`;
    const envPath = path.resolve(process.cwd(), envFile);

    if (fs.existsSync(envPath)) {
        console.warn(`Loaded environment variables from ${envFile}`);
        dotenv.config({ path: envPath });
    } else {
        console.warn("Loaded environment from default .env");
        dotenv.config();
    }
}
