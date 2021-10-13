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
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({ summary: 'Reserve a Ticket' })
  @ApiCreatedResponse({ description: 'Created', type: Ticket })
  @ApiBody({ type: CreateTicketDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  create(@Body() ticketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(ticketDto);
  }

  @ApiOperation({ summary: 'Get data all Tickets' })
  @ApiOkResponse({ description: 'Success', type: [Ticket] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @Roles('admin')
  @Get()
  findAll() {
    return this.ticketsService.getAllTickets();
  }

  @ApiOperation({ summary: 'Get Ticket data' })
  @ApiOkResponse({ description: 'Success', type: Ticket })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Request() req: any, @Param('id') id: ObjectId) {
    return this.ticketsService.getTicketById(req.user._id, id);
  }

  @ApiOperation({ summary: 'Update Ticket data' })
  @ApiOkResponse({ description: 'Success', type: Ticket })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({ type: UpdateTicketDto })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: ObjectId,
    @Body() ticketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicketData(req.user._id, id, ticketDto);
  }

  @ApiOperation({ summary: 'Return Ticket' })
  @ApiOkResponse({ description: 'Success', type: Ticket })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiTooManyRequestsResponse({ description: 'Too Many Requests' })
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  return(@Request() req: any, @Param('id') id: ObjectId) {
    return this.ticketsService.returnTicket(req.user._id, id);
  }
}
