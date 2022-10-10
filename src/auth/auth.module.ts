import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenStrategy } from './strategies/token.strategy';
import { UniqueValidator } from './validators/Unique';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token]), PassportModule],
  providers: [AuthService, LocalStrategy, TokenStrategy, UniqueValidator],
  controllers: [AuthController],
})
export class AuthModule {}
