import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: (this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ??
          '15m') as JwtSignOptions['expiresIn'],
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ??
          '7d') as JwtSignOptions['expiresIn'],
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {
    try {
      const user = await this.usersService.create(dto.name, dto.email, dto.password);
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const matches = await bcrypt.compare(password, user.passwordHash);
      if (!matches) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.validateUser(dto.email, dto.password);
      const tokens = await this.getTokens(user.id, user.email);
      await this.usersService.setRefreshTokenHash(user.id, tokens.refreshToken);

      return {
        ...tokens,
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to login');
    }
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    try {
      const user = await this.usersService.getUserIfRefreshTokenMatches(
        userId,
        refreshToken,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.usersService.setRefreshTokenHash(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to refresh tokens');
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      await this.usersService.setRefreshTokenHash(userId, null);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to logout');
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch profile');
    }
  }
}
