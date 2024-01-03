import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { AuthJwtGuard } from 'src/domain/strategies/auth_jwt/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePromocodeDto } from 'src/domain/dtos/promocodeDtos/create-promocode.dto';

@ApiTags('promocodes')
@Controller('promocodes')
export class PromocodesController {
  constructor(private readonly _serv: PromocodesService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  async getAllPromocodes(
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    return await this._serv.getAllPromocodesAsync(take, page);
  }

  @Get('specific')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  async getPromocode(@Query('promo') promo: string) {
    return await this._serv.getPromoAsync(promo);
  }

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ValidationPipe())
  async createPromocode(@Body() body: CreatePromocodeDto) {
    return await this._serv.createPromocodeAsync(body);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  async deletePromocode(@Query('promo') promo: string) {
    return await this._serv.deletePromocodeAsync(promo);
  }
}
