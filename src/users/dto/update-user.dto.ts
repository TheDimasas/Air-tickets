import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Dmitry', description: 'First name' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Yefremov', description: 'Last name' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '380951234567', description: 'Phone number' })
  readonly phoneNumber: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'dimochka.efremov@gmail.com', description: 'E-mail' })
  readonly email: string;
}
