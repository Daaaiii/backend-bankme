import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { PrismaService } from '../database/prisma.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Assignor } from '@prisma/client';

@Injectable()
export class AssignorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAssignorDto) {
    await this.checkIfEmailExists(data.email);
    return this.prisma.assignor.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<Assignor[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma.assignor.findMany({
      take: pageSize,
      skip,
    });
  }

  async findOne(id: string) {
    await this.exists(id);
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }
  async update(id: string, data: UpdateAssignorDto) {
    const assignor = await this.prisma.assignor.findUnique({ where: { id } });
    if (!assignor) {
      throw new NotFoundException('Cedente não encontrado');
    }
    if (data.email && data.email !== assignor.email) {
      await this.checkIfEmailExists(data.email);
    }

    try {
      return this.prisma.assignor.update({ where: { id }, data });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: string) {
    if (!this.exists(id)) {
      throw new NotFoundException('Cedente não encontrado');
    }
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
  async exists(id: string) {
    if (
      !(await this.prisma.assignor.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Cedente não encontrado.`);
    }
  }
  private async checkIfEmailExists(email: string) {
    const existingAssignor = await this.prisma.assignor.findFirst({
      where: {
        email,
      },
    });

    if (existingAssignor) {
      throw new ConflictException(`Email já cadastrado.`);
    }
  }
}
