import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    name: 'status',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsString()
  payment: string;

  @ApiProperty()
  @IsString()
  positionCode: string;

  @ApiProperty({
    name: 'promo',
    type: String,
    required: false,
  })
  promo: string;
}
