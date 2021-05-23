import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { UsersService } from './users.service';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { User } from './entities/users.entity';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User data' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User data' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id/update')
  updateData(@Param('id') id: ObjectId, @Body() userDto: UpdateUserDataDto) {
    return this.usersService.updateUserData(id, userDto);
  }

  @ApiOperation({ summary: 'Change User password' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id/changePassword')
  changePassword(
    @Param('id') id: ObjectId,
    @Body() userDto: ChangeUserPasswordDto,
  ) {
    return this.usersService.changeUserPassword(id, userDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.usersService.deleteUser(id);
  }
}
