import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Flight } from 'src/flights/entities/flights.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { User } from 'src/users/entities/users.entity';
import { Sex, Status, Type } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: 'PS-9065', description: 'Flight' })
  readonly flight: Flight;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: 'test@gmail.com', description: 'User' })
  readonly user: User;

  @IsNotEmpty()
  @IsEnum(Sex)
  @ApiProperty({
    example: 'male',
    description: 'Sex',
    enum: Sex,
    enumName: 'Sex',
  })
  readonly sex: Sex;

  @IsNotEmpty()
  @IsEnum(Type)
  @ApiProperty({
    example: 'adult',
    description: 'Type',
    enum: Type,
    enumName: 'Type',
  })
  readonly type: Type;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Dmitry', description: 'First Name' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Efremov', description: 'Last Name' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '2000-08-31T00:00:00.000Z', description: 'Birthday' })
  readonly birthday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Україна',
    description: 'The Ukranian name of the citizenship',
  })
  readonly citizenshipUa: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Ukraine',
    description: 'The English name of the citizenship',
  })
  readonly citizenshipEng?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Украина',
    description: 'The Russian name of the citizenship',
  })
  readonly citizenshipRu?: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 9)
  @ApiProperty({ example: 'RS123456', description: 'Document' })
  readonly document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2016-08-31T00:00:00.000Z', description: 'Validity' })
  readonly validity: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({
    example: 'booked',
    description: 'Status',
    enum: Status,
    enumName: 'Status',
  })
  readonly status: Status;

  @IsOptional()
  @ApiPropertyOptional({
    example: '23',
    description: 'Number Of Seat',
  })
  readonly numberOfSeat?: Seat;
}
