import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({ summary: 'Create a Ticket' })
  @ApiResponse({ status: 200, type: Ticket })
  @Post('reserve')
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(ticketDto);
  }

  @ApiOperation({ summary: 'Get data all Tickets' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @Get()
  findAll() {
    return this.ticketsService.getAllTickets();
  }

  @ApiOperation({ summary: 'Get Ticket data' })
  @ApiResponse({ status: 200, type: Ticket })
  @Get(':id')
  find(@Param('id') id: ObjectId) {
    return this.ticketsService.getTicketById(id);
  }

  @ApiOperation({ summary: 'Update Ticket data' })
  @ApiResponse({ status: 200, type: Ticket })
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() ticketDto: UpdateTicketDto) {
    return this.ticketsService.updateTicketData(id, ticketDto);
  }

  @ApiOperation({ summary: 'Return Ticket' })
  @ApiResponse({ status: 200, type: Ticket })
  @Delete(':id')
  return(@Param('id') id: ObjectId) {
    return this.ticketsService.returnTicket(id);
  }
}
