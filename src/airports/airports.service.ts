import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Airport, AirportDocument } from './schemas/airport.schema';

@Injectable()
export class AirportsService {
  constructor(
    @InjectModel(Airport.name) private airportModel: Model<AirportDocument>,
  ) {}

  public async createAirport(airportDto: CreateAirportDto): Promise<Airport> {
    const candidate = await this.airportModel
      .findOne({
        IATA: airportDto.IATA,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Airport with this data already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const airport = await this.airportModel.create({ ...airportDto });
      return airport;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllAirports(): Promise<Airport[]> {
    const airports = await this.airportModel
      .find()
      .select({ __v: false })
      .exec();
    return airports;
  }

  public async getAirportById(airportId: ObjectId): Promise<Airport> {
    const airport = await this.airportModel
      .findById(airportId)
      .select({ __v: false })
      .exec();
    return airport;
  }

  public async updateAirportData(
    airportId: ObjectId,
    airportDto: UpdateAirportDto,
  ): Promise<Airport> {
    const candidate = await this.airportModel
      .findOne({
        IATA: airportDto.IATA,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Airport with this IATA already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const airport = await this.airportModel.findByIdAndUpdate(
      airportId,
      {
        IATA: airportDto.IATA,
        airportCountryEng: airportDto.airportCountryEng,
        airportCountryLocal: airportDto.airportCountryLocal,
        airportNameEng: airportDto.airportNameEng,
        airportNameLocal: airportDto.airportNameLocal,
        airportTownEng: airportDto.airportTownEng,
        airportTownLocal: airportDto.airportTownLocal,
      },
      {
        new: true,
      },
    );
    return airport;
  }

  public async deleteAirport(airportId: ObjectId): Promise<Airport> {
    const airport = await this.airportModel.findByIdAndDelete(airportId).exec();
    return airport;
  }
}
