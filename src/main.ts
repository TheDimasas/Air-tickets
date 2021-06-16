import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('AirTicketsApi')
    .addCookieAuth('optional-session-id')
    .setDescription('The API for searching and booking air tickets')
    .setVersion('1.0.0')
    .addTag('AirTickets')
    .build();

  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: [`http://localhost:${process.env.PORT_CLIENT}`],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets(join(__dirname, 'static'));
  app.use(compression());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  mongoose.set('debug', false);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
