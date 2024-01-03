import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePromocodeDto implements Prisma.PromocodesCreateInput {
  @ApiProperty()
  @IsString()
  promo: string;

  @ApiProperty()
  @IsNumber()
  discoint: number;

  @ApiProperty({
    default: new Date(Date.now()), // or something else...
  })
  @IsDateString()
  expiryDate: string | Date;

  @ApiProperty()
  @IsString()
  tag: string;
}
