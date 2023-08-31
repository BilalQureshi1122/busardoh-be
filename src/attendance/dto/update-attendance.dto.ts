import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
    
    id:number
    employeeId:any;
    attendanceDate:Date;
    workLocation:string;
    projectId:any;
    checkIn:any;
    checkOut:any;
    late:any;
    halfDay:any;
    dmlStatus:number;
    insertionTimeStamp:string;
    lastUpdateTimeStamp:string;
    closeTimeStamp:string

}
