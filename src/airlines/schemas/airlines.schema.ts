import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AirlineDocument = Airline & Document;

@Schema()
export class Airline {
  @ApiProperty({
    example: 'МАУ (Міжнародні Авіалінії України)',
    description: 'Local name of the airline',
  })
  @Prop({ required: true, unique: true, trim: true })
  airlineNameLocal: string;

  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'English name of the airline',
  })
  @Prop({ required: true, unique: true, trim: true })
  airlineNameEng: string;

  @ApiProperty({
    example:
      'Міжнародні Авіалінії України працюють з 1 жовтня 1992 року і є флагманської авіакомпанією України',
    description: 'Local description of the airline',
  })
  @Prop({ required: true })
  descriptionLocal: string;

  @ApiProperty({
    example:
      'Ukraine International Airlines has been operating since October 1, 1992 and is the flagship airline of Ukraine',
    description: 'English description of the airline',
  })
  @Prop({ required: true })
  descriptionEng: string;
}
export const AirlineSchema = SchemaFactory.createForClass(Airline);
