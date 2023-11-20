import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
          name: user.name,
          login: user.login,
        },
        {
          expiresIn: '1 minute',
          subject: String(user.id),
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
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Login e/ou senha incorretos.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Login e/ou senha incorretos');
    }

    return this.createToken(user);
  }
}
