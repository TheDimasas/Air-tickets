import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @ApiProperty({ example: '1q2w3e4r5t6y', description: 'Password' })
  readonly password: string;
}
