import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SaleInvoiceService } from './sale-invoice.service';
import { CreateSaleInvoiceDto } from './dto/create-sale-invoice.dto';
import { UpdateSaleInvoiceDto } from './dto/update-sale-invoice.dto';

@Controller('saleInvoice')
export class SaleInvoiceController {
  constructor(private readonly saleInvoiceService: SaleInvoiceService) {}

  @Post('addSaleInvoice')
  create(@Body() createSaleInvoiceDto: CreateSaleInvoiceDto) {
    return this.saleInvoiceService.create(createSaleInvoiceDto);
  }

  @Post('updateSaleInvoice')
  update(@Body() updateSaleInvoiceDto: UpdateSaleInvoiceDto) {
    return this.saleInvoiceService.update(updateSaleInvoiceDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleInvoiceService.findOne(+id);
  }
   
  @Post('/deleteSaleInvoice')
  removeSoft(@Body() updateSaleInvoiceDto: UpdateSaleInvoiceDto) {
    return this.saleInvoiceService.delSoft(updateSaleInvoiceDto);
  }

  @Post('getAllSaleInvoiceWithPagination')
  async findAllCustomer(@Body() findAllSaleInvoiceDto) {
    
    try{
      return this.saleInvoiceService.findAllSaleInvoice(findAllSaleInvoiceDto,findAllSaleInvoiceDto.pagination)
    }
    catch(e){
      throw e
    }
  }

  @Post('/generateSaleInvoice')
  genInvoice(@Body() invoicePayload) {
    return this.saleInvoiceService.generateInvoice(invoicePayload);
  }

}




