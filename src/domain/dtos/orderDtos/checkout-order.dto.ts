import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsArray, Max, Min } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class CheckoutDto {
  @ApiProperty({
    isArray: true,
    type: CreateOrderDto,
  })
  @IsArray()
  @Min(1, { message: 'Orders must be at least 1' })
  @Max(30, { message: `Orders must be no more 30` })
  orders: CreateOrderDto[];
}
