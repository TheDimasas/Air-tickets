import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirportsService } from './airports.service';
import { AirportsController } from './airports.controller';
import { Airport, AirportSchema } from './schemas/airport.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }]),
  ],
  controllers: [AirportsController],
  providers: [AirportsService],
  exports: [AirportsService],
})
export class AirportsModule {}
