import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { Class } from '../entities/section.entity';

export class CreateSectionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '1700', description: 'Section Price' })
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Class)
  @ApiProperty({
    example: 'economy',
    description: 'Class',
    enum: Class,
    enumName: 'Class',
  })
  readonly class: Class;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '90',
    description: 'Seats',
  })
  readonly seats: number;
}
