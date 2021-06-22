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
  ApiConsumes,
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
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiBody({ type: CreateAirlineDto })
  @ApiCookieAuth()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('logo'))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(
    @Body() airlineDto: CreateAirlineDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.airlinesService.createAirline(airlineDto, logo);
  }

  @ApiOperation({ summary: 'Get data all Airlines' })
  @ApiOkResponse({ description: 'Success', type: [Airline] })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @Get()
  findAll() {
    return this.airlinesService.getAllAirlines();
  }

  @ApiOperation({ summary: 'Get Airline data' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOkResponse({ description: 'Success', type: Airline })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
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
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiBody({ type: UpdateAirlineDto })
  @ApiCookieAuth()
  @Roles('admin')
  @UseInterceptors(FileInterceptor('logo'))
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() airlineDto: UpdateAirlineDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.airlinesService.updateAirlineData(id, airlineDto, logo);
  }

  @ApiOperation({ summary: 'Delete Airline' })
  @ApiOkResponse({ description: 'Success', type: Airline })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.airlinesService.deleteAirline(id);
  }
}
