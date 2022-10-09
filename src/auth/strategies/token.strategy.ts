import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(key: string, done) {
    const token = await this.authService.findToken(key);
    if (!token) {
      return done(null, false);
    }
    return done(null, token.user);
  }
}
