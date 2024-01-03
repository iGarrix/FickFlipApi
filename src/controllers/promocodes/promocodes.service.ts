import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { CreatePositionDto } from 'src/domain/dtos/positionDtos/create-position.dto';
import { CreatePromocodeDto } from 'src/domain/dtos/promocodeDtos/create-promocode.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaService) {}

  async createPromocodeAsync(body: CreatePromocodeDto) {
    const findPromo = await this.prisma.promocodes.findUnique({
      where: { promo: body.promo },
    });
    if (findPromo) {
      throw new BadRequestException(['Procode already exist']);
    }

    return await this.prisma.promocodes.create({ data: body });
  }

  async getPromoAsync(promo: string) {
    const findPromo = await this.prisma.promocodes.findUnique({
      where: { promo: promo },
    });
    if (!findPromo) {
      throw new NotFoundException(['Promocode does not exist']);
    }
    return {
      promo: findPromo.promo,
      discoint: findPromo.discoint,
      tag: findPromo.tag,
      expiryDate: findPromo.expiryDate,
    } as CreatePromocodeDto;
  }

  async getAllPromocodesAsync(take: number, page: number) {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: page,
      perPage: take,
    });
    const promocodes = await this.prisma.promocodes;
    return paginate(promocodes, {
      orderBy: { createdAt: 'desc' },
      select: {
        promo: true,
        discoint: true,
        tag: true,
        expiryDate: true,
      },
    });
  }

  async deletePromocodeAsync(promo: string) {
    try {
      const findPromo = await this.prisma.promocodes.findUnique({
        where: { promo: promo },
      });
      if (!findPromo) {
        throw new NotFoundException(['Procode does not exist']);
      }
      await this.prisma.promocodes.delete({
        where: {
          promo: promo,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
