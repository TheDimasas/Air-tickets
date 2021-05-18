import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AirportsModule } from './airports/airports.module';
import { AirlinesModule } from './airlines/airlines.module';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AirplanesModule } from './airplanes/airplanes.module';
import { SeatsModule } from './seats/seats.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AirportsModule,
    AirlinesModule,
    FlightsModule,
    TicketsModule,
    FilesModule,
    AirplanesModule,
    SeatsModule,
    SectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
