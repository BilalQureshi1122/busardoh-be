import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, FindAllCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/addCustomer')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('updateCustomer')
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(updateCustomerDto);
  }

  @Post('/getAllCustomer')
  findAll() {
    return this.customerService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }
   
  @Post('/deleteCustomer')
  removeSoft(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.delSoft(updateCustomerDto);
    
  }

  @Post('getAllCustomerPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    
    try{
      return this.customerService.findAllCustomer(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }
}
