import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAirplaneDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Aerospatiale/Alenia ATR 72',
    description: 'Airplane name',
  })
  readonly airplaneName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '45', description: 'Amount Of Seat' })
  amountOfSeat: number;

  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sections',
    description: 'Sections',
  })
  readonly sections: ObjectId[];
}
