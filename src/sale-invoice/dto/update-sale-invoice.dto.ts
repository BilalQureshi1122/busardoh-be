import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleInvoiceDto } from './create-sale-invoice.dto';

export class UpdateSaleInvoiceDto extends PartialType(CreateSaleInvoiceDto) {
    
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
