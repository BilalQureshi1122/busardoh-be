// import { Injectable } from '@nestjs/common';
// import { CreateDocumentDto } from './dto/create-document.dto';
// import { UpdateDocumentDto } from './dto/update-document.dto';

// @Injectable()
// export class DocumentService {
//   create(createDocumentDto: CreateDocumentDto) {
//     return 'This action adds a new document';
//   }

//   findAll() {
//     return `This action returns all document`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} document`;
//   }

//   update(id: number, updateDocumentDto: UpdateDocumentDto) {
//     return `This action updates a #${id} document`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} document`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly employeeRepo: Repository<Document>,
  ) {}

  async create(createDocumentDto: any, filePath?): Promise<Document> {
    const document = new Document();
    document.employee = createDocumentDto.employeeId;
    document.degree = createDocumentDto.degree;
    document.matricCertificate = createDocumentDto.matricCertificate;
    document.cnicFrontSide = createDocumentDto.cnicFrontSide;
    document.cnicbackSide = createDocumentDto.cnicbackSide;
    document.interCertificate = createDocumentDto.interCertificate;
    document.passport = createDocumentDto.passport;
    document.visa = createDocumentDto.visa;
    document.employeeImage = createDocumentDto.employeeImage;
    document.dmlStatus = 1;
    document.insertionTimeStamp = Date();
    let returnEmp = await this.employeeRepo.save(document);
    return returnEmp;
  }

  // findAll():Promise<Document[]> {
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

  update(updateDocumentDto: any) {
    return this.employeeRepo.save(updateDocumentDto);
  }

  async delSoft(updateDocumentDto: UpdateDocumentDto) {
    let document = new Document();
    document = await this.findOne(updateDocumentDto.id);
    document.dmlStatus = 3;
    document.closeTimeStamp = Date();
    return this.employeeRepo.save(document);
  }

  async findAllDocument(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(searchParams);
    let sql = '';
    if (searchParams?.employeeId) {
      sql += ` document.employee = ${searchParams?.employeeId} and `;
    }
    sql += ` document.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.employeeRepo
      .createQueryBuilder('document')
      .where(sql)
      .getCount();
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.employeeRepo
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.employee', 'employee')
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
