import { Module, forwardRef } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [forwardRef(() => AuthModule), UserModule],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
