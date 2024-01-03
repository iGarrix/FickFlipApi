import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from 'src/db/users/users.module';
import { PositionsModule } from '../positions/positions.module';
import { PromocodesService } from '../promocodes/promocodes.service';

@Module({
  imports: [UsersModule, PositionsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PromocodesService],
})
export class OrdersModule {}
