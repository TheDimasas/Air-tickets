import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUppercase, Length } from 'class-validator';

import { CreateAirportDto } from './create-airport.dto';

export class UpdateAirportDto extends PartialType(CreateAirportDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Жуляни', description: 'Local airport name' })
  readonly airportNameLocal: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Zhulyani',
    description: 'English airport name',
  })
  readonly airportNameEng: string;

  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @Length(2, 4)
  @ApiProperty({ example: 'IEV', description: 'IATA' })
  readonly IATA: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Україна',
    description: 'The Local name of the country of the airport',
  })
  readonly airportCountryLocal: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the country of the airport',
  })
  readonly airportCountryEng: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Київ',
    description: 'The Local name of the airport town',
  })
  readonly airportTownLocal: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Kiev',
    description: 'The English name of the airport town',
  })
  readonly airportTownEng: string;
}
