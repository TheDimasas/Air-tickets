import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AirportDocument = Airport & Document;

@Schema()
export class Airport {
  @ApiProperty({ example: 'Жуляни', description: 'Ukranian airport name' })
  @Prop({ required: true, unique: true, trim: true })
  airportNameUa: string;

  @ApiProperty({
    example: 'Zhulyani',
    description: 'English airport name',
  })
  @Prop({ unique: true, trim: true })
  airportNameEng?: string;

  @ApiProperty({ example: 'Жуляны', description: 'Russian airport name' })
  @Prop({ unique: true, trim: true })
  airportNameRu?: string;

  @ApiProperty({ example: 'IEV', description: 'IATA' })
  @Prop({ required: true, unique: true, trim: true })
  IATA: string;

  @ApiProperty({
    example: 'Україна',
    description: 'The Ukranian name of the country of the airport',
  })
  @Prop({ required: true, trim: true })
  airportCountryUa: string;

  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the country of the airport',
  })
  @Prop({ trim: true })
  airportCountryEng?: string;

  @ApiProperty({
    example: 'Украина',
    description: 'The Russian name of the country of the airport',
  })
  @Prop({ trim: true })
  airportCountryRu?: string;

  @ApiProperty({
    example: 'Київ',
    description: 'The Ukranian name of the airport town',
  })
  @Prop({ required: true, trim: true })
  airportTownUa: string;

  @ApiProperty({
    example: 'Kiev',
    description: 'The English name of the airport town',
  })
  @Prop({ trim: true })
  airportTownEng?: string;

  @ApiProperty({
    example: 'Киев',
    description: 'The Russian name of the airport town',
  })
  @Prop({ trim: true })
  airportTownRu?: string;
}
export const AirportSchema = SchemaFactory.createForClass(Airport);
