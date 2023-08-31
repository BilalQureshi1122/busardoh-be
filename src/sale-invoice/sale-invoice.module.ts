import { Module } from '@nestjs/common';
import { SaleInvoiceService } from './sale-invoice.service';
import { SaleInvoiceController } from './sale-invoice.controller';
import { SaleInvoice } from './entities/sale-invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   
  imports: [
    TypeOrmModule.forFeature([(SaleInvoice)])
  ],

  controllers: [SaleInvoiceController],
  providers: [SaleInvoiceService]
})
export class SaleInvoiceModule {}
