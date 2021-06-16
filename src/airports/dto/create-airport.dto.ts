import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAirportDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Жуляни', description: 'Ukranian airport name' })
  readonly airportNameUa: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Zhulyani',
    description: 'English airport name',
  })
  readonly airportNameEng?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Жуляны',
    description: 'Russian airport name',
  })
  readonly airportNameRu?: string;

  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @Length(2, 4)
  @ApiProperty({ example: 'IEV', description: 'IATA' })
  readonly IATA: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Україна',
    description: 'The Ukranian name of the country of the airport',
  })
  readonly airportCountryUa: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the country of the airport',
  })
  readonly airportCountryEng?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Украина',
    description: 'The Russian name of the country of the airport',
  })
  readonly airportCountryRu?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Київ',
    description: 'The Ukranian name of the airport town',
  })
  readonly airportTownUa: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Kiev',
    description: 'The English name of the airport town',
  })
  readonly airportTownEng?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'Киев',
    description: 'The Russian name of the airport town',
  })
  readonly airportTownRu?: string;
}
