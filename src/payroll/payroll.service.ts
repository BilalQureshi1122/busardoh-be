import { Injectable } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { AttendanceService } from 'src/attendance/attendance.service';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Employee } from 'src/employee/entities/employee.entity';
import { Payroll } from './entities/payroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly PayrollRepo: Repository<Payroll>,

    private readonly employeeService: EmployeeService,

    private readonly attendanceService: AttendanceService,
  ) {}

  async getPayrollPagination(createSinglePayrolDto: any) {
    let salaryList = [];
    const employee = await this.employeeService.findAllEmp(
      {},
      new PaginationDto(),
    );
    for (let i = 0; i < (employee[0] as Employee[]).length; i++) {
      const workDays = await this.attendanceService.findAllAttendance(
        employee[0][i],
        new PaginationDto(),
      );
      const salary = Number(employee?.[0]?.[i]?.salary);
      const salaryPerDay = salary / 30;
      const attendanceCount = workDays[1] as Number;
      const currentMonthSalary = Number(attendanceCount) * salaryPerDay;
      const obj = {
        ...employee?.[0]?.[i],
        workDays,
        currentMonthSalary,
      };
      salaryList.push(obj);
    }

    return salaryList;
  }

  async getSingleEmployeePayroll(createSinglePayrolDto: any) {
    const employee = await this.employeeService.findOne(
      createSinglePayrolDto.id,
    );
    if (employee) {
      //if(!isEmpty(employee)) install lodash
      const workDays = await this.attendanceService.findAllAttendance(
        employee.id,
        new PaginationDto(),
      );
      const salary = Number(employee?.salary);
      const salaryPerDay = salary / 30;
      const attendanceCount = workDays[1] as Number;
      const currentMonthSalary = Number(attendanceCount) * salaryPerDay;
      const obj = {
        ...employee,
        workDays,
        currentMonthSalary,
      };
      return obj;
    } else {
      return 'No employee found';
    }
  }

  create(createPayrollDto: any): Promise<Payroll> {
    const payroll = new Payroll();
    payroll.employee = createPayrollDto.employeeId;
    payroll.days = createPayrollDto.days;
    payroll.designation = createPayrollDto.designationId;
    payroll.issueDate = createPayrollDto.issueDate;
    payroll.dmlStatus = 1;
    payroll.insertionTimeStamp = Date();
    payroll.currentMonthSalary = createPayrollDto.currentMonthSalary;
    return this.PayrollRepo.save(payroll);
  }

  async findOne(id: number) {
    const Payroll = await this.PayrollRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return Payroll;
  }

  update(updatePayrollDto: any) {
    const payroll = new Payroll();
    payroll.days = updatePayrollDto.days;
    payroll.designation = updatePayrollDto.designation;
    payroll.issueDate = updatePayrollDto.issueDate;
    payroll.currentMonthSalary = updatePayrollDto.currentMonthSalary;
    payroll.dmlStatus = 2;
    payroll.id = updatePayrollDto.id;
    payroll.lastUpdateTimeStamp = Date();
    return this.PayrollRepo.save(payroll);
  }

  async delSoft(updatePayrollDto: any) {
    let payroll = new Payroll();
    payroll = await this.findOne(updatePayrollDto.id);
    payroll.dmlStatus = 3;
    payroll.closeTimeStamp = Date();
    return this.PayrollRepo.save(payroll);
  }

  async findAllPayroll(params, pagination?) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.employeeId) {
      sql += ` Payroll.employee = ${searchParams?.employeeId} and `;
    }
    if (searchParams?.currentMonthSalary) {
      sql += ` Payroll.currentMonthSalary = ${searchParams?.currentMonthSalary} and `;
    }
    if (searchParams?.designationId) {
      sql += ` Payroll.designation = ${searchParams?.designationId} and `;
    }
    if (searchParams?.days) {
      sql += ` Payroll.days = ${searchParams?.days} and `;
    }
    sql += ` Payroll.dmlStatus != 3 and employeeId.dmlStatus != 3 and designationId.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.PayrollRepo.createQueryBuilder('Payroll')
      .leftJoinAndSelect('Payroll.employee', 'employeeId')
      .leftJoinAndSelect('Payroll.designation', 'designationId')
      .where(sql)
      .getCount();

    sql += ` order by Payroll.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.PayrollRepo.createQueryBuilder('Payroll')
      .leftJoinAndSelect('Payroll.employee', 'employeeId')
      .leftJoinAndSelect('Payroll.designation', 'designationId')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
