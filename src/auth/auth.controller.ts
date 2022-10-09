import {
  Controller,
  Body,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { RegistrationDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.createUser(registrationDto);
  }

  @UseGuards(TokenAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
