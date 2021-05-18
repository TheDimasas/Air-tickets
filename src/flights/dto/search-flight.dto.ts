import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateFlightDto } from './create-flight.dto';

export class SearchFlightDto extends PartialType(CreateFlightDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Zhulyani/Жуляни/IEV',
    description: 'Departure',
  })
  readonly departure: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '2021-05-16T15:35:00.000Z',
    description: 'Departure time',
  })
  readonly depTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Sheremetyevo/Шереметьево/SVO',
    description: 'Arrival',
  })
  readonly arrival: string;
}
