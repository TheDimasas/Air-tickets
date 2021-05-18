import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression';
import csurf from 'csurf';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('AirTicketsApi')
    .setDescription('The API for searching and booking air tickets')
    .setVersion('1.0.0')
    .addTag('AirTickets')
    .build();

  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: [`http://localhost:${process.env.PORT_CLIENT}`],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(compression());
  // app.use(csurf({ cookie: true }));
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
}
bootstrap();
