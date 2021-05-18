import { PartialType } from '@nestjs/swagger';

import { CreateFlightDto } from './create-flight.dto';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}
