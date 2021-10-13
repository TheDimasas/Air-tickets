import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

import { Section } from 'src/sections/entities/section.entity';

export class CreateAirplaneDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
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
    example: 'sections',
    description: 'Sections',
  })
  readonly sections: Section[];
}
