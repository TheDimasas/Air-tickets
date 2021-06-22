import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    example: 'МАУ (Міжнародні Авіалінії України)',
    description: 'Ukrainian name of the airline',
  })
  readonly airlineNameUa: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'UIA (Ukraine International Airlines)',
    description: 'English name of the airline',
  })
  readonly airlineNameEng?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: 'МАУ (Международные Авиалинии Украины)',
    description: 'Russian name of the airline',
  })
  readonly airlineNameRu?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    example:
      'Міжнародні Авіалінії України працюють з 1 жовтня 1992 року і є флагманської авіакомпанією України',
    description: 'Ukrainian description of the airline',
  })
  readonly descriptionUa: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    example:
      'Ukraine International Airlines has been operating since October 1, 1992 and is the flagship airline of Ukraine',
    description: 'English description of the airline',
  })
  readonly descriptionEng?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    example:
      'Международные авиалинии Украины работают с 1 октября 1992 года и являются флагманской авиакомпанией Украины.',
    description: 'Russian description of the airline',
  })
  readonly descriptionRu?: string;

  @ApiProperty({
    type: 'file',
    properties: {
      logo: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  readonly logo: any;
}
