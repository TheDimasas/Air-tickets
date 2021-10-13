import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { SeatsService } from './seats.service';
import { Seat } from './entities/seat.entity';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @ApiOperation({ summary: 'Update Seat data' })
  @ApiOkResponse({ description: 'Success', type: Seat })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: UpdateSeatDto })
  @UseGuards(JwtAuthGuard)
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Patch(':id/update')
  update(@Param('id') id: ObjectId, @Body() seatDto: UpdateSeatDto) {
    return this.seatsService.updateSeatData(id, seatDto);
  }
}
