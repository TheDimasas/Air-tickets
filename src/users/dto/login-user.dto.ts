import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'dimochka.efremov@gmail.com', description: 'E-mail' })
  readonly email: string;

  @IsAlphanumeric()
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1q2w3e4r5t6y', description: 'Password' })
  readonly password: string;
}
