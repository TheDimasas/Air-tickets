import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$')
  @ApiProperty({ example: 'A1b2@c3d!', description: 'Password' })
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$')
  @ApiProperty({ example: 'B2a3#d1c*', description: 'New Password' })
  readonly newPassword: string;
}
