import { ConfigModule } from "@modules/config/config.module";
import { DatabaseModule } from "@modules/database/database.module";
import { HashModule } from "@modules/hash/hash.module";
import { LoggerModule } from "@modules/logger/logger.module";
import { Module } from "@nestjs/common";

@Module({
    imports: [ConfigModule, LoggerModule, DatabaseModule, HashModule],
})
export class AppModule {}
