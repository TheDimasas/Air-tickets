import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @ApiOperation({ summary: 'Update Seat data' })
  @ApiResponse({ status: 200, type: Seat })
  @ApiNotFoundResponse({ description: 'Seat NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateSeatDto })
  @Patch(':id/update')
  update(@Param('id') id: ObjectId, @Body() seatDto: UpdateSeatDto) {
    return this.seatsService.updateSeatData(id, seatDto);
  }
}
