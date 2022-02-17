import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import env from './env.config';

const jwtStrategyConfig: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: env.JWT_SECRET,
};

export default jwtStrategyConfig;
