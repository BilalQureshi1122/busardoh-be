import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
     
    id:number;
    name:string;
    description:string;
    code:string;
    creditLimit:string;
    address:string;
    email:string;
    mobileNumber:string;
    startingBalance:string;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
