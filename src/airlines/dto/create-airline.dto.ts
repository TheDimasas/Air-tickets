import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'МАУ (Міжнародні Авіалінії України)',
    description: 'Local name of the airline',
  })
  readonly airlineNameLocal: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'English name of the airline',
  })
  readonly airlineNameEng: string;

  @IsString()
  @ApiProperty({
    example:
      'Міжнародні Авіалінії України працюють з 1 жовтня 1992 року і є флагманської авіакомпанією України',
    description: 'Local description of the airline',
  })
  readonly descriptionLocal: string;

  @IsString()
  @ApiProperty({
    example:
      'Ukraine International Airlines has been operating since October 1, 1992 and is the flagship airline of Ukraine',
    description: 'English description of the airline',
  })
  readonly descriptionEng: string;
}
