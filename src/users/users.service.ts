import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { User, UserDocument } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      let user = await this.userModel.create({ ...userDto });
      user = await this.userModel
        .findOne({ email: userDto.email })
        .select({ password: false, __v: false })
        .exec();
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
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async updateUserData(
    userId: ObjectId,
    userDto: UpdateUserDataDto,
  ): Promise<User> {
    let user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (userDto.email) {
      user.email = userDto.email;
    }
    if (userDto.firstName) {
      user.firstName = userDto.firstName;
    }
    if (userDto.lastName) {
      user.lastName = userDto.lastName;
    }
    if (userDto.phoneNumber) {
      user.phoneNumber = userDto.phoneNumber;
    }
    await user.save();

    user = await this.userModel
      .findById(userId)
      .select({ password: false, __v: false })
      .exec();
    return user;
  }

  public async changeUserPassword(
    userId: ObjectId,
    userDto: ChangeUserPasswordDto,
  ): Promise<User> {
    let user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordEquals = await bcrypt.compare(
      userDto.oldPassword,
      user.password,
    );
    const newPasswordEquals = await bcrypt.compare(
      userDto.newPassword,
      user.password,
    );

    if (!passwordEquals) {
      throw new HttpException('Password mismatch', HttpStatus.BAD_REQUEST);
    } else if (newPasswordEquals) {
      throw new HttpException(
        'New and old passwords must not match',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(userDto.newPassword, salt);
      user.password = hashPassword;
    }
    await user.save();

    user = await this.userModel
      .findById(userId)
      .select({ password: false, __v: false })
      .exec();
    return user;
  }

  public async deleteUser(userId: ObjectId): Promise<User> {
    const user = await this.userModel
      .findByIdAndDelete(userId)
      .select({ password: false, __v: false })
      .exec();
    if (!user) {
      throw new HttpException(
        'User with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }
}
