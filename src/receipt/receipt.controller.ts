import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';


@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('addReceipt')
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptService.create(createReceiptDto);
  }

  @Post('updateReceipt')
  update(@Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(updateReceiptDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptService.findOne(+id);
  }
   
  @Post('/deleteReceipt')
  removeSoft(@Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.delSoft(updateReceiptDto);
  }

  @Post('getAllReceiptWithPagination')
  async findAllCustomer(@Body() findAllSaleInvoiceDto) {
    
    try{
      return this.receiptService.findAllReceipt(findAllSaleInvoiceDto,findAllSaleInvoiceDto.pagination)
    }
    catch(e){
      throw e
    }
  }

  @Post('/generateReceipt')
  genInvoice(@Body() invoicePayload) {
    return this.receiptService.generateInvoice(invoicePayload);
  }

}




