import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { FilesService, Folder } from '../files/files.service';
import { Airline, AirlineDocument } from './entities/airlines.entity';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';

@Injectable()
export class AirlinesService {
  constructor(
    @InjectModel(Airline.name) private airlineModel: Model<AirlineDocument>,
    private filesService: FilesService,
  ) {}

  public async createAirline(
    airlineDto: CreateAirlineDto,
    logo: any,
  ): Promise<Airline> {
    let airline = await this.airlineModel
      .findOne({
        airlineNameUa: airlineDto.airlineNameUa,
      })
      .exec();
    if (airline) {
      throw new HttpException(
        'Airline with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const fileName = await this.filesService.createFile(Folder.Airline, logo);
      airline = await this.airlineModel.create({
        ...airlineDto,
        logo: fileName,
      });

      airline = await this.airlineModel
        .findOne({ airlineNameUa: airlineDto.airlineNameUa })
        .select({ __v: false })
        .exec();
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
    if (!airline) {
      throw new HttpException(
        'Airline with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airline;
  }

  public async updateAirlineData(
    airlineId: ObjectId,
    airlineDto: UpdateAirlineDto,
  ): Promise<Airline> {
    let airline = await this.airlineModel.findById(airlineId).exec();
    if (!airline) {
      throw new HttpException(
        'Airline with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (airlineDto.airlineNameEng) {
      airline.airlineNameEng = airlineDto.airlineNameEng;
    }
    if (airlineDto.airlineNameRu) {
      airline.airlineNameRu = airlineDto.airlineNameRu;
    }
    if (airlineDto.airlineNameUa) {
      airline.airlineNameUa = airlineDto.airlineNameUa;
    }
    if (airlineDto.descriptionEng) {
      airline.descriptionEng = airlineDto.descriptionEng;
    }
    if (airlineDto.descriptionRu) {
      airline.descriptionRu = airlineDto.descriptionRu;
    }
    if (airlineDto.descriptionUa) {
      airline.descriptionUa = airlineDto.descriptionUa;
    }
    await airline.save();

    airline = await this.airlineModel
      .findById(airlineId)
      .select({ __v: false })
      .exec();
    return airline;
  }

  public async deleteAirline(airlineId: ObjectId): Promise<Airline> {
    const airline = await this.airlineModel
      .findByIdAndDelete(airlineId)
      .select({ __v: false })
      .exec();
    if (!airline) {
      throw new HttpException(
        'Airline with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airline;
  }
}
