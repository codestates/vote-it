import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, SSL_KEY, SSL_CERT } from './common/config/env.config';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';

const httpsOptions: HttpsOptions = {
  key: readFileSync(SSL_KEY),
  cert: readFileSync(SSL_CERT),
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.disable('x-powered-by');

  await app.listen(PORT);
}
bootstrap();
