import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import env from './env.config';

const corsConfig: CorsOptions | true =
  env.NODE_ENV === 'production'
    ? {
        origin: ['https://voteit.washnix.com', 'https://mymy-project-adfs.com'],
      }
    : true;

export default corsConfig;
