import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('profile', {
  //     storage: diskStorage({
  //       destination: './uploadedImages',
  //       filename: function (req, file, cb) {
  //         cb(
  //           null,
  //           file.originalname +
  //             '-' +
  //             Date.now() +
  //             '.' +
  //             file.mimetype.split('/').reverse()[0],
  //         );
  //       },
  //     }),
  //   }),
  // )

  // @Post('addEmployee')
  //   @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploadedImages',
  //       filename: function (req, file, cb) {
  //         cb(
  //           null,
  //           file.originalname
  //         );
  //       },
  //     }),
  //   }),
  // )
  // create(@Body() createEmployeeDto: CreateEmployeeDto,
  // @Res() res,
  // @Req() req,
  // @UploadedFile() image: Express.Multer.File,) {
  //   const url = req.protocol + '://' + req.get('host');
  //   const filePath = image;
  //       console.log('imagegegee', image, filePath);
  //   return this.employeeService.create(createEmployeeDto,
  //     url + '/uploadedImages/' + filePath,
  //     );
  // }

  @Post('addEmployee')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  // @Post('updateCustomer/'+':id')
  // update(@Param('id') id: string, @Body() updateEmployeeDto: updateEmployeeDto) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }
  @Post('updateEmployee')
  update(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(updateEmployeeDto);
  }

  @Get('getAllEmployee')
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  // @Delete('/deleteCustomer/'+':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }

  @Post('deleteEmployee')
  removeSoft(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.delSoft(updateEmployeeDto);
  }

  @Post('getAllEmployeePagination')
  async findAllEMployee(@Body() findAllCustomerDto) {
    try {
      return this.employeeService.findAllEmp(
        findAllCustomerDto,
        findAllCustomerDto.pagination,
      );
    } catch (e) {
      throw e;
    }

    //  return this.employeeService.findAllCustomer(findAllCustomerDto,findAllCustomerDto.pagination)
  }

  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploadedImages' });
  }
}
