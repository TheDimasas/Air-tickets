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

import { AirlinesService } from './airlines.service';
import { Airline } from './entities/airlines.entity';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Airlines')
@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @ApiOperation({ summary: 'Create a Airline' })
  @ApiCreatedResponse({ description: 'Created', type: Airline })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: CreateAirlineDto })
  @ApiCookieAuth()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  create(
    @Body() airlineDto: CreateAirlineDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.airlinesService.createAirline(airlineDto, logo);
  }

  @ApiOperation({ summary: 'Get data all Airlines' })
  @ApiOkResponse({ description: 'Success', type: [Airline] })
  @Get()
  findAll() {
    return this.airlinesService.getAllAirlines();
  }

  @ApiOperation({ summary: 'Get Airline data' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOkResponse({ description: 'Success', type: Airline })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.airlinesService.getAirlineById(id);
  }

  @ApiOperation({ summary: 'Update Airline data' })
  @ApiOkResponse({ description: 'Success', type: Airline })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: UpdateAirlineDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() airlineDto: UpdateAirlineDto) {
    return this.airlinesService.updateAirlineData(id, airlineDto);
  }

  @ApiOperation({ summary: 'Delete Airline' })
  @ApiOkResponse({ description: 'Success', type: Airline })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airlinesService.deleteAirline(id);
  }
}
