import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateSeatDto } from './dto/update-seat.dto';

import { Seat, SeatDocument } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(@InjectModel(Seat.name) private seatModel: Model<SeatDocument>) {}

  public async updateSeatData(
    seatId: ObjectId,
    seatDto: UpdateSeatDto,
  ): Promise<Seat> {
    let seat = await this.seatModel.findById(seatId).exec();
    if (!seat) {
      throw new HttpException(
        'Seat with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (seatDto.status) {
      seat.status = seatDto.status;
    }
    await seat.save();
    seat = await this.seatModel.findById(seatId).select({ __v: false }).exec();
    return seat;
  }
}
