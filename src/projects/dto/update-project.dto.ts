import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    
    id:number;
    name:string;
    description:string;
    startDate:string;
    endDate:string;
    income:string;
    directCost:string;
    profit:string;
    status:string;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
