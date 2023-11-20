import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        login: data.login,
      },
    });
    if (existingUser) {
      throw new ConflictException(`Este login já está em uso por outro usuário.`);
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({ data });
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({});
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: string) {
    return this.getUserById(id);
  }

  private async checkIfLoginExists(login: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });

    if (existingUser) {
      throw new ConflictException(`Este login já está em uso por outro usuário.`);
    }
  }

  async update(id: string, { name, login, password }: UpdateUserDto) {
    const user = await this.getUserById(id);

    if (login && login !== user.login) {
      await this.checkIfLoginExists(login);
    }

    const data: any = {};
    if (login) {
      data.login = login.trim();
    }
    if (name) {
      data.name = name.trim();
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: string) {
    const userExists = await this.exists(id);

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: string) {
    const userCount = await this.prisma.user.count({
      where: {
        id,
      },
    });

    return userCount > 0;
  }
}
