import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Seat } from 'src/seats/entities/seat.entity';

export type SectionDocument = Section & Document;

export enum Class {
  Business = 'business',
  Economy = 'economy',
}

@Schema()
export class Section {
  @ApiProperty({ example: '1700', description: 'Section Price' })
  @Prop({ required: true, trim: true })
  price: number;

  @ApiProperty({
    example: 'economy',
    description: 'Class',
    enum: Class,
    enumName: 'Class',
  })
  @Prop({ required: true, trim: true, enum: Class })
  class: Class;

  @ApiProperty({
    example: '90',
    description: 'Seats',
  })
  @Prop({
    trim: true,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Seat',
  })
  seats: Seat[];
}
export const SectionSchema = SchemaFactory.createForClass(Section);
