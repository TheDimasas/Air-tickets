import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { Airport, AirportDocument } from './entities/airport.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectModel(Airport.name) private airportModel: Model<AirportDocument>,
  ) {}

  public async createAirport(airportDto: CreateAirportDto): Promise<Airport> {
    let airport = await this.airportModel
      .findOne({
        IATA: airportDto.IATA,
      })
      .exec();
    if (airport) {
      throw new HttpException(
        'Airport with this IATA already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      airport = await this.airportModel.create({ ...airportDto });
      airport = await this.airportModel
        .findOne({
          IATA: airportDto.IATA,
        })
        .select({ __v: false })
        .exec();
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
    if (!airport) {
      throw new HttpException(
        'Airport with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airport;
  }

  public async updateAirportData(
    airportId: ObjectId,
    airportDto: UpdateAirportDto,
  ): Promise<Airport> {
    let airport = await this.airportModel.findById(airportId).exec();
    if (!airport) {
      throw new BadRequestException('Airport with this Id not found');
    }

    if (airportDto.IATA) {
      airport.IATA = airportDto.IATA;
    }
    if (airportDto.airportCountryEng) {
      airport.airportCountryEng = airportDto.airportCountryEng;
    }
    if (airportDto.airportCountryUa) {
      airport.airportCountryUa = airportDto.airportCountryUa;
    }
    if (airportDto.airportCountryRu) {
      airport.airportCountryRu = airportDto.airportCountryRu;
    }
    if (airportDto.airportNameEng) {
      airport.airportNameEng = airportDto.airportNameEng;
    }
    if (airportDto.airportNameUa) {
      airport.airportNameUa = airportDto.airportNameUa;
    }
    if (airportDto.airportNameRu) {
      airport.airportNameRu = airportDto.airportNameRu;
    }
    if (airportDto.airportTownEng) {
      airport.airportTownEng = airportDto.airportTownEng;
    }
    if (airportDto.airportTownUa) {
      airport.airportTownUa = airportDto.airportTownUa;
    }
    if (airportDto.airportTownRu) {
      airport.airportTownRu = airportDto.airportTownRu;
    }
    await airport.save();

    airport = await this.airportModel
      .findById(airportId)
      .select({ __v: false })
      .exec();
    return airport;
  }

  public async deleteAirport(airportId: ObjectId): Promise<Airport> {
    const airport = await this.airportModel
      .findByIdAndDelete(airportId)
      .select({ __v: false })
      .exec();
    if (!airport) {
      throw new HttpException(
        'Airport with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return airport;
  }
}
