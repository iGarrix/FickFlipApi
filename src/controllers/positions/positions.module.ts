import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register()],
  providers: [PositionsService, PrismaService],
  controllers: [PositionsController],
  exports: [PositionsService],
})
export class PositionsModule {}
