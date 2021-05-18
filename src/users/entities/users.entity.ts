import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

import { Ticket } from 'src/tickets/entities/ticket.entity';

export type UserDocument = User & Document;

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Schema()
export class User {
  @ApiProperty({ example: 'Іван', description: 'First name' })
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiProperty({ example: 'Шевченко', description: 'Last name' })
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty({ example: '380951234567', description: 'Phone number' })
  @Prop({ required: true })
  phoneNumber: number;

  @ApiProperty({ example: 'A1b2@c3d!', description: 'Password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'E-mail' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'user', description: 'Role' })
  @Prop({ required: true, trim: true, enum: Role, default: Role.User })
  role: Role;

  @ApiProperty({
    example: 'ticket',
    description: 'Tickets',
  })
  @Prop({
    trim: true,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Ticket',
  })
  tickets: Ticket[];
}
export const UserSchema = SchemaFactory.createForClass(User);
