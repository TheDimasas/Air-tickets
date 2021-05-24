import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import Fuse from 'fuse.js';
import moment from 'moment';

import { CreateFlightDto } from './dto/create-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SearchFlightByRangeDto } from './dto/search-flight-by-range.dto';
import { Flight, FlightDocument } from './entities/flights.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}

  public async createFlight(flightDto: CreateFlightDto): Promise<Flight> {
    let flight = await this.flightModel
      .findOne({
        flightName: flightDto.flightName,
      })
      .exec();
    if (flight) {
      throw new BadRequestException('Flight with this name already exists');
    }

    try {
      flight = await this.flightModel.create({ ...flightDto });
      flight = await this.flightModel
        .findOne({
          flightName: flightDto.flightName,
        })
        .select({ __v: false })
        .populate({ path: 'airline', select: '-__v' })
        .populate({
          path: 'airplane',
          select: '-__v',
          populate: { path: 'sections', select: '-__v' },
        })
        .populate({ path: 'departureAirport', select: '-__v' })
        .populate({ path: 'arrivalAirport', select: '-__v' })
        .exec();
      return flight;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllFlights(): Promise<Flight[]> {
    const flights = await this.flightModel
      .find()
      .select({ __v: false })
      .populate({
        path: 'airplane',
        select: '-__v',
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'airline', select: '-__v' })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    return flights;
  }

  public async getFlightById(flightId: ObjectId): Promise<Flight> {
    const flight = await this.flightModel
      .findById(flightId)
      .select({ __v: false })
      .populate({ path: 'airplane', select: '-__v' })
      .populate({
        path: 'airplane',
        select: '-__v',
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }
    return flight;
  }

  public async updateFlightData(
    flightId: ObjectId,
    flightDto: UpdateFlightDto,
  ): Promise<Flight> {
    let flight = await this.flightModel.findById(flightId).exec();
    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }

    // if (flightDto.airline) {
    //   flight.airline = flightDto.airline.toString();
    // }
    // if (flightDto.airplane) {
    //   flight.airplane = flightDto.airplane.toString();
    // }
    // if (flightDto.arrivalAirport) {
    //   flight.arrivalAirport = flightDto.arrivalAirport.toString();
    // }
    if (flightDto.arrivalTime) {
      flight.arrivalTime = flightDto.arrivalTime;
    }
    if (flightDto.baggage) {
      flight.baggage = flightDto.baggage;
    }
    if (flightDto.carryOnBaggage) {
      flight.carryOnBaggage = flightDto.carryOnBaggage;
    }
    // if (flightDto.departureAirport) {
    //   flight.departureAirport = flightDto.departureAirport.toString();
    // }
    if (flightDto.departureTime) {
      flight.departureTime = flightDto.departureTime;
    }
    if (flightDto.exchange) {
      flight.exchange = flightDto.exchange;
    }
    if (flightDto.flightName) {
      flight.flightName = flightDto.flightName;
    }
    if (flightDto.refund) {
      flight.refund = flightDto.refund;
    }
    if (flightDto.taxa) {
      flight.taxa = flightDto.taxa;
    }
    await flight.save();

    flight = await this.flightModel
      .findById(flightId)
      .select({ __v: false })
      .populate({ path: 'airplane', select: '-__v' })
      .populate({
        path: 'airplane',
        select: '-__v',
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    return flight;
  }

  public async deleteFlight(flightId: ObjectId): Promise<Flight> {
    const flight = await this.flightModel
      .findByIdAndDelete(flightId)
      .select({ __v: false })
      .populate({ path: 'airplane', select: '-__v' })
      .populate({
        path: 'airplane',
        select: '-__v',
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();
    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }
    return flight;
  }

  public async searchFlights(flightDto: SearchFlightDto): Promise<Flight[]> {
    const initialFlights = await this.flightModel
      .find({
        departureTime: {
          $gte: moment(flightDto.depTime)
            .startOf('day')
            .add(3, 'hours')
            .toISOString()
            .toString(),
          $lte: moment(flightDto.depTime)
            .endOf('day')
            .add(3, 'hours')
            .toISOString()
            .toString(),
        },
      })
      .select({ __v: false })
      .populate({ path: 'airline', select: '-__v' })
      .populate({
        path: 'airplane',
        select: '-__v',
        match: { amountOfSeat: { $gte: 1 } },
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();

    const optionsForDeparture = {
      includeScore: true,
      keys: [
        'departureAirport.airportNameUa',
        'departureAirport.airportNameEng',
        'departureAirport.airportNameRu',
        'departureAirport.IATA',
        'departureAirport.airportTownUa',
        'departureAirport.airportTownEng',
        'departureAirport.airportTownRu',
      ],
    };

    let fuse = new Fuse(initialFlights, optionsForDeparture);
    let result = fuse.search(flightDto.departure).map((r) => r.item);
    const optionsForArrival = {
      includeScore: true,
      keys: [
        'arrivalAirport.airportNameUa',
        'arrivalAirport.airportNameEng',
        'arrivalAirport.airportNameRu',
        'arrivalAirport.IATA',
        'arrivalAirport.airportTownUa',
        'arrivalAirport.airportTownEng',
        'arrivalAirport.airportTownRu',
      ],
    };

    fuse = new Fuse(result, optionsForArrival);
    result = fuse.search(flightDto.arrival).map((r) => r.item);
    return result;
  }

  public async searchFlightsByRange(
    flightDto: SearchFlightByRangeDto,
  ): Promise<Flight[]> {
    const initialFlights = await this.flightModel
      .find({
        departureTime: {
          $gte: moment(flightDto.firstDepTime)
            .startOf('day')
            .add(3, 'hours')
            .toISOString()
            .toString(),
          $lte: moment(flightDto.secondDepTime)
            .endOf('day')
            .add(3, 'hours')
            .toISOString()
            .toString(),
        },
      })
      .select({ __v: false })
      .populate({ path: 'airline', select: '-__v' })
      .populate({
        path: 'airplane',
        select: '-__v',
        match: { amountOfSeat: { $gte: 1 } },
        populate: { path: 'sections', select: '-__v' },
      })
      .populate({ path: 'departureAirport', select: '-__v' })
      .populate({ path: 'arrivalAirport', select: '-__v' })
      .exec();

    const optionsForDeparture = {
      includeScore: true,
      keys: [
        'departureAirport.airportNameUa',
        'departureAirport.airportNameEng',
        'departureAirport.airportNameRu',
        'departureAirport.IATA',
        'departureAirport.airportTownUa',
        'departureAirport.airportTownEng',
        'departureAirport.airportTownRu',
      ],
    };

    let fuse = new Fuse(initialFlights, optionsForDeparture);
    let result = fuse.search(flightDto.departure).map((r) => r.item);
    const optionsForArrival = {
      includeScore: true,
      keys: [
        'arrivalAirport.airportNameUa',
        'arrivalAirport.airportNameEng',
        'arrivalAirport.airportNameRu',
        'arrivalAirport.IATA',
        'arrivalAirport.airportTownUa',
        'arrivalAirport.airportTownEng',
        'arrivalAirport.airportTownRu',
      ],
    };

    fuse = new Fuse(result, optionsForArrival);
    result = fuse.search(flightDto.arrival).map((r) => r.item);
    return result;
  }
}
