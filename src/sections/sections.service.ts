import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Section, SectionDocument } from './entities/section.entity';
import { Seat, SeatDocument } from 'src/seats/entities/seat.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    @InjectModel(Seat.name) private seatModel: Model<SeatDocument>,
  ) {}

  public async createSection(sectionDto: CreateSectionDto): Promise<Section> {
    try {
      let section = await this.sectionModel.create({
        price: sectionDto.price,
        class: sectionDto.class,
        seats: [],
      });
      for (let i = 1; i <= sectionDto.seats; i++) {
        const seat = await this.seatModel.create({
          section: section._id,
          number: i,
        });
        section.seats.push(seat._id);
      }
      await section.save();

      section = await this.sectionModel
        .findOne(section._id)
        .select({ __v: false })
        .populate({ path: 'seats', select: '-__v' })
        .exec();
      return section;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllSections(): Promise<Section[]> {
    const sections = await this.sectionModel
      .find()
      .populate({ path: 'seats', select: '-__v' })
      .select({ __v: false })
      .exec();
    return sections;
  }

  public async getSectionById(sectionId: ObjectId): Promise<Section> {
    const section = await this.sectionModel
      .findById(sectionId)
      .populate({ path: 'seats', select: '-__v' })
      .select({ __v: false })
      .exec();
    if (!section) {
      throw new HttpException(
        'Section with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return section;
  }

  public async updateSectionData(
    sectionId: ObjectId,
    sectionDto: UpdateSectionDto,
  ): Promise<Section> {
    let section = await this.sectionModel.findById(sectionId).exec();
    if (!section) {
      throw new HttpException(
        'Section with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (sectionDto.class) {
      section.class = sectionDto.class;
    }
    if (sectionDto.price) {
      section.price = sectionDto.price;
    }

    await section.save();
    section = await this.sectionModel
      .findById(sectionId)
      .select({ __v: false })
      .exec();
    return section;
  }

  public async deleteSection(sectionId: ObjectId): Promise<Section> {
    const section = await this.sectionModel
      .findByIdAndDelete(sectionId)
      .select({ __v: false })
      .exec();
    if (!section) {
      throw new HttpException(
        'Section with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return section;
  }
}
