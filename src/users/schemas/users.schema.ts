import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'Іван', description: 'First name' })
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiProperty({ example: 'Шевченко', description: 'Last name' })
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty({ example: '0951234567', description: 'Phone number' })
  @Prop({ required: true })
  phoneNumber: number;

  @ApiProperty({ example: '1q2w3e4r5t6y', description: 'Password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'E-mail' })
  @Prop({ required: true, unique: true })
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
