import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiptDto } from './create-receipt.dto';


export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {
    
    id:number;
    date:string;
    reference:string;
    description:string;
    total:number;
    customerId:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
