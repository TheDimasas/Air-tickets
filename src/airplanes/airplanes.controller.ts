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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { AirplanesService } from './airplanes.service';
import { Airplane } from './entities/airplane.entity';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Airplanes')
@Controller('airplanes')
export class AirplanesController {
  constructor(private readonly airplanesService: AirplanesService) {}

  @ApiOperation({ summary: 'Create a Airplane' })
  @ApiCreatedResponse({ description: 'Created', type: Airplane })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: CreateAirplaneDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Post()
  create(@Body() airplaneDto: CreateAirplaneDto) {
    return this.airplanesService.createAirplane(airplaneDto);
  }

  @ApiOperation({ summary: 'Get data all Airplanes' })
  @ApiOkResponse({ description: 'Success', type: [Airplane] })
  @Get()
  findAll() {
    return this.airplanesService.getAllAirplanes();
  }

  @ApiOperation({ summary: 'Get Airplane data' })
  @ApiOkResponse({ description: 'Success', type: Airplane })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airplanesService.getAirplaneById(id);
  }

  @ApiOperation({ summary: 'Update Airplane data' })
  @ApiOkResponse({ description: 'Success', type: Airplane })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: UpdateAirplaneDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airplaneDto: UpdateAirplaneDto) {
    return this.airplanesService.updateAirplaneData(id, airplaneDto);
  }

  @ApiOperation({ summary: 'Delete Airplane' })
  @ApiOkResponse({ description: 'Success', type: Airplane })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airplanesService.deleteAirplane(id);
  }
}
