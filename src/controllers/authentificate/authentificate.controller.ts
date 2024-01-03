import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthentificateService } from './authentificate.service';
import {
  LoginDto,
  LoginDtoByEmail,
} from 'src/domain/dtos/userDtos/login-user.dto';
import { RegisterDto } from 'src/domain/dtos/userDtos/register-user.dto';
import { AuthJwtGuard } from 'src/domain/strategies/auth_jwt/auth.guard';
import { RefreshTokenDto } from 'src/domain/dtos/userDtos/refresh-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthentificateController {
  constructor(private readonly _serv: AuthentificateService) {}

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @Get()
  async getSession(@Req() req: Request): Promise<any> {
    const userEmail: string = req['user'].email;
    return await this._serv.getSessionAsync(userEmail);
  }

  @Patch('/refresh')
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this._serv.refreshTokenAsync(
      body.refreshToken,
      body.accessToken,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthJwtGuard)
  @HttpCode(200)
  @Post('/logout')
  async logoutUser(@Req() req: Request) {
    const userEmail: string = req['user'].email;
    return await this._serv.revoke(userEmail);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return await this._serv.signinUserAsync(loginDto);
  }
  @Post('/email_login')
  @UsePipes(new ValidationPipe())
  async loginbyEmail(@Body() loginDto: LoginDtoByEmail) {
    return await this._serv.signinUserByEmailAsync(loginDto);
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    return this._serv.registerUserAsync(registerDto);
  }
}
