import { PartialType } from '@nestjs/mapped-types';
import { CreateDesignationDto } from './create-designation.dto';

export class UpdateDesignationDto extends PartialType(CreateDesignationDto) {

    id: any;
    name: string;
    description: string;
    dmlStatus: number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
