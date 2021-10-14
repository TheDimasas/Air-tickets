import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section, SectionSchema } from './entities/section.entity';
import { Seat, SeatSchema } from 'src/seats/entities/seat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
