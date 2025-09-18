import { env } from "@helpers/validation";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: env.db.host,
            port: env.db.port,
            database: env.db.name,
            password: env.db.password,
            username: env.db.username,
            entities: [],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
