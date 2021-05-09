import {
  Res,
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Request() req, @Res({ passthrough: true }) res: Response) {
    const [resBody, jwt] = await this.authService.signIn(req.user);
    res.cookie('access_token', jwt, { httpOnly: true, sameSite: 'lax' });
    return resBody;
  }

  @ApiOperation({ summary: 'Sign Up' })
  @Post('signUp')
  async signUp(@Body() userDto: CreateUserDto) {
    return await this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: 'Log Out' })
  @UseGuards(JwtAuthGuard)
  @Post('logOut')
  async logOut(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', { httpOnly: true, sameSite: 'lax' });
    return;
  }
}
