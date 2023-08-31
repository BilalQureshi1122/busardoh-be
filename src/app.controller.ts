import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';

interface FileParam {
  filename: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedImages',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async handleUpload(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const url = req.protocol + '://' + req.get('host');
    console.log('imagegegee', file);

    return url + '/' + file.filename;
  }

  @Get('getFile')
  getFile(@Res() res: Response, @Body() file: FileParam, @Req() req) {
    const url = req.protocol + '://' + req.get('host');

    res.sendFile(path.join(__dirname, '../../uploadedImages/' + file.filename));
  }
}
