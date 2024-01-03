import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/domain/strategies/auth_jwt/auth.guard';
import { CreateOrderDto } from 'src/domain/dtos/orderDtos/create-order.dto';
import { CheckoutDto } from 'src/domain/dtos/orderDtos/checkout-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly _serv: OrdersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  async getOrders(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('take') take: number,
  ) {
    return await this._serv.GetOrdersAsync(req['user'].email, page, take);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ValidationPipe())
  async createOrder(@Req() req: Request, @Body() body: CreateOrderDto) {
    return await this._serv.createOrder(req['user'].email, body);
  }

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ValidationPipe())
  async checkoutOrders(@Req() req: Request, @Body() orderDtos: CheckoutDto) {
    const res = await orderDtos.orders.map(async (item) => {
      return await this._serv.createOrder(req['user'].email, item);
    });
    return res;
  }
}
