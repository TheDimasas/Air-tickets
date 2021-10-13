import { PartialType } from '@nestjs/swagger';

import { CreateAirplaneDto } from './create-airplane.dto';

export class UpdateAirplaneDto extends PartialType(CreateAirplaneDto) {}
