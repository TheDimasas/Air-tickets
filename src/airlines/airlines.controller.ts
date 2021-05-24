import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

import { AirlinesService } from './airlines.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { Airline } from './entities/airlines.entity';

@ApiTags('Airlines')
@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @ApiOperation({ summary: 'Create a Airline' })
  @ApiResponse({ status: 200, type: Airline })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiNotFoundResponse({ description: 'Airline NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: CreateAirlineDto })
  @Post()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @Body() airlineDto: CreateAirlineDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.airlinesService.createAirline(airlineDto, logo);
  }

  @ApiOperation({ summary: 'Get data all Airlines' })
  @ApiResponse({ status: 200, type: [Airline] })
  @Get()
  findAll() {
    return this.airlinesService.getAllAirlines();
  }

  @ApiOperation({ summary: 'Get Airline data' })
  @ApiNotFoundResponse({ description: 'Airline NotFound' })
  @ApiResponse({ status: 200, type: Airline })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airlinesService.getAirlineById(id);
  }

  @ApiOperation({ summary: 'Update Airline data' })
  @ApiResponse({ status: 200, type: Airline })
  @ApiNotFoundResponse({ description: 'Airline NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateAirlineDto })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airlineDto: UpdateAirlineDto) {
    return this.airlinesService.updateAirlineData(id, airlineDto);
  }

  @ApiOperation({ summary: 'Delete Airline' })
  @ApiResponse({ status: 200, type: Airline })
  @ApiNotFoundResponse({ description: 'Airline NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airlinesService.deleteAirline(id);
  }
}
