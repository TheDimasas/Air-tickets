import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AirlineDocument = Airline & Document;

@Schema()
export class Airline {
  @ApiProperty({
    example: 'МАУ (Міжнародні Авіалінії України)',
    description: 'Ukrainian name of the airline',
  })
  @Prop({ required: true, unique: true, trim: true })
  airlineNameUa: string;

  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'English name of the airline',
  })
  @Prop({ unique: true, trim: true })
  airlineNameEng?: string;

  @ApiProperty({
    example: 'МАУ (Международные Авиалинии Украины)',
    description: 'Russian name of the airline',
  })
  @Prop({ unique: true, trim: true })
  airlineNameRu?: string;

  @ApiProperty({
    example:
      'Міжнародні Авіалінії України працюють з 1 жовтня 1992 року і є флагманської авіакомпанією України',
    description: 'Ukrainian description of the airline',
  })
  @Prop({ required: true, trim: true })
  descriptionUa: string;

  @ApiProperty({
    example:
      'Ukraine International Airlines has been operating since October 1, 1992 and is the flagship airline of Ukraine',
    description: 'English description of the airline',
  })
  @Prop({ trim: true })
  descriptionEng?: string;

  @ApiProperty({
    example:
      'Международные авиалинии Украины работают с 1 октября 1992 года и являются флагманской авиакомпанией Украины.',
    description: 'Russian description of the airline',
  })
  @Prop({ trim: true })
  descriptionRu?: string;

  @ApiProperty({
    example: 'logo',
    description: 'Airline logo',
  })
  @Prop({ required: true, trim: true })
  logo: string;
}
export const AirlineSchema = SchemaFactory.createForClass(Airline);
