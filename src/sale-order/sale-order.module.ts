import { Module } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrder } from './entities/sale-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   
  imports: [
    TypeOrmModule.forFeature([(SaleOrder)])
  ],

  controllers: [SaleOrderController],
  providers: [SaleOrderService]
})
export class SaleOrderModule {}
