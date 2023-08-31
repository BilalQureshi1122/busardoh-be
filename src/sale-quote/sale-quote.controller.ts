import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SaleQuoteService } from './sale-quote.service';
import { CreateSaleQuoteDto } from './dto/create-sale-quote.dto';
import { UpdateSaleQuoteDto } from './dto/update-sale-quote.dto';

@Controller('saleQuote')
export class SaleQuoteController {
  constructor(private readonly saleQuoteService: SaleQuoteService) {}

  @Post('addSaleQuote')
  create(@Body() createSaleQuoteDto: CreateSaleQuoteDto) {
    return this.saleQuoteService.create(createSaleQuoteDto);
  }

  @Post('updateSaleQuote')
  update(@Body() updateSaleQuoteDto: UpdateSaleQuoteDto) {
    return this.saleQuoteService.update(updateSaleQuoteDto);
  }

  @Post('/getAllSaleQuote')
  findAll() {
    return this.saleQuoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleQuoteService.findOne(+id);
  }
   
  @Post('/deleteSaleQuote')
  removeSoft(@Body() updateSaleQuoteDto: UpdateSaleQuoteDto) {
    return this.saleQuoteService.delSoft(updateSaleQuoteDto);
  }

  @Post('getAllSaleQuoteWithPagination')
  async findAllCustomer(@Body() findAllSaleQuoteDto) {
    
    try{
      return this.saleQuoteService.findAllSaleQuote(findAllSaleQuoteDto,findAllSaleQuoteDto.pagination)
    }
    catch(e){
      throw e
    }
  }

  @Post('/generateSaleQuote')
  genInvoice(@Body() invoicePayload) {
    return this.saleQuoteService.generateInvoice(invoicePayload);
  }

}




