import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import * as uuid from 'uuid';

export enum Folder {
  Airline = 'airline',
}

@Injectable()
export class FilesService {
  async createFile(folder: Folder, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', folder);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return folder + '/' + fileName;
    } catch (e) {
      throw new HttpException(
        'An error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //does not work
  // async deleteFile(folder: Folder, file): Promise<string> {
  //   try {
  //     const fileExtension = file.originalname.split('.').pop();
  //     const fileName = uuid.v4() + '.' + fileExtension;
  //     const filePath = path.resolve(__dirname, '..', 'static', folder);
  //     if (!fs.existsSync(filePath)) {
  //       fs.mkdirSync(filePath, { recursive: true });
  //     }
  //     fs.writeFileSync(path.join(filePath, fileName), file.buffer);
  //     return folder + '/' + fileName;
  //   } catch (e) {
  //     throw new HttpException(
  //       'An error occurred while writing the file',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
