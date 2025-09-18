import { BadRequestException } from "@exception/bad-request.exception";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import argon from "argon2";

@Injectable()
export class HashService {
    private readonly MIN_LENGHT_PASSWORD: number = 8;

    private validate(value: string, hashType: "PASSWORD" | "TOKEN") {
        if (hashType === "PASSWORD") {
            if (value.length < this.MIN_LENGHT_PASSWORD) {
                throw new BadRequestException(
                    `Password must be at least ${this.MIN_LENGHT_PASSWORD}`
                );
            }
        } else if (hashType === "TOKEN") {
            if (!value.trim()) {
                throw new UnauthorizedException("Token is missing or invalid");
            }
        }

        return value;
    }

    public async hashPassword(password: string): Promise<string> {
        const validatedValue = this.validate(password, "PASSWORD");
        return await argon.hash(validatedValue);
    }

    public async hashToken(token: string): Promise<string> {
        const validatedValue = this.validate(token, "TOKEN");
        return await argon.hash(validatedValue);
    }

    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const validatedValue = this.validate(password, "PASSWORD");
        return await argon.verify(hashedPassword, validatedValue);
    }

    public async verifyToken(token: string, hashedToken: string): Promise<boolean> {
        const validatedValue = this.validate(token, "TOKEN");
        return await argon.verify(hashedToken, validatedValue);
    }
}
