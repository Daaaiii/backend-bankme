import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.JWTService.sign(
        {
          id: user.id,
          login: user.login,
        },
        {
          expiresIn: '1 minute',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(login: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
    if (password != user.password) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }
}
