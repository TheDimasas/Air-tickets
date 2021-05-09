import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

import { CreateFlightDto } from './create-flight.dto';

export class SearchFlightDto extends PartialType(CreateFlightDto) {
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
}
