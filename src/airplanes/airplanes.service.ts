import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Airplane, AirplaneDocument } from './entities/airplane.entity';
import { CreateAirplaneDto } from './dto/create-airplane.dto';
import { UpdateAirplaneDto } from './dto/update-airplane.dto';

@Injectable()
export class AirplanesService {
  constructor(
    @InjectModel(Airplane.name) private airplaneModel: Model<AirplaneDocument>,
  ) {}

  public async createAirplane(
    airplaneDto: CreateAirplaneDto,
  ): Promise<Airplane> {
    try {
      let airplane = await this.airplaneModel.create({ ...airplaneDto });
      airplane = await this.airplaneModel
        .findById(airplane._id)
        .populate({ path: 'sections', select: '-__v' })
        .select({ __v: false })
        .exec();
      return airplane;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllAirplanes(): Promise<Airplane[]> {
    const airplanes = await this.airplaneModel
      .find()
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    return airplanes;
  }

  public async getAirplaneById(airplaneId: ObjectId): Promise<Airplane> {
    const airplane = await this.airplaneModel
      .findById(airplaneId)
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    if (!airplane) {
      throw new HttpException(
        'Airplane with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airplane;
  }

  public async updateAirplaneData(
    airplaneId: ObjectId,
    airplaneDto: UpdateAirplaneDto,
  ): Promise<Airplane> {
    let airplane = await this.airplaneModel.findById(airplaneId).exec();
    if (!airplane) {
      throw new BadRequestException('Airplane with this Id not found');
    }

    if (airplaneDto.airplaneName) {
      airplane.airplaneName = airplaneDto.airplaneName;
    }
    await airplane.save();

    airplane = await this.airplaneModel
      .findById(airplaneId)
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    return airplane;
  }

  public async deleteAirplane(airplaneId: ObjectId): Promise<Airplane> {
    const airplane = await this.airplaneModel
      .findByIdAndDelete(airplaneId)
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    if (!airplane) {
      throw new HttpException(
        'Airplane with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airplane;
  }
}
