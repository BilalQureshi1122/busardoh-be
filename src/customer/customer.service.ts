import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  FindAllCustomerDto,
  PaginationDto,
} from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const custom = new Customer();
    custom.name = createCustomerDto.name;
    custom.email = createCustomerDto.email;
    custom.phoneNumber = createCustomerDto.phoneNumber;
    custom.address = createCustomerDto.address;
    custom.dmlStatus = 1;
    custom.insertionTimeStamp = Date();
    return this.customerRepo.save(custom);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  update(updateCustomerDto: UpdateCustomerDto) {
    const custom = new Customer();
    custom.name = updateCustomerDto.name;
    custom.email = updateCustomerDto.email;
    custom.phoneNumber = updateCustomerDto.phoneNumber;
    custom.address = updateCustomerDto.address;
    (custom.id = updateCustomerDto.id), (custom.dmlStatus = 2);
    custom.lastUpdateTimeStamp = Date();
    return this.customerRepo.save(custom);
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return customer;
  }

  async delSoft(updateCustomerDto: UpdateCustomerDto) {
    let custom = new Customer();
    custom = await this.findOne(updateCustomerDto.id);
    custom.dmlStatus = 3;
    custom.closeTimeStamp = Date();
    return this.customerRepo.save(custom);
  }

  async findAllCustomer(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.name) {
      sql += ` customer.name ilike '%${searchParams?.name}%' and `;
    }

    sql += ` customer.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.customerRepo
      .createQueryBuilder('customer')
      .where(sql)
      .getCount();

    sql += ` group by customer.id order by customer.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.customerRepo
      .createQueryBuilder('customer')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
