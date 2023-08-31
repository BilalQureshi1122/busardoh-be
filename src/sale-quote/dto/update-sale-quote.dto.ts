import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleQuoteDto } from './create-sale-quote.dto';

export class UpdateSaleQuoteDto extends PartialType(CreateSaleQuoteDto) {
   
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
