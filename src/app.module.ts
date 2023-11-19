import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssignorsModule } from './assignors/assignors.module';
import { PrismaService } from './database/prisma.service';



@Module({
  imports: [ConfigModule.forRoot(), AssignorsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
