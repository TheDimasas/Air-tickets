import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  @ApiBody({ type: CreateTicketDto })
  @ApiNotFoundResponse({ description: 'Flight or User NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'BadRequest' })
  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(ticketDto);
  }

  @ApiOperation({ summary: 'Get data all Tickets' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles('admin')
  @Get()
  findAll() {
    return this.ticketsService.getAllTickets();
  }

  @ApiOperation({ summary: 'Get Ticket data' })
  @ApiResponse({ status: 200, type: Ticket })
  @ApiNotFoundResponse({ description: 'Flight NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Request() req, @Param('id') id: ObjectId) {
    return this.ticketsService.getTicketById(req.user._id, id);
  }

  @ApiOperation({ summary: 'Update Ticket data' })
  @ApiResponse({ status: 200, type: Ticket })
  @ApiNotFoundResponse({ description: 'Flight or User NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: UpdateTicketDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: ObjectId,
    @Body() ticketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicketData(req.user._id, id, ticketDto);
  }

  @ApiOperation({ summary: 'Return Ticket' })
  @ApiResponse({ status: 200, type: Ticket })
  @ApiNotFoundResponse({ description: 'Flight or Airplane NotFound' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  return(@Request() req, @Param('id') id: ObjectId) {
    return this.ticketsService.returnTicket(req.user._id, id);
  }
}
