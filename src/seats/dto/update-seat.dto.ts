import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

import { Status } from '../entities/seat.entity';
import { CreateSeatDto } from './create-seat.dto';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
  @IsNotEmpty()
  @IsIn([
    Status.Booked,
    Status.Free,
    Status.NotAvailable,
    Status.Paid,
    Status.Returned,
  ])
  @ApiProperty({ example: 'Booked', description: 'Class' })
  readonly status: Status;
}
