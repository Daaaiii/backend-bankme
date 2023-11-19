import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AssignorsController],
  providers: [AssignorsService, PrismaService],
})
export class AssignorsModule {}
