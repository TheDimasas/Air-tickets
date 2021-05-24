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
  ApiNotFoundResponse,
  ApiOperation,
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
  @ApiResponse({ status: 200, type: Section })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: CreateSectionDto })
  @Roles('admin')
  @Post()
  create(@Body() sectionDto: CreateSectionDto) {
    return this.sectionsService.createSection(sectionDto);
  }

  @ApiOperation({ summary: 'Get data all Sections' })
  @ApiResponse({ status: 200, type: [Section] })
  @Get()
  findAll() {
    return this.sectionsService.getAllSections();
  }

  @ApiOperation({ summary: 'Get Section data' })
  @ApiResponse({ status: 200, type: Section })
  @ApiNotFoundResponse({ description: 'Section NotFound' })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.sectionsService.getSectionById(id);
  }

  @ApiOperation({ summary: 'Update Section data' })
  @ApiResponse({ status: 200, type: Section })
  @ApiNotFoundResponse({ description: 'Section NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateSectionDto })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() sectionDto: UpdateSectionDto) {
    return this.sectionsService.updateSectionData(id, sectionDto);
  }

  @ApiOperation({ summary: 'Delete Section' })
  @ApiResponse({ status: 200, type: Section })
  @ApiNotFoundResponse({ description: 'Section NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.sectionsService.deleteSection(id);
  }
}
