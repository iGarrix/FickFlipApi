import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { UsersService } from 'src/db/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { PositionsService } from '../positions/positions.service';
import { PromocodesService } from '../promocodes/promocodes.service';
import { CreateOrderDto } from 'src/domain/dtos/orderDtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly positionService: PositionsService,
    private readonly promoService: PromocodesService,
    private readonly userService: UsersService,
  ) {}

  async GetOrdersAsync(email: string, page: number, take: number) {
    const findUser = await this.userService.getUserByEmail(email);

    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: page,
      perPage: take,
    });
    const orders = await this.prisma.orders;
    return paginate(orders, {
      where: {
        user: {
          id: findUser.id,
        },
      },
      select: {
        status: true,
        payment: true,
        position: {
          select: {
            name: true,
            description: true,
            image: true,
            size: true,
            price: true,
            shipping: true,
            code: true,
          },
        },
        promocode: {
          select: {
            promo: true,
            discoint: true,
            expiryDate: true,
            tag: true,
          },
        },
      },
    });
  }

  async createOrder(email: string, request: CreateOrderDto) {
    const findUser = await this.userService.getUserByEmail(email);
    if (!findUser) {
      throw new NotFoundException(['User not found']);
    }

    const position = await this.positionService.getPositionByCodeAsync(
      request.positionCode,
    );
    if (!position) {
      throw new NotFoundException(['Position not found']);
    }

    const findOrder = await this.prisma.orders.findUnique({
      where: {
        id: position.id,
      },
    });
    if (findOrder) {
      throw new NotFoundException(['Order already exist']);
    }

    if (request.promo) {
      await this.promoService.getPromoAsync(request.promo);
    }

    const createResult = await this.prisma.orders.create({
      data: {
        status: request.status,
        payment: request.payment,
        user: {
          connect: {
            id: findUser.id,
          },
        },
        position: {
          connect: {
            id: position.id,
          },
        },
        promocode: request.promo && {
          connect: {
            promo: request.promo,
          },
        },
      },
      select: {
        status: true,
        payment: true,
        promocode: {
          select: {
            promo: true,
            discoint: true,
            expiryDate: true,
            tag: true,
          },
        },
      },
    });

    return createResult;
  }
}
