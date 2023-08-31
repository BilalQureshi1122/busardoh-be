import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDetailDto } from './create-company-detail.dto';

export class UpdateCompanyDetailDto extends PartialType(CreateCompanyDetailDto) {
    
    id:number;
    companyName:string;
    companyAddress:string;
    email:string;
    phoneNumber1:string;
    phoneNumber2:string;
    poBoxNumber:string;
    trnNumber: string;
    currency:any;
    managerName:any;
    noteForInvoices:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
