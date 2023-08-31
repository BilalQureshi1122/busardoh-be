import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'rxjs/operators';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = new Supplier();
    supplier.name = createSupplierDto.name;
    supplier.description = createSupplierDto.description;
    supplier.code = createSupplierDto.code;
    supplier.creditLimit = createSupplierDto.creditLimit;
    supplier.address = createSupplierDto.address;
    supplier.email = createSupplierDto.email;
    supplier.mobileNumber = createSupplierDto.mobileNumber;
    supplier.startingBalance = createSupplierDto.startingBalance;
    supplier.dmlStatus = 1;
    supplier.insertionTimeStamp = Date();
    return this.supplierRepo.save(supplier);
  }

  findAll(): Promise<Supplier[]> {
    return this.supplierRepo.find();
  }

  update(updateSupplierDto: UpdateSupplierDto) {
    const supplier = new Supplier();
    supplier.name = updateSupplierDto.name;
    supplier.description = updateSupplierDto.description;
    supplier.code = updateSupplierDto.code;
    supplier.creditLimit = updateSupplierDto.creditLimit;
    supplier.address = updateSupplierDto.address;
    supplier.email = updateSupplierDto.email;
    supplier.mobileNumber = updateSupplierDto.mobileNumber;
    supplier.startingBalance = updateSupplierDto.startingBalance;
    (supplier.id = updateSupplierDto.id), (supplier.dmlStatus = 2);
    supplier.lastUpdateTimeStamp = Date();
    return this.supplierRepo.save(supplier);
  }

  async findOne(id: number) {
    const supplier = await this.supplierRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return supplier;
  }

  async delSoft(updateSupplierDto: UpdateSupplierDto) {
    let supplier = new Supplier();
    supplier = await this.findOne(updateSupplierDto.id);
    supplier.dmlStatus = 3;
    supplier.closeTimeStamp = Date();
    return this.supplierRepo.save(supplier);
  }

  async findAllSupplier(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.name) {
      sql += ` supplier.name ilike '%${searchParams?.name}%' and `;
    }
    if (searchParams?.code) {
      sql += ` supplier.code ilike '%${searchParams?.code}%' and `;
    }
    if (searchParams?.creditLimit) {
      sql += ` supplier.creditLimit ilike '%${searchParams?.creditLimit}%' and `;
    }

    sql += ` supplier.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.supplierRepo
      .createQueryBuilder('supplier')
      .where(sql)
      .getCount();

    sql += ` group by supplier.id order by supplier.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.supplierRepo
      .createQueryBuilder('supplier')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
