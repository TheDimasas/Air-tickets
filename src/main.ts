import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

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
    origin: [`http://localhost:${process.env.PORT}`],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(csurf());
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
