import { Module, forwardRef } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), UserModule],
  controllers: [AssignorsController],
  providers: [AssignorsService, PrismaService],
})
export class AssignorsModule {}
