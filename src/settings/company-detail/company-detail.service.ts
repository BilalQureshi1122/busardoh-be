import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'rxjs/operators';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';

import { CompanyDetail } from './entities/company-detail.entity';

import { UpdateCompanyDetailDto } from './dto/update-company-detail.dto';
import { CreateCompanyDetailDto } from './dto/create-company-detail.dto';

@Injectable()
export class CompanyDetailService {
  constructor(
    @InjectRepository(CompanyDetail)
    private readonly companyDetailRepo: Repository<CompanyDetail>,
  ) {}

  create(
    createCompanyDetailDto: CreateCompanyDetailDto,
  ): Promise<CompanyDetail> {
    const companyDetail = new CompanyDetail();
    companyDetail.companyName = createCompanyDetailDto.companyName;
    companyDetail.companyAddress = createCompanyDetailDto.companyAddress;
    companyDetail.email = createCompanyDetailDto.email;
    companyDetail.poBoxNumber = createCompanyDetailDto.poBoxNumber;
    companyDetail.phoneNumber1 = createCompanyDetailDto.phoneNumber1;
    companyDetail.phoneNumber2 = createCompanyDetailDto.phoneNumber2;

    companyDetail.currency = createCompanyDetailDto.currency;
    companyDetail.managerName = createCompanyDetailDto.managerName;
    companyDetail.trnNumber = createCompanyDetailDto.trnNumber;

    companyDetail.noteForInvoices = createCompanyDetailDto.noteForInvoices;

    companyDetail.dmlStatus = 1;
    companyDetail.insertionTimeStamp = Date();
    return this.companyDetailRepo.save(companyDetail);
  }

  findAll(): Promise<CompanyDetail[]> {
    return this.companyDetailRepo.find();
  }

  update(updatecompanyDetailDto: UpdateCompanyDetailDto) {
    const companyDetail = new CompanyDetail();
    companyDetail.companyName = updatecompanyDetailDto.companyName;
    companyDetail.companyAddress = updatecompanyDetailDto.companyAddress;
    companyDetail.email = updatecompanyDetailDto.email;
    companyDetail.poBoxNumber = updatecompanyDetailDto.poBoxNumber;
    companyDetail.phoneNumber1 = updatecompanyDetailDto.phoneNumber1;
    companyDetail.phoneNumber2 = updatecompanyDetailDto.phoneNumber2;

    companyDetail.currency = updatecompanyDetailDto.currency;
    companyDetail.managerName = updatecompanyDetailDto.managerName;
    companyDetail.trnNumber = updatecompanyDetailDto.trnNumber;
    companyDetail.noteForInvoices = updatecompanyDetailDto.noteForInvoices;
    (companyDetail.id = updatecompanyDetailDto.id),
      (companyDetail.dmlStatus = 2);
    companyDetail.lastUpdateTimeStamp = Date();
    return this.companyDetailRepo.save(companyDetail);
  }

  async findOne(id: number) {
    const companyDetail = await this.companyDetailRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return companyDetail;
  }

  async delSoft(updatecompanyDetailDto: UpdateCompanyDetailDto) {
    let companyDetail = new CompanyDetail();
    companyDetail = await this.findOne(updatecompanyDetailDto.id);
    companyDetail.dmlStatus = 3;
    companyDetail.closeTimeStamp = Date();
    return this.companyDetailRepo.save(companyDetail);
  }

  async findAllCompanyDetail(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.companyName) {
      sql += ` companyDetail.companyName ilike '%${searchParams?.companyName}%' and `;
    }
    if (searchParams?.currency) {
      sql += ` companyDetail.currency ilike '%${searchParams?.currency}%' and `;
    }

    sql += ` companyDetail.dmlStatus != 3 order by  companyDetail.id DESC `;

    console.log('query', sql);
    const count = await this.companyDetailRepo
      .createQueryBuilder('companyDetail')
      .where(sql)
      .getQuery();

    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.companyDetailRepo
      .createQueryBuilder('companyDetail')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
