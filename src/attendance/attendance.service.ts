import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {

    const attendance=new Attendance();
    attendance.employee=createAttendanceDto.employeeId;
    attendance.attendanceDate=createAttendanceDto.attendanceDate;
    attendance.workLocation=createAttendanceDto.workLocation;
    attendance.project=createAttendanceDto.projectId;
    attendance.checkIn=createAttendanceDto.checkIn;
    attendance.checkOut=createAttendanceDto.checkOut;
    attendance.late=createAttendanceDto.late;
    attendance.halfDay=createAttendanceDto.halfDay;
    attendance.dmlStatus=1;
    attendance.insertionTimeStamp=Date()
    return  this.attendanceRepo.save(attendance);
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepo.findOne({
      where:{
        id:id,
        dmlStatus:Not(3)
      },
    })
    return attendance;
  }

  update(updateAttendanceDto: UpdateAttendanceDto) {
    const attendance=new Attendance();
    attendance.id = updateAttendanceDto.id;
    attendance.employee=updateAttendanceDto.employeeId;
    attendance.attendanceDate=updateAttendanceDto.attendanceDate;
    attendance.workLocation=updateAttendanceDto.workLocation;
    attendance.workLocation=updateAttendanceDto.workLocation;
    attendance.project=updateAttendanceDto.projectId;
    attendance.checkIn=updateAttendanceDto.checkIn;
    attendance.checkOut=updateAttendanceDto.checkOut;
    attendance.late=updateAttendanceDto.late;
    attendance.halfDay=updateAttendanceDto.halfDay;

    attendance.dmlStatus = 2;
    attendance.lastUpdateTimeStamp = Date();
    return this.attendanceRepo.save(attendance);
  }


  async delSoft(updateAttendanceDto: UpdateAttendanceDto) {
    let attendance = new Attendance();

    attendance= await this.findOne(updateAttendanceDto.id)
    attendance.dmlStatus = 3;
    attendance.closeTimeStamp = Date();
    return this.attendanceRepo.save(attendance);
  }

  async findAllAttendance(params, pagination: PaginationDto) {
    console.log(params);
    let searchParam 

    if(params?.payload){
       searchParam = params?.payload
    }else{
       searchParam = params
    }
    let sql = '';
    if (searchParam?.id) {
      sql += ` attendance.employee = ${searchParam?.id} and `;
    }
    if (searchParam?.employeeId) {
      sql += ` attendance.employee = ${searchParam?.employeeId} and `;
    }
    if (searchParam?.attendanceDate) {
      sql += ` attendance.attendanceDate = '${searchParam?.attendanceDate}' and `;
    }
    if (searchParam?.projectId) {
      sql += ` attendance.project = ${searchParam?.projectId} and `;
    }
    if (searchParam?.workLocation) {
      sql += ` attendance.workLocation ilike '%${searchParam?.workLocation}%' and `;
    }

    sql += ` attendance.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.attendanceRepo
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee')
      .leftJoinAndSelect('attendance.project', 'project')
      .where(sql)
      .getCount();
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.attendanceRepo
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee')
      .leftJoinAndSelect('attendance.project', 'project')
      .where(sql)
      .getMany();
    return [query, count];
  }

}
