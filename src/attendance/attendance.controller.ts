import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';


@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('addAttendance')
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Post('updateAttendance')
  update(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(updateAttendanceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }
   
  @Post('deleteAttendance')
  removeSoft(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.delSoft(updateAttendanceDto);
  }

  @Post('getAllAttendanceWithPagination')
  async findAllCustomer(@Body() findAllSaleInvoiceDto) {
    
    try{
      console.log(findAllSaleInvoiceDto)
      return this.attendanceService.findAllAttendance(findAllSaleInvoiceDto,findAllSaleInvoiceDto.pagination)
     
    }
    catch(e){
      throw e
    }

  }

}






