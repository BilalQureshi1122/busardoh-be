import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { CreateSaleOrderDto } from './dto/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';


@Controller('saleOrder')
export class SaleOrderController {
  constructor(private readonly saleOrderService: SaleOrderService) {}

  @Post('addSaleOrder')
  create(@Body() createSaleIOrderDto: CreateSaleOrderDto) {
    return this.saleOrderService.create(createSaleIOrderDto);
  }

  @Post('updateSaleOrder')
  update(@Body() updateSaleOrderDto: UpdateSaleOrderDto) {
    return this.saleOrderService.update(updateSaleOrderDto);
  }

  @Post('/getAllSaleOrder')
  findAll() {
    return this.saleOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOrderService.findOne(+id);
  }
   
  @Post('/deleteSaleOrder')
  removeSoft(@Body() updateSaleOrderDto: UpdateSaleOrderDto) {
    return this.saleOrderService.delSoft(updateSaleOrderDto);
  }

  @Post('getAllSaleOrderWithPagination')
  async findAllCustomer(@Body() findAllSaleOrderDto) {
    
    try{
      return this.saleOrderService.findAllSaleOrder(findAllSaleOrderDto,findAllSaleOrderDto.pagination) 
    }
    catch(e){
      throw e
    }
  }

  @Post('/generateSaleOrder')
  genInvoice(@Body() invoicePayload) {
    return this.saleOrderService.generateInvoice(invoicePayload);
  }

}




