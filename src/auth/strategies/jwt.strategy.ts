import { JwtValidatePayload } from './../payloads/jwt-validate.payload';
import { JwtPayload } from './../payloads/jwt.payload';
import { jwtStrategyConfig } from './../../common/config/jwt-strategy.config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(jwtStrategyConfig);
  }

  validate(payload: JwtPayload): JwtValidatePayload {
    return { userId: payload.sub, userEmail: payload.email };
  }
}
