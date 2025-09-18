import { Users } from "@modules/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("refresh_tokens")
@Index("idx_refresh_tokens_revoked_at", ["revoked_at", "is_revoked"])
export class RefreshTokens {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ name: "token_hash", type: "varchar", length: 255 })
    tokenHash: string;

    @Column({ name: "user_agent", type: "varchar", length: 255, nullable: true })
    userAgent: string;

    @Column({ name: "ip_address", type: "varchar", length: 255, nullable: true })
    ipAddress: string;

    @Column({ name: "is_revoked", type: "boolean", default: false })
    isRevoked: boolean;

    @Column({ name: "expired_at", type: "timestamp" })
    expiredAt: Date;

    @Column({ name: "revoked_at", type: "timestamp", nullable: true })
    revokedAt?: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Users, (user) => user.refreshTokens, { onDelete: "CASCADE" })
    user: Users;
}
