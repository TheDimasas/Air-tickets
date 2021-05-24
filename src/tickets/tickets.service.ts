import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Status, Ticket, TicketDocument } from './entities/ticket.entity';
import { Flight, FlightDocument } from 'src/flights/entities/flights.entity';
import { User, UserDocument } from 'src/users/entities/users.entity';
import {
  Airplane,
  AirplaneDocument,
} from 'src/airplanes/entities/airplane.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
    @InjectModel(Airplane.name) private airplaneModel: Model<AirplaneDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async createTicket(ticketDto: CreateTicketDto): Promise<Ticket> {
    const flight = await this.flightModel
      .findById(ticketDto.flight)
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

    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }

    const user = await this.userModel
      .findById(ticketDto.user)
      .select({ password: false, __v: false })
      .exec();
    if (!user) {
      throw new BadRequestException('User with this name not found');
    }

    const ticket = await this.ticketModel.create({ ...ticketDto });
    const airplane = await this.airplaneModel
      .findById(flight.airplane)
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    if (!airplane) {
      throw new HttpException(
        'Airplane with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    user.tickets.push(ticket._id);
    await user.save();
    airplane.amountOfSeat -= 1;
    await airplane.save();
    return ticket;
  }

  public async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketModel
      .find()
      .select({ __v: false })
      .populate({ path: 'flight', select: '-__v' })
      .populate({ path: 'user', select: '-__v' })
      .exec();
    return tickets;
  }

  public async getTicketById(
    userId: ObjectId,
    ticketId: ObjectId,
  ): Promise<Ticket> {
    const ticket = await this.ticketModel
      .findById(ticketId)
      .findOne({ user: userId.toString() })
      .select({ __v: false })
      .populate({ path: 'flight', select: '-__v' })
      .populate({ path: 'user', select: '-__v' })
      .exec();
    if (!ticket) {
      throw new BadRequestException('Ticket with this id not found');
    }
    return ticket;
  }

  public async updateTicketData(
    userId: ObjectId,
    ticketId: ObjectId,
    ticketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const flight = await this.flightModel
      .findById(ticketDto.flight)
      .select({ __v: false })
      .exec();
    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }

    const user = await this.userModel
      .findById(userId)
      .select({ password: false, __v: false })
      .exec();
    if (!user) {
      throw new BadRequestException('User with this name not found');
    }
    const ticket = await this.ticketModel.findById(ticketId).exec();
    return ticket;
  }

  public async returnTicket(
    userId: ObjectId,
    ticketId: ObjectId,
  ): Promise<Ticket> {
    let ticket = await this.ticketModel.findById(ticketId).exec();
    const flight = await this.flightModel.findById(ticket.flight).exec();
    if (!flight) {
      throw new BadRequestException('Flight with this name not found');
    }

    ticket = await this.ticketModel.findByIdAndDelete(ticketId).exec();
    const airplane = await this.airplaneModel
      .findById(flight.airplane)
      .findOne({ user: userId.toString() })
      .populate({ path: 'sections', select: '-__v' })
      .select({ __v: false })
      .exec();
    if (!airplane) {
      throw new HttpException(
        'Airplane with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    ticket.status = Status.Returned;
    await ticket.save();
    airplane.amountOfSeat += 1;
    await airplane.save();
    return ticket;
  }
}
