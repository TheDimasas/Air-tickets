import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Seat } from 'src/seats/entities/seat.entity';
import { Sex, Status, Type } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: 'PS-9065', description: 'Flight' })
  readonly flight: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: 'test@gmail.com', description: 'User' })
  readonly user: ObjectId;

  @IsNotEmpty()
  @IsEnum(Sex)
  @ApiProperty({ example: 'male', description: 'Sex' })
  readonly sex: Sex;

  @IsNotEmpty()
  @IsEnum(Type)
  @ApiProperty({ example: 'adult', description: 'Type' })
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
  @ApiProperty({
    example: 'Ukraine',
    description: 'The English name of the citizenship',
  })
  readonly citizenshipEng?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
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
  @ApiProperty({ example: 'booked', description: 'Status' })
  readonly status: Status;

  @IsOptional()
  @ApiProperty({
    example: '23',
    description: 'Number Of Seat',
  })
  readonly numberOfSeat?: Seat;
}
