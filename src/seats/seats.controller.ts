import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';

import { SeatsService } from './seats.service';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @ApiOperation({ summary: 'Update Seat data' })
  @ApiResponse({ status: 200, type: Seat })
  @Patch(':id/update')
  update(@Param('id') id: ObjectId, @Body() seatDto: UpdateSeatDto) {
    return this.seatsService.updateSeatData(id, seatDto);
  }

  // @ApiOperation({ summary: 'Update Seat data' })
  // @ApiResponse({ status: 200, type: Seat })
  // @Patch(':id/select')
  // select(@Param('id') id: ObjectId, @Body() seatDto: SelectSeatDto) {
  //   return this.seatsService.selectSeat(id, seatDto);
  // }
}
