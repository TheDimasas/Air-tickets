import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Section } from 'src/sections/entities/section.entity';

export type AirplaneDocument = Airplane & Document;

@Schema()
export class Airplane {
  @ApiProperty({
    example: 'Aerospatiale/Alenia ATR 72',
    description: 'Airplane name',
  })
  @Prop({ required: true, unique: true, trim: true })
  airplaneName: string;

  @ApiProperty({ example: '45', description: 'Amount Of Seat' })
  @Prop({ required: true })
  amountOfSeat: number;

  @ApiProperty({ example: 'Sections', description: 'Sections' })
  @Prop({
    trim: true,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Section',
  })
  sections: Section[];
}
export const AirplaneSchema = SchemaFactory.createForClass(Airplane);
