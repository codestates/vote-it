import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import env from './env.config';

export const jwtStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: env.JWT_SECRET,
};
