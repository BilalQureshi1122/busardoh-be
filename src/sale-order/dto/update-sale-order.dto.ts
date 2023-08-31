import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleOrderDto } from './create-sale-order.dto';

export class UpdateSaleOrderDto extends PartialType(CreateSaleOrderDto) {

    id:number;
    issueDate:string;
    invoiceDescription:string;
    billingAddress:string;
    vat:number;
    discount:number;
    item:string;
    itemDescription:string;
    quantity: number;
    unitPrice:number;
    total:number;
    customerId:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string
     
}
