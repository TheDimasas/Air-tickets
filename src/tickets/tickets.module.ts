import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirportsModule } from 'src/airports/airports.module';
import { FlightsModule } from 'src/flights/flights.module';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/entities/users.entity';
import { Flight, FlightSchema } from 'src/flights/entities/flights.entity';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import {
  Airplane,
  AirplaneSchema,
} from 'src/airplanes/entities/airplane.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { AirplanesModule } from 'src/airplanes/airplanes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Flight.name, schema: FlightSchema },
      { name: Airplane.name, schema: AirplaneSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AirportsModule,
    UsersModule,
    FlightsModule,
    AirplanesModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
