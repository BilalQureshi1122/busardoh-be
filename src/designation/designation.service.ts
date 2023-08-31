import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Designation } from './entities/designation.entity';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Injectable()
export class DesignationService {
  constructor(
    @InjectRepository(Designation)
    private readonly designationRepo: Repository<Designation>,
  ) {}

  create(createDesignationDto: CreateDesignationDto): Promise<Designation> {
    const designation = new Designation();
    designation.name = createDesignationDto.name;
    designation.description = createDesignationDto.description;
    designation.dmlStatus = 1;
    designation.insertionTimeStamp = Date();
    return this.designationRepo.save(designation);
  }

  findAll(): Promise<Designation[]> {
    return this.designationRepo.find();
  }

  update(updateDesignationDto: UpdateDesignationDto) {
    const designation = new Designation();
    designation.name = updateDesignationDto.name;
    designation.description = updateDesignationDto.description;
    (designation.id = updateDesignationDto.id), (designation.dmlStatus = 2);
    designation.lastUpdateTimeStamp = Date();
    return this.designationRepo.save(designation);
  }

  async findOne(id: number) {
    const designation = await this.designationRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return designation;
  }

  async delSoft(updateDesignationDto: UpdateDesignationDto) {
    let designation = new Designation();
    designation = await this.findOne(updateDesignationDto.id);
    designation.dmlStatus = 3;
    designation.closeTimeStamp = Date();
    return this.designationRepo.save(designation);
  }

  async findAllDesignation(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.name) {
      sql += ` designation.name ilike '%${searchParams?.name}%' and `;
    }

    sql += ` designation.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.designationRepo
      .createQueryBuilder('designation')
      .where(sql)
      .getCount();

    sql += ` group by designation.id order by designation.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.designationRepo
      .createQueryBuilder('designation')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
