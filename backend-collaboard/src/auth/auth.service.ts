import { RegisterResponseDto } from './dto/auth-response.dto';
import { User } from './../users/user.entity';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 7;

const REFRESH_TOKEN_TTL_DAYS = process.env.REFRESH_TOKEN_TTL_DAYS
  ? parseInt(process.env.REFRESH_TOKEN_TTL_DAYS)
  : 7;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(dto: RegisterAuthDto): Promise<RegisterResponseDto> {
    // check does emil already exist
    const checkEmail = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (checkEmail) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });
    await this.userRepo.save(user);

    return {
      id: user.id,
      email: user.email,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
