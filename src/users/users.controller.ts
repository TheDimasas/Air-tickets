import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
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

import { UsersService } from './users.service';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { User } from './entities/users.entity';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User data' })
  @ApiResponse({ status: 200, type: User })
  @ApiNotFoundResponse({ description: 'User NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User data' })
  @ApiResponse({ status: 200, type: User })
  @ApiNotFoundResponse({ description: 'User NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateUserDataDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  updateData(@Request() req, @Body() userDto: UpdateUserDataDto) {
    return this.usersService.updateUserData(req.user._id, userDto);
  }

  @ApiOperation({ summary: 'Change User password' })
  @ApiResponse({ status: 200, type: User })
  @ApiNotFoundResponse({ description: 'User NotFound' })
  @ApiBadRequestResponse({ description: 'Password mismatch' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: ChangeUserPasswordDto })
  @UseGuards(JwtAuthGuard)
  @Patch('/changepassword')
  changePassword(@Request() req, @Body() userDto: ChangeUserPasswordDto) {
    return this.usersService.changeUserPassword(req.user._id, userDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: User })
  @ApiNotFoundResponse({ description: 'User NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete('')
  delete(@Request() req) {
    return this.usersService.deleteUser(req.user._id);
  }
}
