import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthentificateController } from 'src/controllers/authentificate/authentificate.controller';
import { AuthentificateService } from 'src/controllers/authentificate/authentificate.service';
import { UsersModule } from 'src/db/users/users.module';
import { JwtStrategy } from 'src/domain/strategies/auth_jwt/jwt.strategy';

@Module({
  controllers: [AuthentificateController],
  providers: [AuthentificateService, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_VALIDITY },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
