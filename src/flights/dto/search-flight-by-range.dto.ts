import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateFlightDto } from './create-flight.dto';

export class SearchFlightByRangeDto extends PartialType(CreateFlightDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Zhulyani/Жуляни/IEV',
    description: 'Departure',
  })
  readonly departure: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '2021-05-15T15:35:00.000Z',
    description: 'First range departure time',
  })
  readonly firstDepTime: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '2021-05-18T15:35:00.000Z',
    description: 'Second range departure time',
  })
  readonly secondDepTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Sheremetyevo/Шереметьево/SVO',
    description: 'Arrival',
  })
  readonly arrival: string;
}
