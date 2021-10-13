import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Airline } from 'src/airlines/entities/airlines.entity';
import { Airplane } from 'src/airplanes/entities/airplane.entity';
import { Airport } from 'src/airports/entities/airport.entity';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'PS-9065', description: 'Flight name' })
  readonly flightName: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'Airline name',
  })
  readonly airline: Airline;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Aerospatiale/Alenia ATR 72',
    description: 'Airplane name',
  })
  readonly airplane: Airplane;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: 'Zhulyani/Жуляни/IEV',
    description: 'Departure airport',
  })
  readonly departureAirport: Airport;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2021-05-16T15:35:00.000Z',
    description: 'Departure time',
  })
  readonly departureTime: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: 'Sheremetyevo/Шереметьево/SVO',
    description: 'Arrival airport',
  })
  readonly arrivalAirport: Airport;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2021-05-21T09:15:00.000Z',
    description: 'Arrival time',
  })
  readonly arrivalTime: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '200', description: 'Ticket taxa' })
  readonly taxa: number;

  @ApiProperty({
    example: '23',
    description: 'Baggage properties',
  })
  readonly baggage: number | null;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: 'true', description: 'Hand luggage' })
  readonly carryOnBaggage: boolean;

  @IsOptional()
  @ApiPropertyOptional({ example: '0.7', description: 'Ticket exchange' })
  readonly exchange?: number | null;

  @IsOptional()
  @ApiPropertyOptional({ example: '0.5', description: 'Ticket return' })
  readonly refund?: number | null;
}
