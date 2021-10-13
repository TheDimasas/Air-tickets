import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getProfile(userId: ObjectId) {
    return this.usersService.getUserById(userId);
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return [
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      this.jwtService.sign(payload),
    ];
  }

  async signUp(userDto: CreateUserDto) {
    let user = await this.usersService.getUserByEmail(userDto.email);
    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return user;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const passwordEquals = await bcrypt.compare(pass, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }
}
