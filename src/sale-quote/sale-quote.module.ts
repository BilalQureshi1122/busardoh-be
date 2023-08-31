import { Module } from '@nestjs/common';
import { SaleQuoteService } from './sale-quote.service';
import { SaleQuoteController } from './sale-quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleQuote } from './entities/sale-quote.entity';

@Module({
   
  imports: [
    TypeOrmModule.forFeature([(SaleQuote)])
  ],

  controllers: [SaleQuoteController],
  providers: [SaleQuoteService]
})
export class SaleQuoteModule {}
