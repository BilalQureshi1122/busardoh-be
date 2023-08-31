import { PartialType } from '@nestjs/mapped-types';
import { CreateUserManagementDto } from './create-user-management.dto';

export class UpdateUserManagementDto extends PartialType(CreateUserManagementDto) {
    
    id:number;
    name:string;
    email:string;
    mobileNumber:string;
    userName:string;
    password:string;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string
}
