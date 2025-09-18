import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";
import { HashService } from "@modules/hash/hash.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { BadRequestException } from "@exception/bad-request.exception";
import { randomInt } from "crypto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { NotFoundException } from "@exception/not-found.exception";
import { LoginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class UserService {
    constructor(
        private hashService: HashService,
        @InjectRepository(Users) private userRepository: Repository<Users>
    ) {}

    private randomizeName(): string {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";

        const firstChar = letters[randomInt(0, letters.length)].toUpperCase();
        const middlePart = Array.from(
            { length: 8 },
            () => letters[randomInt(0, letters.length)]
        ).join("");
        const numberPart = Array.from(
            { length: 3 },
            () => numbers[randomInt(0, numbers.length)]
        ).join("");

        return firstChar + middlePart + numberPart;
    }

    private normalize<T extends { email?: string; username?: string; identifier?: string }>(
        data: T
    ) {
        return {
            ...data,
            email: data.email?.toLowerCase(),
            username: data.username?.toLowerCase(),
            identifier: data.identifier?.toLowerCase(),
        };
    }

    public async create(data: CreateUserDTO) {
        const normalized = this.normalize(data);

        const existingUser = await this.userRepository.findOne({
            where: [{ email: normalized.email }, { username: normalized.username }],
        });

        if (existingUser) {
            if (existingUser.email === normalized.email) {
                throw new BadRequestException("Email is already taken");
            } else if (existingUser.username === normalized.username) {
                throw new BadRequestException("Username is already taken");
            }
        }

        const hashedPassword = await this.hashService.hashPassword(normalized.password);
        const user = this.userRepository.create({
            email: normalized.email,
            password: hashedPassword,
            username: normalized.username,
            displayName: this.randomizeName(),
        });

        await this.userRepository.save(user);
        const { password: _, ...safeUser } = user;

        return safeUser;
    }

    public async update(userId: string, data: UpdateUserDTO) {
        const normalized = this.normalize(data);

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) throw new NotFoundException("User not found");

        if (normalized.email || normalized.username) {
            const existingUser = await this.userRepository.findOne({
                where: [{ email: normalized.email }, { username: normalized.username }],
            });

            if (existingUser && existingUser.id !== userId) {
                if (existingUser.email === normalized.email) {
                    throw new BadRequestException("Email is already taken");
                } else if (existingUser.username === normalized.username) {
                    throw new BadRequestException("Username is already taken");
                }
            }
        }

        this.userRepository.merge(user, normalized);
        await this.userRepository.save(user);

        const { password: _, ...safeUser } = user;

        return safeUser;
    }

    public async updatePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) throw new NotFoundException("User not found");

        const isMatch = await this.hashService.verifyPassword(oldPassword, user.password);
        if (!isMatch) throw new UnauthorizedException("Password is incorrect");

        const hashedPassword = await this.hashService.hashPassword(newPassword);
        this.userRepository.merge(user, { password: hashedPassword });

        await this.userRepository.save(user);
        const { password: _, ...safeUser } = user;

        return safeUser;
    }

    public async login(data: LoginUserDTO) {
        const normalized = this.normalize(data);
        const where = normalized.identifier.includes("@")
            ? { email: normalized.identifier }
            : { username: normalized.identifier };

        const user = await this.userRepository.findOne({ where });
        if (!user) throw new NotFoundException("User not found");

        const isMatch = await this.hashService.verifyPassword(normalized.password, user.password);
        if (!isMatch) throw new UnauthorizedException("Password is incorrect");

        const { password: _, ...safeUser } = user;

        return safeUser;
    }

    public async delete(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found");

        await this.userRepository.delete({ id: userId });
    }
}
