import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        name,
        email,
        passwordHash,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async setRefreshTokenHash(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    try {
      const hashedRefreshToken = refreshToken
        ? await bcrypt.hash(refreshToken, 10)
        : null;
      await this.usersRepository.update(userId, { hashedRefreshToken });
    } catch {
      throw new InternalServerErrorException('Failed to update refresh token');
    }
  }

  async getUserIfRefreshTokenMatches(
    userId: string,
    refreshToken: string,
  ): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user || !user.hashedRefreshToken) {
      return null;
    }

    const matches = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
    return matches ? user : null;
  }
}
