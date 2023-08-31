import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Controller('purchaseOrder')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post('addPurchaseOrder')
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Post('updatePurchaseOrder')
  update(@Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(updatePurchaseOrderDto);
  }

  @Post('/getAllPurchaseOrder')
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(+id);
  }
   
  @Post('/deletePurchaseOrder')
  removeSoft(@Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.delSoft(updatePurchaseOrderDto);
  }

  @Post('getAllPurchaseOrderWithPagination')
  async findAllCustomer(@Body() findAllSaleInvoiceDto) {
    
    try{
      return this.purchaseOrderService.findAllPurchaseOrder(findAllSaleInvoiceDto,findAllSaleInvoiceDto.pagination)
    }
    catch(e){
      throw e
    }
  }

  @Post('generatePurchaseOrderInvoice')
  genInvoice(@Body() invoicePayload) {
    return this.purchaseOrderService.generateInvoice(invoicePayload);
  }

}




