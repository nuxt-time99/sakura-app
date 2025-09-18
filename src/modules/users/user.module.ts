import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { HashService } from "@modules/hash/hash.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { HashModule } from "@modules/hash/hash.module";

@Module({
    imports: [HashModule, TypeOrmModule.forFeature([Users])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
