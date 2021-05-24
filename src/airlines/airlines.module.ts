import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirlinesService } from './airlines.service';
import { AirlinesController } from './airlines.controller';
import { Airline, AirlineSchema } from './entities/airlines.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airline.name, schema: AirlineSchema }]),
    FilesModule,
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService],
  exports: [AirlinesService],
})
export class AirlinesModule {}
