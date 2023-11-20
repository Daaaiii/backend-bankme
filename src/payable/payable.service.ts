import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePayableDto) {
    return await this.prisma.payable.create({ data });
  }

  async findAll() {
    return await this.prisma.payable.findMany({
      select: {
        id: true,
        value: true,
        emissionDate: true,
      },
    });
  }

  async findOne(id: string) {
    if (!this.exists(id)) {
      throw new NotFoundException('Pagável não encontrado');
    }
    return await this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdatePayableDto) {
    if (!this.exists(id)) {
      throw new NotFoundException('Pagável não encontrado');
    }
    return await this.prisma.payable.update({
      data,
      where: { id },
    });
  }

  async remove(id: string) {
    if (!this.exists(id)) {
      throw new NotFoundException('Pagável não encontrado');
    }
    return await this.prisma.payable.delete({ where: { id } });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.payable.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`Pagável não encontrado.`);
    }
  }
}
