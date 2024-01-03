import { ApiProperty } from '@nestjs/swagger';
import { PositionCategory, Prisma } from '@prisma/client';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePositionDto implements Prisma.PositionsCreateInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(20, { message: 'Description must be greater then 19' })
  @MaxLength(100, { message: 'Description must be less then 100' })
  description: string;

  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  shipping: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({
    enum: PositionCategory,
  })
  @IsEnum(PositionCategory)
  category: PositionCategory;
}
