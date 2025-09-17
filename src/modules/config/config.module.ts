import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { loadConfiguration } from "@utils/load-config";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validate: loadConfiguration,
        }),
    ],
})
export class ConfigModule {}
