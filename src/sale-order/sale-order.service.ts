import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { SaleOrder } from './entities/sale-order.entity';
import { CreateSaleOrderDto } from './dto/create-sale-order.dto';
import { UpdateSaleOrderDto } from './dto/update-sale-order.dto';

@Injectable()
export class SaleOrderService {
  constructor(
    @InjectRepository(SaleOrder)
    private readonly saleOrderRepo: Repository<SaleOrder>,
  ) {}

  async create(createSaleOrderDto: CreateSaleOrderDto): Promise<SaleOrder> {
    console.log('fe payload', createSaleOrderDto);
    console.log('fe itemRows', createSaleOrderDto?.['itemRows']);

    let getItemRows = createSaleOrderDto?.['itemRows'];

    return getItemRows.forEach(async (payload, index) => {
      const saleOrder = new SaleOrder();

      saleOrder.issueDate = createSaleOrderDto.issueDate;
      saleOrder.invoiceDescription = createSaleOrderDto.invoiceDescription;
      saleOrder.billingAddress = createSaleOrderDto.billingAddress;
      saleOrder.vat = createSaleOrderDto.vat;
      saleOrder.discount = createSaleOrderDto.discount;
      saleOrder.customer = createSaleOrderDto.customerId;

      saleOrder.item = payload['item'];

      console.log('inner payload', payload['item']);
      saleOrder.itemDescription = payload['itemDescription'];
      saleOrder.quantity = payload['quantity'];
      saleOrder.unitPrice = payload['unitPrice'];
      saleOrder.total = payload['total'];

      saleOrder.dmlStatus = 1;
      saleOrder.insertionTimeStamp = Date();
      await this.saleOrderRepo.save(saleOrder);
    });
  }

  update(updatesaleOrderDto: UpdateSaleOrderDto) {
    const saleOrder = new SaleOrder();

    saleOrder.issueDate = updatesaleOrderDto.issueDate;
    saleOrder.invoiceDescription = updatesaleOrderDto.invoiceDescription;
    saleOrder.billingAddress = updatesaleOrderDto.billingAddress;
    saleOrder.vat = updatesaleOrderDto.vat;
    saleOrder.discount = updatesaleOrderDto.discount;
    saleOrder.customer = updatesaleOrderDto.customerId;

    saleOrder.item = updatesaleOrderDto.item;
    saleOrder.itemDescription = updatesaleOrderDto.itemDescription;
    saleOrder.quantity = updatesaleOrderDto.quantity;
    saleOrder.unitPrice = updatesaleOrderDto.unitPrice;
    saleOrder.total = updatesaleOrderDto.total;

    saleOrder.dmlStatus = 2;
    saleOrder.lastUpdateTimeStamp = Date();
    return this.saleOrderRepo.save(saleOrder);
  }

  async findOne(id: number) {
    const saleOrder = await this.saleOrderRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return saleOrder;
  }

  async delSoft(updateSaleOrderDto: UpdateSaleOrderDto) {
    let saleIOrder = new SaleOrder();
    saleIOrder = await this.findOne(updateSaleOrderDto.id);
    saleIOrder.dmlStatus = 3;
    saleIOrder.closeTimeStamp = Date();
    return this.saleOrderRepo.save(saleIOrder);
  }

  async findAllSaleOrder(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.issueDate) {
      sql += ` saleOrder.issueDate like '%${searchParams?.issueDate}%' and `;
    }
    if (searchParams?.customerId) {
      sql += ` saleOrder.customer = ${searchParams?.customerId} and `;
    }

    sql += ` saleOrder.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.saleOrderRepo
      .createQueryBuilder('saleOrder')
      .leftJoinAndSelect('saleOrder.customer', 'customer')
      .where(sql)
      .getCount();

    sql += ` order by saleOrder.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.saleOrderRepo
      .createQueryBuilder('saleOrder')
      .leftJoinAndSelect('saleOrder.customer', 'customer')
      .where(sql)
      .getMany();
    return [query, count];
  }

  async findAll() {
    const findByStudent = await this.saleOrderRepo.find({
      relations: ['customer'],
    });
    return findByStudent;
  }

  async generateInvoice(invoicePayload) {
    console.log('invoicePayload', invoicePayload);

    const query = await this.saleOrderRepo
      .createQueryBuilder('saleOrder')
      .leftJoinAndSelect('saleOrder.customer', 'customer')
      .where(
        'saleOrder.issueDate =:issueDate AND saleOrder.customerId =:customerId',
        {
          issueDate: invoicePayload.issueDate,
          customerId: invoicePayload.customerId,
        },
      )
      .getManyAndCount();
    return query;
  }
}
