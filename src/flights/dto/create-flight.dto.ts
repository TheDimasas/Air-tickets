import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'PS-9065', description: 'Flight name' })
  readonly flightName: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: '????????UIA (Ukraine International Airlines)',
    description: 'Airline name',
  })
  readonly airline: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: '????????Zhulyani',
    description: 'Departure airport',
  })
  readonly departureAirport: ObjectId;

  @IsNotEmpty()
  @ApiProperty({ example: '????????', description: 'Departure time' })
  readonly departureTime: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: '????????Sheremetyevo',
    description: 'Arrival airport',
  })
  readonly arrivalAirport: ObjectId;

  @IsNotEmpty()
  @ApiProperty({ example: '????????', description: 'Arrival time' })
  readonly arrivalTime: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '90', description: 'Amount of seats' })
  readonly amountOfSeat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '1700', description: 'Ticket price' })
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Without baggage',
    description: 'Baggage properties',
  })
  readonly property: string;
}
