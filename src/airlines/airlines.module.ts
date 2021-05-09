import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirlinesController } from './airlines.controller';
import { AirlinesService } from './airlines.service';
import { Airline, AirlineSchema } from './schemas/airlines.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airline.name, schema: AirlineSchema }]),
  ],
  controllers: [AirlinesController],
  providers: [AirlinesService],
  exports: [AirlinesService],
})
export class AirlinesModule {}
