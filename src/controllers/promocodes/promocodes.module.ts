import { Module } from '@nestjs/common';
import { PromocodesController } from './promocodes.controller';
import { PromocodesService } from './promocodes.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService, PrismaService],
})
export class PromocodesModule {}
