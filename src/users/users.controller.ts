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
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data all Users' })
  @ApiOkResponse({ description: 'Success', type: [User] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCookieAuth()
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User data' })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiCookieAuth()
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User data' })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateUserDataDto })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  updateData(@Request() req: any, @Body() userDto: UpdateUserDataDto) {
    return this.usersService.updateUserData(req.user._id, userDto);
  }

  @ApiOperation({ summary: 'Change User password' })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: ChangeUserPasswordDto })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/changepassword')
  changePassword(@Request() req: any, @Body() userDto: ChangeUserPasswordDto) {
    return this.usersService.changeUserPassword(req.user._id, userDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ description: 'Success', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('')
  delete(@Request() req: any) {
    return this.usersService.deleteUser(req.user._id);
  }
}
