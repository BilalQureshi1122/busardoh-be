import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';


@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('/addSupplier')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Post('updateSupplier')
  update(@Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(updateSupplierDto);
  }

  @Post('/getAllSupplier')
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

   
  @Post('/deleteSupplier')
  removeSoft(@Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.delSoft(updateSupplierDto);
    
  }

  @Post('getAllSupplierPagination')
  async findAllSupplier(@Body() findAllCustomerDto) {
    
    try{
      return this.supplierService.findAllSupplier(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }
}
