import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

import { Section } from 'src/sections/entities/section.entity';

export type SeatDocument = Seat & Document;

export enum Status {
  Paid = 'paid',
  Booked = 'booked',
  Returned = 'returned',
  Free = 'free',
  NotAvailable = 'notAvailable',
}

@Schema()
export class Seat {
  @ApiProperty({
    example: 'Section',
    description: 'Section',
  })
  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  })
  section: Section | mongoose.Types.ObjectId;

  @ApiProperty({ example: '1', description: 'Number of Seat' })
  @Prop({ required: true, trim: true })
  number: number;

  @ApiProperty({ example: 'free', description: 'Status' })
  @Prop({ required: true, trim: true, enum: Status, default: Status.Free })
  status: Status;
}
export const SeatSchema = SchemaFactory.createForClass(Seat);
