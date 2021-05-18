import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AirplanesService } from './airplanes.service';
import { AirplanesController } from './airplanes.controller';
import { Airplane, AirplaneSchema } from './entities/airplane.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Airplane.name, schema: AirplaneSchema },
    ]),
  ],
  controllers: [AirplanesController],
  providers: [AirplanesService],
  exports: [AirplanesService],
})
export class AirplanesModule {}
