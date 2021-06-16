import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { Status } from '../entities/seat.entity';
import { CreateSeatDto } from './create-seat.dto';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'Booked',
    description: 'Class',
    enum: Status,
    enumName: 'Status',
  })
  readonly status: Status;
}
