import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

import { User } from 'src/users/entities/users.entity';
import { Flight } from 'src/flights/entities/flights.entity';
import { Seat } from 'src/seats/entities/seat.entity';

export type TicketDocument = Ticket & Document;

export enum Status {
  Paid = 'paid',
  Booked = 'booked',
  Returned = 'returned',
  NotAvailable = 'notAvailable',
}

export enum Sex {
  Male = 'male',
  Female = 'female',
}

export enum Type {
  Adult = 'adult',
  Child = 'child',
  Baby = 'baby',
  Disabled = 'disabled',
}

@Schema()
export class Ticket {
  @ApiProperty({ example: 'PS-9065', description: 'Flight' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
  })
  flight: Flight | mongoose.Types.ObjectId;

  @ApiProperty({ example: 'test@gmail.com', description: 'User' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User | mongoose.Types.ObjectId;

  @ApiProperty({ example: 'male', description: 'Sex' })
  @Prop({ required: true, trim: true, enum: Sex })
  sex: Sex;

  @ApiProperty({ example: 'adult', description: 'Type' })
  @Prop({ required: true, trim: true, enum: Type })
  type: Type;

  @ApiProperty({ example: 'Dmitry', description: 'First Name' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Efremov', description: 'Last Name' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: '2000-08-31T00:00:00.000Z', description: 'Birthday' })
  @Prop({ required: true })
  birthday: string;

  @ApiProperty({
    example: 'Україна',
    description: 'The Ukranian name of the citizenship',
  })
  @Prop({ required: true, trim: true })
  citizenshipUa?: string;

  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the citizenship',
  })
  @Prop({ trim: true })
  citizenshipEng?: string;

  @ApiProperty({
    example: 'Украина',
    description: 'The Russian name of the citizenship',
  })
  @Prop({ trim: true })
  citizenshipRu?: string;

  @ApiProperty({ example: 'RS123456', description: 'Document' })
  @Prop({ required: true, trim: true })
  document: string;

  @ApiProperty({ example: '2016-08-31T00:00:00.000Z', description: 'Validity' })
  @Prop({ required: true })
  validity: string;

  @ApiProperty({ example: 'booked', description: 'Status' })
  @Prop({ required: true, trim: true, enum: Status, default: Status.Booked })
  status: Status;

  @ApiProperty({
    example: '23',
    description: 'Number Of Seat',
  })
  @Prop({ default: null })
  numberOfSeat: Seat | null;
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
