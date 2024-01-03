import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from 'src/domain/dtos/userDtos/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    body: Prisma.UsersCreateInput,
  ): Promise<Prisma.UsersCreateInput> {
    return await this.prisma.users.create({ data: body });
  }

  async updateUserAsync(body: Prisma.UsersCreateInput) {
    return await this.prisma.users.update({
      where: { email: body.email },
      data: body,
    });
  }

  async updateClientUser(body: UpdateUserDto, fEmail: string) {
    const findUser = await this.prisma.users.findUnique({
      where: { email: fEmail },
    });
    if (!findUser) {
      throw new NotFoundException(['User not found']);
    }
    return await this.prisma.users.update({
      where: { email: fEmail },
      data: {
        email: body.email,
        username: body.username,
        modifyAt: new Date(Date.now()),
      },
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    console.log(id);
    if (!id) {
      throw new BadRequestException(['Delete was failed']);
    }
    const findUser = await this.prisma.users.findUnique({
      where: { id: id },
    });
    if (!findUser) {
      throw new NotFoundException(['User not found']);
    }
    try {
      await this.prisma.users.delete({ where: { id: id } });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserByUsername(username: string) {
    const findUser = await this.prisma.users.findUnique({
      where: { username: username },
    });
    if (!findUser) {
      throw new NotFoundException(['User not found']);
    }
    return findUser;
  }

  async getUserByEmail(email: string) {
    const findUser = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      throw new NotFoundException(['User not found']);
    }
    return findUser;
  }
}
