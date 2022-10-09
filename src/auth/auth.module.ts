import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, PassportModule],
  controllers: [AuthController, LocalStrategy],
})
export class AuthModule {}
