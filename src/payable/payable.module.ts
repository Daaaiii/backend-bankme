import { Module, forwardRef } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bull';
import { BatchConsumerService } from './jobs/batch-consumer.service';
import { BatchProducerService } from './jobs/batch-producer.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({ name: 'batchQueue' }),
    forwardRef(() => AuthModule),
    UserModule,
  ],
  controllers: [PayableController],
  providers: [
    PayableService,
    PrismaService,
    BatchConsumerService,
    BatchProducerService,
  ],
})
export class PayableModule {}
