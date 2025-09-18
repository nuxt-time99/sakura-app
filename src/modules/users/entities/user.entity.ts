import { RefreshTokens } from "@modules/auth/entities/token.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
@Index("idx_user_created_at", ["created_at"])
@Index("idx_user_email", ["email"], { unique: true })
@Index("idx_user_username", ["username"], { unique: true })
export class Users {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ name: "email", type: "varchar", length: 255 })
    email: string;

    @Column({ name: "username", type: "varchar", length: 24 })
    username: string;

    @Column({ name: "display_name", type: "varchar", length: 24 })
    displayName: string;

    @Column({ name: "password", type: "varchar", length: 255 })
    password: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;

    @OneToMany(() => RefreshTokens, (token) => token.user)
    refreshTokens: RefreshTokens[];
}
