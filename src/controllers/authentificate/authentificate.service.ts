import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/db/users/users.service';
import { AuthenticateDto } from 'src/domain/dtos/authDtos/auth.dto';
import {
  LoginDto,
  LoginDtoByEmail,
} from 'src/domain/dtos/userDtos/login-user.dto';
import { RegisterDto } from 'src/domain/dtos/userDtos/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/models/user.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthentificateService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getSessionAsync(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(['User not found']);
    }
    const userDto: User = {
      email: user.email,
      username: user.username,
    };
    return userDto;
  }

  private async generateRefreshToken(user: Prisma.UsersCreateInput | any) {
    return await this.jwtService.signAsync(
      { sub: user.email },
      {
        expiresIn: process.env.JWT_REFRESH_VALIDITY,
      },
    );
  }

  async GetAuthModelAsync(
    user: Prisma.UsersCreateInput | any,
    refreshToken?: string,
  ): Promise<AuthenticateDto> {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      rt: !refreshToken ? user.refreshToken : refreshToken,
    };
    return {
      user: {
        username: user.username,
        email: user.email,
      },
      accessToken: await this.jwtService.signAsync(payload),
      //refreshToken: !refreshToken ? user.refreshToken : refreshToken,
    };
  }

  async registerUserAsync(body: RegisterDto): Promise<AuthenticateDto> {
    const findUser = await this.userService.getUserByEmail(body.email);
    if (findUser) {
      throw new BadRequestException(['User already exist']);
    }
    const _hash = await bcrypt.hash(body.password, 10);
    const _rtoken = await this.jwtService.signAsync(
      { sub: body.email },
      {
        expiresIn: process.env.JWT_REFRESH_VALIDITY,
      },
    );

    const create = await this.userService.createUser({
      email: body.email,
      username: body.username,
      hashPassword: _hash,
      refreshToken: _rtoken,
    });

    return await this.GetAuthModelAsync(create);
  }

  async signinUserAsync(body: LoginDto): Promise<AuthenticateDto> {
    const create = await this.userService.getUserByUsername(body.username);
    if (!create) {
      throw new NotFoundException(['User not found']);
    }
    const validatePassword: boolean = await bcrypt.compare(
      body.password,
      create.hashPassword,
    );
    if (!validatePassword) {
      throw new BadRequestException(['Invalid password']);
    }

    create.refreshToken = await this.generateRefreshToken(create);
    await this.userService.updateUserAsync(create);
    return await this.GetAuthModelAsync(create);
  }

  async signinUserByEmailAsync(
    body: LoginDtoByEmail,
  ): Promise<AuthenticateDto> {
    const create = await this.userService.getUserByEmail(body.email);
    if (!create) {
      throw new NotFoundException(['User not found']);
    }
    const validatePassword: boolean = await bcrypt.compare(
      body.password,
      create.hashPassword,
    );
    if (!validatePassword) {
      throw new BadRequestException(['Invalid password']);
    }

    create.refreshToken = await this.generateRefreshToken(create);
    await this.userService.updateUserAsync(create);
    return await this.GetAuthModelAsync(create);
  }

  async refreshTokenAsync(
    refresh_token: string,
    access_token: string,
  ): Promise<any> {
    if (!refresh_token || !access_token) {
      throw new BadRequestException(['Tokens are not valid']);
    }
    try {
      const user = this.jwtService.decode(access_token);
      if (!user) {
        throw new BadRequestException(['Decode failed']);
      }

      const findUser = await this.userService.getUserByEmail(user.email);
      if (!findUser) {
        throw new NotFoundException(['User not found']);
      }

      const refreshValidate = await this.jwtService.verifyAsync(refresh_token);
      if (!refreshValidate || findUser.refreshToken !== refresh_token) {
        throw new BadRequestException(['Session was expired']);
      }

      findUser.refreshToken = await this.generateRefreshToken(findUser);
      await this.userService.updateUserAsync(findUser);
      return await this.GetAuthModelAsync(findUser);
    } catch (error) {
      throw new BadRequestException(['Session was expired']);
    }
  }

  async revoke(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(['User not found']);
      }
      user.refreshToken = null;
      await this.userService.updateUserAsync(user);
      return true;
    } catch (error) {
      throw new BadRequestException(['Revoke was failed']);
    }
  }
}
