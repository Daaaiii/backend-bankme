import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssignorsModule } from './assignors/assignors.module';
import { PrismaService } from './database/prisma.service';
import { PayableModule } from './payable/payable.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AssignorsModule, PayableModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
