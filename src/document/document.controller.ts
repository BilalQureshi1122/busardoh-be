import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import * as path from 'path';
import { Response, response } from 'express';
interface FileParam {
  filename: string;
}

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

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
  async handleUpload(
    @Body() uploadDocDto: any,
    @Res() res,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = req.protocol + '://' + req.get('host');
    console.log('imagegegee', file);
    // const response = await this.documentService.create(
    //   uploadDocDto,
    //   url + '/' + file.filename,
    // );
    return;
  }

  // @Get('getFile')
  // getFile(@Res() res: Response, @Body() file: FileParam, @Req() req) {
  //   const url = req.protocol + '://' + req.get('host');

  //   res.sendFile(path.join(__dirname, '../../uploadedImages/' + file.filename));
  // }

  @Post('addDocument')
  create(@Body() createDocumentDto: any) {
    return this.documentService.create(createDocumentDto);
  }

  @Post('updateDocument')
  update(@Body() updateDocumentDto: any) {
    return this.documentService.update(updateDocumentDto);
  }

  // @Post('/getAllDocument')
  // findAll() {
  //   return this.documentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.documentService.findOne(+id);
  // }

  // @Delete('/deleteCustomer/'+':id')
  // remove(@Param('id') id: string) {
  //   return this.documentService.remove(+id);
  // }

  // @Post('/deleteDocument')
  // removeSoft(@Body() updateDocumentDto: UpdateDocumentDto) {
  //   return this.documentService.delSoft(updateDocumentDto);
  // }

  // @Post('getAllDocumentPagination')
  // async findAllDocument(@Body() findAllCustomerDto) {
  //   try {
  //     return this.documentService.findAllDocument(
  //       findAllCustomerDto,
  //       findAllCustomerDto.pagination,
  //     );
  //   } catch (e) {
  //     throw e;
  //   }

  //   //  return this.documentService.findAllCustomer(findAllCustomerDto,findAllCustomerDto.pagination)
  // }
}
