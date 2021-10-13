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

import { AirportsService } from './airports.service';
import { Airport } from './entities/airport.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @ApiOperation({ summary: 'Create a Airport' })
  @ApiCreatedResponse({ description: 'Created', type: Airport })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiBody({ type: CreateAirportDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Post()
  create(@Body() airportDto: CreateAirportDto) {
    return this.airportsService.createAirport(airportDto);
  }

  @ApiOperation({ summary: 'Get data all Airports' })
  @ApiOkResponse({ description: 'Success', type: [Airport] })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Get()
  findAll() {
    return this.airportsService.getAllAirports();
  }

  @ApiOperation({ summary: 'Get Airport data' })
  @ApiOkResponse({ description: 'Success', type: Airport })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airportsService.getAirportById(id);
  }

  @ApiOperation({ summary: 'Update Airport data' })
  @ApiOkResponse({ description: 'Success', type: Airport })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiBody({ type: UpdateAirportDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airportDto: UpdateAirportDto) {
    return this.airportsService.updateAirportData(id, airportDto);
  }

  @ApiOperation({ summary: 'Delete Airport' })
  @ApiOkResponse({ description: 'Success', type: Airport })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airportsService.deleteAirport(id);
  }
}
