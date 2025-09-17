import { loadConfiguration } from "@utils/load-config";

const data = loadConfiguration(process.env);

export const env = {
    app: {
        port: data.PORT,
        nodeEnv: data.NODE_ENV,
        logLevel: data.LOG_LEVEL,
    },
    url: {
        client: data.CLIENT_URL,
        origin: data.CORS_ORIGIN,
    },
    db: {
        port: data.DB_PORT,
        name: data.DB_NAME,
        host: data.DB_HOST,
        username: data.DB_USERNAME,
        password: data.DB_PASSWORD,
    },
    key: {
        accessToken: data.ACCESS_TOKEN_SECRET_KEY,
        refreshToken: data.REFRESH_TOKEN_SECRET_KEY,
    },
};
