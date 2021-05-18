import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Airport } from 'src/airports/entities/airport.entity';
import { Airline } from 'src/airlines/entities/airlines.entity';
import { Airplane } from 'src/airplanes/entities/airplane.entity';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @ApiProperty({ example: 'PS-9065', description: 'Flight name' })
  @Prop({ required: true, unique: true, trim: true })
  flightName: string;

  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'Airline name',
  })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airline',
  })
  airline: Airline | mongoose.Types.ObjectId;

  @ApiProperty({
    example: 'Aerospatiale/Alenia ATR 72',
    description: 'Airplane name',
  })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airplane',
  })
  airplane: Airplane | mongoose.Types.ObjectId;

  @ApiProperty({
    example: 'Zhulyani/Жуляни/IEV',
    description: 'Departure airport',
  })
  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
  })
  departureAirport: Airport | mongoose.Types.ObjectId;

  @ApiProperty({
    example: '2021-05-16T15:35:00.000Z',
    description: 'Departure time',
  })
  @Prop({ required: true })
  departureTime: string;

  @ApiProperty({
    example: 'Sheremetyevo/Шереметьево/SVO',
    description: 'Arrival airport',
  })
  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
  })
  arrivalAirport: Airport | mongoose.Types.ObjectId;

  @ApiProperty({
    example: '2021-05-21T09:15:00.000Z',
    description: 'Arrival time',
  })
  @Prop({ required: true })
  arrivalTime: string;

  @ApiProperty({ example: '200', description: 'Ticket taxa' })
  @Prop({})
  taxa: number;

  @ApiProperty({
    example: '23',
    description: 'Baggage properties',
  })
  @Prop({})
  baggage: number | null;

  @ApiProperty({ example: 'true', description: 'Hand luggage' })
  @Prop({ required: true })
  carryOnBaggage: boolean;

  @ApiProperty({ example: '0.7', description: 'Ticket exchange' })
  @Prop({})
  exchange?: number | null;

  @ApiProperty({ example: '0.5', description: 'Ticket return' })
  @Prop({})
  refund?: number | null;
}
export const FlightSchema = SchemaFactory.createForClass(Flight);
