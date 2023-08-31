import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = new Department();
    department.name = createDepartmentDto.name;
    department.description = createDepartmentDto.description;
    department.phoneNumber = createDepartmentDto.phoneNumber;
    department.address = createDepartmentDto.address;
    department.dmlStatus = 1;
    department.insertionTimeStamp = Date();
    return this.departmentRepo.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepo.find();
  }

  update(updateDepartmentDto: UpdateDepartmentDto) {
    const department = new Department();
    department.name = updateDepartmentDto.name;
    department.description = updateDepartmentDto.description;
    department.phoneNumber = updateDepartmentDto.phoneNumber;
    department.address = updateDepartmentDto.address;
    (department.id = updateDepartmentDto.id), (department.dmlStatus = 2);
    department.lastUpdateTimeStamp = Date();
    return this.departmentRepo.save(department);
  }

  async findOne(id: number) {
    const department = await this.departmentRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return department;
  }

  async delSoft(updateDepartmentDto: UpdateDepartmentDto) {
    let department = new Department();
    department = await this.findOne(updateDepartmentDto.id);
    department.dmlStatus = 3;
    department.closeTimeStamp = Date();
    return this.departmentRepo.save(department);
  }

  async findAlldepartment(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.name) {
      sql += ` department.name ilike '%${searchParams?.name}%' and `;
    }
    if (searchParams?.phoneNumber) {
      sql += ` department.phoneNumber ilike '%${searchParams?.phoneNumber}%' and `;
    }
    if (searchParams?.address) {
      sql += ` department.address ilike '%${searchParams?.address}%' and `;
    }

    sql += ` department.dmlStatus != 3  `;

    console.log('query', sql);
    const count = await this.departmentRepo
      .createQueryBuilder('department')
      .where(sql)
      .getCount();

    sql += ` group by department.id order by department.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.departmentRepo
      .createQueryBuilder('department')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
