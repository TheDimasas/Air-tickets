import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async createUser(userDto: CreateUserDto): Promise<User> {
    const candidate = await this.userModel
      .findOne({ email: userDto.email })
      .exec();
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = await this.userModel.create({ ...userDto });
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.userModel
      .find()
      .select({ password: false, __v: false })
      .exec();
    return users;
  }

  public async getUserById(userId: ObjectId): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .select({ password: false, __v: false })
      .exec();
    return user;
  }

  public async updateUserData(
    userId: ObjectId,
    userDto: UpdateUserDto,
  ): Promise<User> {
    const candidate = await this.userModel
      .findOne({ email: userDto.email })
      .exec();
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        phoneNumber: userDto.phoneNumber,
      },
      {
        new: true,
      },
    );
    return user;
  }

  public async deleteUser(userId: ObjectId): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
