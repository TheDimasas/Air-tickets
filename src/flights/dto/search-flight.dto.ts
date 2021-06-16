import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Class } from 'src/sections/entities/section.entity';

export class SearchFlightDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Zhulyani/Жуляни/IEV',
    description: 'Departure',
  })
  readonly departure: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ApiProperty({
    example: '2021-05-15T15:35:00.000Z',
    description: 'First range departure time',
  })
  readonly firstDepTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2021-05-18T15:35:00.000Z',
    description: 'Second range departure time',
  })
  readonly secondDepTime?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Sheremetyevo/Шереметьево/SVO',
    description: 'Arrival',
  })
  readonly arrival: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Class, { each: true })
  @ArrayNotEmpty()
  @ApiProperty({
    example: '["business"]',
    description: 'Class of section',
  })
  readonly class: Class[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(9)
  @ApiProperty({
    example: '3',
    description: 'Count of seats',
  })
  readonly count: number;
}
