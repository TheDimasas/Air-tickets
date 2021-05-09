import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';
import { Airline, AirlineDocument } from './schemas/airlines.schema';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectModel(Airline.name) private airlineModel: Model<AirlineDocument>,
  ) {}

  public async createAirline(airlineDto: CreateAirlineDto): Promise<Airline> {
    const candidate = await this.airlineModel
      .findOne({
        airlineNameLocal: airlineDto.airlineNameLocal,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Airline with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const airline = await this.airlineModel.create({ ...airlineDto });
      return airline;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllAirlines(): Promise<Airline[]> {
    const airlines = await this.airlineModel
      .find()
      .select({ __v: false })
      .exec();
    return airlines;
  }

  public async getAirlineById(airlineId: ObjectId): Promise<Airline> {
    const airline = await this.airlineModel
      .findById(airlineId)
      .select({ __v: false })
      .exec();
    return airline;
  }

  public async updateAirlineData(
    airlineId: ObjectId,
    airlineDto: UpdateAirlineDto,
  ): Promise<Airline> {
    const candidate = await this.airlineModel
      .findOne({
        airlineNameLocal: airlineDto.airlineNameLocal,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Airline with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const airline = await this.airlineModel.findByIdAndUpdate(
      airlineId,
      {
        airlineNameLocal: airlineDto.airlineNameLocal,
        airlineNameEng: airlineDto.airlineNameEng,
        descriptionEng: airlineDto.descriptionEng,
        descriptionLocal: airlineDto.descriptionLocal,
      },
      {
        new: true,
      },
    );
    return airline;
  }

  public async deleteAirline(airlineId: ObjectId): Promise<Airline> {
    const airline = await this.airlineModel.findByIdAndDelete(airlineId).exec();
    return airline;
  }
}
