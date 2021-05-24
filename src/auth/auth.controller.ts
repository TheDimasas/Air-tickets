import {
  Res,
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @ApiBody({ type: LoginUserDto })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req, @Res({ passthrough: true }) res: Response) {
    const [resBody, jwt] = await this.authService.signIn(req.user);
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
    });
    return resBody;
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    return await this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: 'Log Out' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Ok' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
    });
    return;
  }
}
