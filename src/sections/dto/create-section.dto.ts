import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

import { Class } from '../entities/section.entity';

export class CreateSectionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '1700', description: 'Section Price' })
  readonly price: number;

  @IsNotEmpty()
  @IsIn([Class.Business, Class.Economy])
  @ApiProperty({ example: 'economy', description: 'Class' })
  readonly class: Class;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '90',
    description: 'Seats',
  })
  readonly seats: number;
}
