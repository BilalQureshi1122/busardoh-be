// import { Injectable } from '@nestjs/common';
// import { CreateSaleInvoiceDto } from './dto/create-sale-invoice.dto';
// import { UpdateSaleInvoiceDto } from './dto/update-sale-invoice.dto';

// @Injectable()
// export class SaleInvoiceService {
//   create(createSaleInvoiceDto: CreateSaleInvoiceDto) {
//     return 'This action adds a new saleInvoice';
//   }

//   findAll() {
//     return `This action returns all saleInvoice`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} saleInvoice`;
//   }

//   update(id: number, updateSaleInvoiceDto: UpdateSaleInvoiceDto) {
//     return `This action updates a #${id} saleInvoice`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} saleInvoice`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { SaleInvoice } from './entities/sale-invoice.entity';
import { CreateSaleInvoiceDto } from './dto/create-sale-invoice.dto';
import { UpdateSaleInvoiceDto } from './dto/update-sale-invoice.dto';

@Injectable()
export class SaleInvoiceService {
  constructor(
    @InjectRepository(SaleInvoice)
    private readonly saleInvoiceRepo: Repository<SaleInvoice>,
  ) {}

  async create(
    createSaleInvoiceDto: CreateSaleInvoiceDto,
  ): Promise<SaleInvoice> {
    console.log('fe payload', createSaleInvoiceDto);
    console.log('fe itemRows', createSaleInvoiceDto?.['itemRows']);

    let getItemRows = createSaleInvoiceDto?.['itemRows'];

    return getItemRows.forEach(async (payload, index) => {
      const saleInvoice = new SaleInvoice();

      saleInvoice.issueDate = createSaleInvoiceDto.issueDate;
      saleInvoice.invoiceDescription = createSaleInvoiceDto.invoiceDescription;
      saleInvoice.billingAddress = createSaleInvoiceDto.billingAddress;
      saleInvoice.vat = createSaleInvoiceDto.vat;
      saleInvoice.discount = createSaleInvoiceDto.discount;
      saleInvoice.customer = createSaleInvoiceDto.customerId;

      saleInvoice.item = payload['item'];

      console.log('inner payload', payload['item']);
      saleInvoice.itemDescription = payload['itemDescription'];
      saleInvoice.quantity = payload['quantity'];
      saleInvoice.unitPrice = payload['unitPrice'];
      saleInvoice.total = payload['total'];

      saleInvoice.dmlStatus = 1;
      saleInvoice.insertionTimeStamp = Date();
      await this.saleInvoiceRepo.save(saleInvoice);
    });

    // saleInvoice.issueDate=createSaleInvoiceDto.issueDate;
    // saleInvoice.invoiceDescription=createSaleInvoiceDto.invoiceDescription;
    // saleInvoice.billingAddress=createSaleInvoiceDto.billingAddress;
    // saleInvoice.vat=createSaleInvoiceDto.vat;
    // saleInvoice.discount=createSaleInvoiceDto.discount;
    // saleInvoice.customer= createSaleInvoiceDto.customerId;

    // saleInvoice.item=createSaleInvoiceDto.item;
    // saleInvoice.itemDescription=createSaleInvoiceDto.itemDescription;;
    // saleInvoice.quantity= createSaleInvoiceDto.quantity;
    // saleInvoice.unitPrice = createSaleInvoiceDto.unitPrice;
    // saleInvoice.total = createSaleInvoiceDto.total;

    // saleInvoice.dmlStatus = 1;
    // saleInvoice.timeStamp = Date();
    //  return this.saleInvoiceRepo.save(saleInvoice);
  }

  update(updateSaleInvoiceDto: UpdateSaleInvoiceDto) {
    const saleInvoice = new SaleInvoice();

    saleInvoice.issueDate = updateSaleInvoiceDto.issueDate;
    saleInvoice.invoiceDescription = updateSaleInvoiceDto.invoiceDescription;
    saleInvoice.billingAddress = updateSaleInvoiceDto.billingAddress;
    saleInvoice.vat = updateSaleInvoiceDto.vat;
    saleInvoice.discount = updateSaleInvoiceDto.discount;
    saleInvoice.customer = updateSaleInvoiceDto.customerId;

    saleInvoice.item = updateSaleInvoiceDto.item;
    saleInvoice.itemDescription = updateSaleInvoiceDto.itemDescription;
    saleInvoice.quantity = updateSaleInvoiceDto.quantity;
    saleInvoice.unitPrice = updateSaleInvoiceDto.unitPrice;
    saleInvoice.total = updateSaleInvoiceDto.total;

    saleInvoice.dmlStatus = 2;
    saleInvoice.lastUpdateTimeStamp = Date();
    return this.saleInvoiceRepo.save(saleInvoice);
  }

  async findOne(id: number) {
    const saleInvoice = await this.saleInvoiceRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return saleInvoice;
  }

  async delSoft(updatesaleInvoiceDto: UpdateSaleInvoiceDto) {
    let saleInvoice = new SaleInvoice();
    saleInvoice = await this.findOne(updatesaleInvoiceDto.id);
    saleInvoice.dmlStatus = 3;
    saleInvoice.closeTimeStamp = Date();
    return this.saleInvoiceRepo.save(saleInvoice);
  }

  // delSoft(updateSaleInvoiceDto: UpdateSaleInvoiceDto) {
  //   const saleInvoice = new SaleInvoice();

  //   saleInvoice.issueDate = updateSaleInvoiceDto.issueDate;
  //   saleInvoice.invoiceDescription = updateSaleInvoiceDto.invoiceDescription;
  //   saleInvoice.billingAddress = updateSaleInvoiceDto.billingAddress;
  //   saleInvoice.vat = updateSaleInvoiceDto.vat;
  //   saleInvoice.discount = updateSaleInvoiceDto.discount;
  //   saleInvoice.customer = updateSaleInvoiceDto.customerId;

  //   saleInvoice.item = updateSaleInvoiceDto.item;
  //   saleInvoice.itemDescription = updateSaleInvoiceDto.itemDescription;
  //   saleInvoice.quantity = updateSaleInvoiceDto.quantity;
  //   saleInvoice.unitPrice = updateSaleInvoiceDto.unitPrice;
  //   saleInvoice.total = updateSaleInvoiceDto.total;

  //   saleInvoice.dmlStatus = 3;
  //   saleInvoice.closeTimeStamp = Date();
  //   return this.saleInvoiceRepo.save(saleInvoice);
  // }

  async findAllSaleInvoice(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.issueDate) {
      sql += ` saleInvoice.issueDate like '%${searchParams?.issueDate}%' and `;
    }
    if (searchParams?.customerId) {
      sql += ` saleInvoice.customer = ${searchParams?.customerId} and `;
    }

    sql += ` saleInvoice.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.saleInvoiceRepo
      .createQueryBuilder('saleInvoice')
      .leftJoinAndSelect('saleInvoice.customer', 'customer')
      .where(sql)
      .getCount();

    sql += ` order by saleInvoice.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.saleInvoiceRepo
      .createQueryBuilder('saleInvoice')
      .leftJoinAndSelect('saleInvoice.customer', 'customer')
      .where(sql)
      .getMany();
    return [query, count];
  }

  // async findAll() {
  //   const findByStudent = await this.saleInvoiceRepo.find({
  //     relations: ['customer'],
  //   });
  //   return findByStudent;
  // }

  async generateInvoice(invoicePayload) {
    console.log('invoicePayload', invoicePayload);

    const query = await this.saleInvoiceRepo
      .createQueryBuilder('saleInvoice')
      .leftJoinAndSelect('saleInvoice.customer', 'customer')
      .where(
        'saleInvoice.issueDate =:issueDate AND saleInvoice.customerId =:customerId',
        {
          issueDate: invoicePayload.issueDate,
          customerId: invoicePayload.customerId,
        },
      )
      .getManyAndCount();
    return query;
  }
}
