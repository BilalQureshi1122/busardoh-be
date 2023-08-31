import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';

@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post('/addDesignation')
  create(@Body() createDesignationDto: CreateDesignationDto) {
    return this.designationService.create(createDesignationDto);
  }

  @Post('updateDesignation')
  update(@Body() updateDesignationDto: UpdateDesignationDto) {
    return this.designationService.update(updateDesignationDto);
  }

  @Post('/getAllDesignation')
  findAll() {
    return this.designationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designationService.findOne(+id);
  }

  @Post('/deleteDesignation')
  removeSoft(@Body() updateDesignationDto: UpdateDesignationDto) {
    return this.designationService.delSoft(updateDesignationDto);
  }

  @Post('getAllDesignationPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    try {
      return this.designationService.findAllDesignation(
        findAllCustomerDto,
        findAllCustomerDto.pagination,
      );
    } catch (e) {
      throw e;
    }
  }
}
