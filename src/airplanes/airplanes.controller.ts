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

import { AirplanesService } from './airplanes.service';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';
import { Airplane } from './entities/airplane.entity';

@ApiTags('Airplanes')
@Controller('airplanes')
export class AirplanesController {
  constructor(private readonly airplanesService: AirplanesService) {}

  @ApiOperation({ summary: 'Create a Airplane' })
  @ApiResponse({ status: 200, type: Airplane })
  @Post()
  create(@Body() airplaneDto: CreateAirplaneDto) {
    return this.airplanesService.createAirplane(airplaneDto);
  }

  @ApiOperation({ summary: 'Get data all Airplanes' })
  @ApiResponse({ status: 200, type: [Airplane] })
  @Get()
  findAll() {
    return this.airplanesService.getAllAirplanes();
  }

  @ApiOperation({ summary: 'Get Airplane data' })
  @ApiResponse({ status: 200, type: Airplane })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airplanesService.getAirplaneById(id);
  }

  @ApiOperation({ summary: 'Update Airplane data' })
  @ApiResponse({ status: 200, type: Airplane })
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airplaneDto: UpdateAirplaneDto) {
    return this.airplanesService.updateAirplaneData(id, airplaneDto);
  }

  @ApiOperation({ summary: 'Delete Airplane' })
  @ApiResponse({ status: 200, type: Airplane })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airplanesService.deleteAirplane(id);
  }
}
