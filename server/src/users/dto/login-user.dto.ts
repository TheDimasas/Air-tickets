import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PartialType(
  OmitType(CreateUserDto, ['firstName', 'lastName', 'phoneNumber'] as const),
) {}
