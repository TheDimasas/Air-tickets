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
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { User } from 'src/users/entities/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiCreatedResponse({ description: 'Created', type: [User] })
  @ApiBody({ type: LoginUserDto })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const [resBody, jwt] = await this.authService.signIn(req.user);
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
    });
    return resBody;
  }

  @ApiOperation({ summary: 'Sign Up' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiCreatedResponse({ description: 'Created', type: [User] })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async signUp(@Body() userDto: CreateUserDto) {
    return await this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: 'Log Out' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
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
