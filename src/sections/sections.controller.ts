import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiOperation({ summary: 'Create a Section' })
  @ApiCreatedResponse({ description: 'Created', type: Section })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: CreateSectionDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Post()
  create(@Body() sectionDto: CreateSectionDto) {
    return this.sectionsService.createSection(sectionDto);
  }

  @ApiOperation({ summary: 'Get data all Sections' })
  @ApiOkResponse({ description: 'Success', type: [Section] })
  @Get()
  findAll() {
    return this.sectionsService.getAllSections();
  }

  @ApiOperation({ summary: 'Get Section data' })
  @ApiOkResponse({ description: 'Success', type: Section })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.sectionsService.getSectionById(id);
  }

  @ApiOperation({ summary: 'Update Section data' })
  @ApiOkResponse({ description: 'Success', type: Section })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateSectionDto })
  @ApiCookieAuth()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() sectionDto: UpdateSectionDto) {
    return this.sectionsService.updateSectionData(id, sectionDto);
  }

  @ApiOperation({ summary: 'Delete Section' })
  @ApiOkResponse({ description: 'Success', type: Section })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiCookieAuth()
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.sectionsService.deleteSection(id);
  }
}
