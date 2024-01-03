import {
  Body,
  Controller,
  Delete,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/db/users/users.service';
import { AuthJwtGuard } from 'src/domain/strategies/auth_jwt/auth.guard';
import { UpdateUserDto } from 'src/domain/dtos/userDtos/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _serv: UsersService) {}

  @Put('update')
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(@Req() req: Request, @Body() updateModel: UpdateUserDto) {
    return await this._serv.updateClientUser(
      updateModel,
      req['user'].email as string,
    );
  }

  @Delete('delete')
  @UseGuards(AuthJwtGuard)
  async deleteUser(@Req() req: Request) {
    return await this._serv.deleteUser(req['user'].id as string);
  }
}
