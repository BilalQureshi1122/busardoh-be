import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('addDepartment')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Post('updateDepartment')
  update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(updateDepartmentDto);
  }

  @Post('getAllDepartment')
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Post('deleteDepartment')
  removeSoft(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.delSoft(updateDepartmentDto);
    
  }

  @Post('getAllDepartmentPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    
    try{
      return this.departmentService.findAlldepartment(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }
}
