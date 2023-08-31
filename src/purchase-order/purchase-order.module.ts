import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Module({
   
  imports: [
    TypeOrmModule.forFeature([(PurchaseOrder)])
  ],
   
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService]
})
export class PurchaseOrderModule {}
