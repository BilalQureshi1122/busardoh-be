import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    
    id:number;
    employeeId:any;
    employeeImage: any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
