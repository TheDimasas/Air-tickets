import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight, FlightSchema } from './schemas/flights.schema';
import { AirlinesModule } from 'src/airlines/airlines.module';
import { AirportsModule } from 'src/airports/airports.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
    AirportsModule,
    AirlinesModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
