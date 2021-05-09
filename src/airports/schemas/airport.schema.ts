import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AirportDocument = Airport & Document;

@Schema()
export class Airport {
  @ApiProperty({ example: 'Жуляни', description: 'Local airport name' })
  @Prop({ required: true, unique: true, trim: true })
  airportNameLocal: string;

  @ApiProperty({
    example: 'Zhulyani',
    description: 'English airport name',
  })
  @Prop({ required: true, unique: true, trim: true })
  airportNameEng: string;

  @ApiProperty({ example: 'IEV', description: 'IATA' })
  @Prop({ required: true, unique: true, trim: true })
  IATA: string;

  @ApiProperty({
    example: 'Україна',
    description: 'The Local name of the country of the airport',
  })
  @Prop({ required: true, trim: true })
  airportCountryLocal: string;

  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the country of the airport',
  })
  @Prop({ required: true, trim: true })
  airportCountryEng: string;

  @ApiProperty({
    example: 'Київ',
    description: 'The Local name of the airport town',
  })
  @Prop({ required: true, trim: true })
  airportTownLocal: string;

  @ApiProperty({
    example: 'Kiev',
    description: 'The English name of the airport town',
  })
  @Prop({ required: true, trim: true })
  airportTownEng: string;
}
export const AirportSchema = SchemaFactory.createForClass(Airport);
