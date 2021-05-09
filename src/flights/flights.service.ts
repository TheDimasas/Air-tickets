import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateFlightDto } from './dto/create-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightsDocument } from './schemas/flights.schema';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightsDocument>,
  ) {}

  public async createFlight(flightDto: CreateFlightDto): Promise<Flight> {
    const candidate = await this.flightModel
      .findOne({
        flightName: flightDto.flightName,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Flight with this data already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const flight = await this.flightModel.create({ ...flightDto });
      return flight;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllFlights(): Promise<Flight[]> {
    const flights = await this.flightModel
      .find()
      .select({ __v: false })
      // .populate({ path: 'airline', select: '-__v' })
      // .populate({ path: 'departureAirport', select: '-__v' })
      // .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    return flights;
  }

  public async getFlightById(flightId: ObjectId): Promise<Flight> {
    const flight = await this.flightModel
      .findById(flightId)
      .select({ __v: false })
      .populate({ path: 'airline', select: '-__v' })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    return flight;
  }

  //does not work
  public async updateFlightData(
    flightId: ObjectId,
    flightDto: UpdateFlightDto,
  ): Promise<Flight> {
    const candidate = await this.flightModel
      .findOne({
        flightName: flightDto.flightName,
      })
      .exec();
    if (candidate) {
      throw new HttpException(
        'Flight with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const flight = await this.flightModel.findByIdAndUpdate(
      flightId,
      {
        flightName: flightDto.flightName,
        // airline: flightDto.airline,
        // departureAirport: flightDto.departureAirport,
        departureTime: flightDto.departureTime,
        // arrivalAirport: flightDto.arrivalAirport,
        arrivalTime: flightDto.arrivalTime,
        amountOfSeat: flightDto.amountOfSeat,
        price: flightDto.price,
        property: flightDto.property,
      },
      {
        new: true,
      },
    );
    return flight;
  }

  public async deleteFlight(flightId: ObjectId): Promise<Flight> {
    const flight = await this.flightModel.findByIdAndDelete(flightId).exec();
    return flight;
  }

  // public async searchFlights(flightDto: SearchFlightDto): Promise<Flight> {
  //   const flight = await this.flightModel
  //     .find({ departureAirport: flightDto.departureAirport })
  //     .select({ __v: false })
  //     .populate({ path: 'airline', select: '-__v' })
  //     .populate({ path: 'departureAirport', select: '-__v' })
  //     .populate({ path: 'arrivalAirport', select: '-__v' })
  //     .exec();
  //   return flight;
  // }
}
