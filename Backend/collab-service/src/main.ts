import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Read and normalize allowed origins from env
  const origins = (config.get<string>('CORS_ORIGINS') || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins.length ? origins : true, // Allow all if no origins specified
    credentials: true,
  });

  const port = Number(config.get<number>('PORT')) || 3002;
  await app.listen(port);
  console.log(`Collab service is running on: http://localhost:${port}`);
}
bootstrap();
