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

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get data all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User data' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User data' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() userDto: UpdateUserDto) {
    return this.usersService.updateUserData(id, userDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.usersService.deleteUser(id);
  }
}
