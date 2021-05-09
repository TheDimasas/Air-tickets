import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Airport } from 'src/airports/schemas/airport.schema';
import { Airline } from 'src/airlines/schemas/airlines.schema';

export type FlightsDocument = Flight & Document;

@Schema()
export class Flight {
  @ApiProperty({ example: 'PS-9065', description: 'Flight name' })
  @Prop({ required: true, unigue: true, trim: true })
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
  airline: Airline;

  @ApiProperty({
    example: '????????Zhulyani',
    description: 'Departure airport',
  })
  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
  })
  departureAirport: Airport;

  @ApiProperty({ example: '????????', description: 'Departure time' })
  @Prop({ required: true })
  departureTime: string;

  @ApiProperty({
    example: '????????Sheremetyevo',
    description: 'Arrival airport',
  })
  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Airport',
  })
  arrivalAirport: Airport;

  @ApiProperty({ example: '????????', description: 'Arrival time' })
  @Prop({ required: true })
  arrivalTime: string;

  @ApiProperty({ example: '90', description: 'Amount of seats' })
  @Prop({ required: true })
  amountOfSeat: number;

  @ApiProperty({ example: '1700', description: 'Ticket price' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: 'Without baggage',
    description: 'Baggage properties',
  })
  @Prop({ required: true })
  property: string;
}
export const FlightSchema = SchemaFactory.createForClass(Flight);
