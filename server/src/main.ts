import { EntityNotFoundErrorFilter } from './common/filters/entity-not-found-error.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import env from './common/config/env.config';
import corsConfig from './common/config/cors.config';
import * as path from 'path';

const httpsOptions: HttpsOptions = {
  key: readFileSync(env.SSL_KEY),
  cert: readFileSync(env.SSL_CERT),
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
    cors: corsConfig,
  });
  app.disable('x-powered-by');

  app.useStaticAssets(path.join(__dirname, 'common', 'uploads'), {
    prefix: '/media',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new EntityNotFoundErrorFilter(),
  );

  await app.listen(env.PORT);
}
bootstrap();
