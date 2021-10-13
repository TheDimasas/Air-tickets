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
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { FlightsService } from './flights.service';
import { Flight } from './entities/flights.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Create a Flight' })
  @ApiCreatedResponse({ description: 'Created', type: Flight })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: CreateFlightDto })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Post()
  create(@Body() flightDto: CreateFlightDto) {
    return this.flightsService.createFlight(flightDto);
  }

  @ApiOperation({ summary: 'Search Flights' })
  @ApiCreatedResponse({ description: 'Created', type: [Flight] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({ type: SearchFlightDto })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Post('search')
  search(@Body() flightDto: SearchFlightDto) {
    return this.flightsService.searchFlights(flightDto);
  }

  @ApiOperation({ summary: 'Get data all Flights' })
  @ApiOkResponse({ description: 'Success', type: [Flight] })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Get()
  findAll() {
    return this.flightsService.getAllFlights();
  }

  @ApiOperation({ summary: 'Get Flight data' })
  @ApiOkResponse({ description: 'Success', type: Flight })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.flightsService.getFlightById(id);
  }

  @ApiOperation({ summary: 'Update Flight data' })
  @ApiOkResponse({ description: 'Success', type: Flight })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: UpdateFlightDto })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() flightDto: UpdateFlightDto) {
    return this.flightsService.updateFlightData(id, flightDto);
  }

  @ApiOperation({ summary: 'Delete Flight' })
  @ApiOkResponse({ description: 'Success', type: Flight })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.flightsService.deleteFlight(id);
  }
}
