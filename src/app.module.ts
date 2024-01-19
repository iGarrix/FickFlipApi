import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/authentificate/auth.module';
import { PositionsModule } from './controllers/positions/positions.module';
import { PromocodesModule } from './controllers/promocodes/promocodes.module';
import { UsersModule } from './db/users/users.module';
import { OrdersModule } from './controllers/orders/orders.module';
import { ImagesModule } from './controllers/images/images.module';
import { MainController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    PositionsModule,
    PromocodesModule,
    UsersModule,
    OrdersModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
