import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePositionDto } from 'src/domain/dtos/positionDtos/create-position.dto';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PositionCategory } from '@prisma/client';

@Injectable()
export class PositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPositionsAsync(
    take: number,
    page: number,
    category?: PositionCategory,
    search?: string,
  ) {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: page,
      perPage: take,
    });

    const positions = await this.prisma.positions;

    if (search && search !== '*') {
      return paginate(positions, {
        where: {
          category: category,
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              code: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              shipping: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          name: true,
          description: true,
          image: {
            select: {
              src: true,
            },
          },
          size: true,
          price: true,
          shipping: true,
          code: true,
        },
      });
    }
    return paginate(positions, {
      where: {
        category: category,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        name: true,
        description: true,
        image: {
          select: {
            src: true,
          },
        },
        size: true,
        price: true,
        shipping: true,
        code: true,
      },
    });
  }

  async createPositionAsync(
    position: CreatePositionDto,
    images?: any[] | null,
  ) {
    const findPosition = await this.prisma.positions.findFirst({
      where: {
        code: position.code,
      },
    });
    if (findPosition) {
      throw new BadRequestException(['Position already exist']);
    }
    if (!images) {
      throw new BadRequestException('Image does not valid');
    }
    return await this.prisma.positions.create({
      data: {
        ...position,
        image: {
          create: images,
        },
      },
      select: {
        name: true,
        description: true,
        image: {
          select: {
            src: true,
          },
        },
        size: true,
        price: true,
        shipping: true,
        code: true,
      },
    });
  }

  async deletePositionAsync(code: string) {
    const findPosition = await this.prisma.positions.findUnique({
      where: {
        code,
      },
    });
    if (!findPosition) {
      throw new NotFoundException(['Position not found']);
    }

    await this.prisma.positions.delete({
      where: {
        id: findPosition.id,
      },
    });
    return true;
  }

  async getPositionByCodeAsync(code: string) {
    const findPosition = await this.prisma.positions.findUnique({
      where: {
        code,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: {
          select: {
            src: true,
          },
        },
        size: true,
        price: true,
        shipping: true,
        code: true,
      },
    });
    if (!findPosition) {
      throw new NotFoundException(['Position not found']);
    }
    return findPosition;
  }

  async getPositionByCodeClientAsync(code: string) {
    const findPosition = await this.prisma.positions.findUnique({
      where: {
        code,
      },
      select: {
        name: true,
        description: true,
        image: {
          select: {
            src: true,
          },
        },
        size: true,
        price: true,
        shipping: true,
        code: true,
      },
    });
    if (!findPosition) {
      throw new NotFoundException(['Position not found']);
    }
    return findPosition;
  }
}
