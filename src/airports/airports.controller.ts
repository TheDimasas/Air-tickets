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
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Airport } from './entities/airport.entity';

@ApiTags('Airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @ApiOperation({ summary: 'Create a Airport' })
  @ApiResponse({ status: 200, type: Airport })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiBody({ type: CreateAirportDto })
  @Roles('admin')
  @Post()
  create(@Body() airportDto: CreateAirportDto) {
    return this.airportsService.createAirport(airportDto);
  }

  @ApiOperation({ summary: 'Get data all Airports' })
  @ApiResponse({ status: 200, type: [Airport] })
  @Get()
  findAll() {
    return this.airportsService.getAllAirports();
  }

  @ApiOperation({ summary: 'Get Airport data' })
  @ApiResponse({ status: 200, type: Airport })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airportsService.getAirportById(id);
  }

  @ApiOperation({ summary: 'Update Airport data' })
  @ApiResponse({ status: 200, type: Airport })
  @ApiNotFoundResponse({ description: 'Airport NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateAirportDto })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airportDto: UpdateAirportDto) {
    return this.airportsService.updateAirportData(id, airportDto);
  }

  @ApiOperation({ summary: 'Delete Airport' })
  @ApiResponse({ status: 200, type: Airport })
  @ApiNotFoundResponse({ description: 'Airport NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airportsService.deleteAirport(id);
  }
}
