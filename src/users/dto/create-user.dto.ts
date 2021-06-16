import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  @ApiProperty({ example: 'Dmitry', description: 'First name' })
  readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  @ApiProperty({ example: 'Yefremov', description: 'Last name' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '380951234567', description: 'Phone number' })
  readonly phoneNumber: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com', description: 'E-mail' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$')
  @ApiProperty({ example: 'A1b2@c3d!', description: 'Password' })
  readonly password: string;
}
