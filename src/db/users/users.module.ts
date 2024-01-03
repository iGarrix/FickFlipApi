import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { UserController } from 'src/controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UsersService],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
