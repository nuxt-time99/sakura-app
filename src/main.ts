import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "@helpers/validation";
import { Logger } from "nestjs-pino";
import { GlobalExceptionFilters } from "@filters/global-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(Logger));
    app.useGlobalFilters(new GlobalExceptionFilters());
    app.listen(env.app.port);
}

bootstrap();
