import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
     
    id:number;
    name:string;
    email:string;
    description:string;
    phoneNumber:string;
    address:string;
    gender:string;
    image: string;
    salary:any;
    department:string;
    designation:string;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
