import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import env from './common/config/env.config';

const httpsOptions: HttpsOptions = {
  key: readFileSync(env.SSL_KEY),
  cert: readFileSync(env.SSL_CERT),
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.disable('x-powered-by');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(env.PORT);
}
bootstrap();
