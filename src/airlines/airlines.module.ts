import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirlinesService } from './airlines.service';
import { FilesService } from 'src/files/files.service';
import { AirlinesController } from './airlines.controller';
import { Airline, AirlineSchema } from './entities/airlines.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airline.name, schema: AirlineSchema }]),
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService, FilesService],
  exports: [AirlinesService],
})
export class AirlinesModule {}
