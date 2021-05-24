import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { SearchFlightByRangeDto } from './dto/search-flight-by-range.dto';
import { Flight } from './entities/flights.entity';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Create a Flight' })
  @ApiResponse({ status: 200, type: Flight })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiBody({ type: CreateFlightDto })
  @Roles('admin')
  @Post()
  create(@Body() flightDto: CreateFlightDto) {
    return this.flightsService.createFlight(flightDto);
  }

  @ApiOperation({ summary: 'Search Flights' })
  @ApiResponse({ status: 200, type: [Flight] })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiBody({ type: SearchFlightDto })
  @Post('search')
  search(@Body() flightDto: SearchFlightDto) {
    return this.flightsService.searchFlights(flightDto);
  }

  @ApiOperation({ summary: 'Search Flights by range' })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiResponse({ status: 200, type: [Flight] })
  @ApiBody({ type: SearchFlightByRangeDto })
  @Post('searchrange')
  searchByRange(@Body() flightDto: SearchFlightByRangeDto) {
    return this.flightsService.searchFlightsByRange(flightDto);
  }

  @ApiOperation({ summary: 'Get data all Flights' })
  @ApiResponse({ status: 200, type: [Flight] })
  @Get()
  findAll() {
    return this.flightsService.getAllFlights();
  }

  @ApiOperation({ summary: 'Get Flight data' })
  @ApiResponse({ status: 200, type: Flight })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.flightsService.getFlightById(id);
  }

  @ApiOperation({ summary: 'Update Flight data' })
  @ApiResponse({ status: 200, type: Flight })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateFlightDto })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() flightDto: UpdateFlightDto) {
    return this.flightsService.updateFlightData(id, flightDto);
  }

  @ApiOperation({ summary: 'Delete Flight' })
  @ApiResponse({ status: 200, type: Flight })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.flightsService.deleteFlight(id);
  }
}
