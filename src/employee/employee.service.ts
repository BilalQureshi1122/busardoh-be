import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
    // filePath,
  ): Promise<Employee> {
    const employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.email = createEmployeeDto.email;
    employee.salary = createEmployeeDto.salary;
    employee.phoneNumber = createEmployeeDto.phoneNumber;
    employee.address = createEmployeeDto.address;
    employee.gender = createEmployeeDto.gender;
    employee.age = createEmployeeDto.age;
    employee.image = createEmployeeDto.image;
    employee.department = createEmployeeDto.departmentId;
    employee.designation = createEmployeeDto.designationId;
    employee.dmlStatus = 1;
    employee.insertionTimeStamp = Date();
    let returnEmp = await this.employeeRepo.save(employee);
    return returnEmp;
  }

  // findAll():Promise<Employee[]> {
  //   return this.employeeRepo.find();
  // }

  async findOne(id: number) {
    const department = await this.employeeRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return department;
  }

  update(updateemployeeDto: UpdateEmployeeDto) {
    const employee = new Employee();
    employee.name = updateemployeeDto.name;
    employee.email = updateemployeeDto.email;
    employee.salary = updateemployeeDto.salary;
    employee.phoneNumber = updateemployeeDto.phoneNumber;
    employee.address = updateemployeeDto.address;
    employee.gender = updateemployeeDto.gender;
    employee.age = updateemployeeDto.age;
    employee.image = updateemployeeDto.image;
    employee.department = updateemployeeDto.departmentId;
    employee.designation = updateemployeeDto.designationId;
    employee.id = updateemployeeDto.id;
    employee.dmlStatus = 2;
    employee.lastUpdateTimeStamp = Date();
    return this.employeeRepo.save(employee);
  }

  async delSoft(updateemployeeDto: UpdateEmployeeDto) {
    let employee = new Employee();
    employee = await this.findOne(updateemployeeDto.id);
    employee.dmlStatus = 3;
    employee.closeTimeStamp = Date();
    return this.employeeRepo.save(employee);
  }

  async findAllEmp(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(searchParams);
    let sql = '';
    if (searchParams?.name) {
      sql += ` employee.name ilike '%${searchParams?.name}%' and `;
    }
    if (searchParams?.salary) {
      sql += ` employee.salary ilike '%${searchParams?.salary}%' and `;
    }
    if (searchParams?.gender) {
      sql += ` employee.gender ilike '%${searchParams?.gender}%' and `;
    }
    if (searchParams?.age) {
      sql += ` employee.age ilike '%${searchParams?.age}%' and `;
    }
    if (searchParams?.departmentId) {
      sql += ` employee.department = ${searchParams?.departmentId} and `;
    }
    if (searchParams?.designationId) {
      sql += ` employee.designation = ${searchParams?.designationId} and `;
    }

    sql += ` employee.dmlStatus != 3   `;

    console.log('query', sql);
    const count = await this.employeeRepo
      .createQueryBuilder('employee')
      .where(sql)
      .getCount();

    sql += ` and department.dmlStatus != 3 and designation.dmlStatus != 3 order by employee.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.designation', 'designation')
      .leftJoinAndSelect('employee.department', 'department')
      .where(sql)
      .getMany();
    return [query, count];
  }

  async findAll() {
    const findByStudent = await this.employeeRepo.find({
      relations: ['department', 'designation'],
    });
    return findByStudent;
  }
}
