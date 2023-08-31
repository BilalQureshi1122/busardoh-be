import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';


@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('getPayrollPagination')
  getPayrollPagination(@Body() createSinglePayrolDto: any) {
    return this.payrollService.getPayrollPagination(createSinglePayrolDto);
  }

  @Post('getSingleEmployeePayroll')
  getSingleEmployeePayroll(@Body() createSinglePayrolDto: any) {
    return this.payrollService.getSingleEmployeePayroll(createSinglePayrolDto);
  }

  @Post('addPayroll')
  create(@Body() createDto: any) {
    return this.payrollService.create(createDto);
  }

  @Post('updatePayroll')
  update(@Body() updateDto: any) {
    return this.payrollService.update(updateDto);
  }

  // @Post('getAllPayroll')
  // findAll(findAllDto) {
  //   return this.payrollService.findAllPayroll(findAllDto,findAllDto.pagination);
  // }

  @Post('getAllPayroll')
  async findAllCustomer(@Body() findAllCustomerDto) {
    
    try{
      return this.payrollService.findAllPayroll(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }

  @Post('deletePayroll')
  removeSoft(@Body() updateDto: any) {
    return this.payrollService.delSoft(updateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(+id);
  }

}
