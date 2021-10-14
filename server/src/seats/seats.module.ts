import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { Seat, SeatSchema } from './entities/seat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
  exports: [SeatsService],
})
export class SeatsModule {}
