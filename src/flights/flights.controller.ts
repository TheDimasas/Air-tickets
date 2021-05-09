import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { Flight } from './schemas/flights.schema';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Create a Flight' })
  @ApiResponse({ status: 200, type: Flight })
  @Post()
  create(@Body() flightDto: CreateFlightDto) {
    return this.flightsService.createFlight(flightDto);
  }

  // @ApiOperation({ summary: 'Search Flights' })
  // @ApiResponse({ status: 200, type: [Flight] })
  // @Post()
  // search(@Body() flightDto: SearchFlightDto) {
  //   return this.flightsService.searchFlights(flightDto);
  // }

  @ApiOperation({ summary: 'Get data all Flights' })
  @ApiResponse({ status: 200, type: [Flight] })
  @Get()
  findAll() {
    return this.flightsService.getAllFlights();
  }

  @ApiOperation({ summary: 'Get Flights data' })
  @ApiResponse({ status: 200, type: Flight })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.flightsService.getFlightById(id);
  }

  @ApiOperation({ summary: 'Update Flight data' })
  @ApiResponse({ status: 200, type: Flight })
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() flightDto: UpdateFlightDto) {
    return this.flightsService.updateFlightData(id, flightDto);
  }

  @ApiOperation({ summary: 'Delete Flight' })
  @ApiResponse({ status: 200, type: Flight })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.flightsService.deleteFlight(id);
  }
}
