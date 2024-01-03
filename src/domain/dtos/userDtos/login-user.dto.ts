import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be longer, 8 charapters are minimal',
  })
  @MaxLength(25, {
    message: 'Password must be shorter, 25 charapters are maximum',
  })
  password: string;
}

export class LoginDtoByEmail {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be longer, 8 charapters are minimal',
  })
  @MaxLength(25, {
    message: 'Password must be shorter, 25 charapters are maximum',
  })
  password: string;
}
