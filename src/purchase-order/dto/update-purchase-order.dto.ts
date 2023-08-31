import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDto } from './create-purchase-order.dto';

export class UpdatePurchaseOrderDto extends PartialType(CreatePurchaseOrderDto) {

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
    supplierId:any;
    projectId:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
