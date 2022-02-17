import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import env from './env.config';

const corsConfig: CorsOptions | true =
  env.NODE_ENV === 'development'
    ? true
    : {
        origin: 'https://mymy-project-adfs.com',
      };

export default corsConfig;
