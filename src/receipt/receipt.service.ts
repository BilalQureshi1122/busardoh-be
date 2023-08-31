import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Receipt } from './entities/receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const receipt = new Receipt();
    receipt.date = createReceiptDto.date;
    receipt.reference = createReceiptDto.reference;
    receipt.customer = createReceiptDto.customerId;
    receipt.description = createReceiptDto.description;
    receipt.total = createReceiptDto.total;
    receipt.dmlStatus = 1;
    receipt.insertionTimeStamp = Date();
    return this.receiptRepo.save(receipt);
  }

  update(updateReceiptDto: UpdateReceiptDto) {
    const receipt = new Receipt();
    receipt.id = updateReceiptDto.id;
    receipt.date = updateReceiptDto.date;
    receipt.reference = updateReceiptDto.reference;
    receipt.customer = updateReceiptDto.customerId;
    receipt.description = updateReceiptDto.description;
    receipt.total = updateReceiptDto.total;
    receipt.dmlStatus = 2;
    receipt.lastUpdateTimeStamp = Date();
    return this.receiptRepo.save(receipt);
  }

  async findOne(id: number) {
    const receipt = await this.receiptRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return receipt;
  }

  async delSoft(updateReceiptDto: UpdateReceiptDto) {
    let receipt = new Receipt();
    receipt = await this.findOne(updateReceiptDto.id);
    receipt.dmlStatus = 3;
    receipt.closeTimeStamp = Date();
    return this.receiptRepo.save(receipt);
  }

  async findAllReceipt(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.issueDate) {
      sql += ` receipt.date like '%${searchParams?.date}%' and `;
    }
    if (searchParams?.customerId) {
      sql += ` receipt.customer = ${searchParams?.customerId} and `;
    }

    sql += ` receipt.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.receiptRepo
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.customer', 'customer')
      .where(sql)
      .getCount();

    sql += ` order by receipt.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.receiptRepo
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.customer', 'customer')
      .where(sql)
      .getMany();
    return [query, count];
  }

  async generateInvoice(invoicePayload) {
    console.log('invoicePayload', invoicePayload);

    const query = await this.receiptRepo
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.customer', 'customer')
      .where('receipt.date =:date AND receipt.customerId =:customerId', {
        date: invoicePayload.date,
        customerId: invoicePayload.customerId,
      })
      .getManyAndCount();
    return query;
  }
}
