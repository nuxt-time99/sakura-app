import { ConfigModule } from "@modules/config/config.module";
import { LoggerModule } from "@modules/logger/logger.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [ConfigModule, LoggerModule],
})
export class AppModule {}
