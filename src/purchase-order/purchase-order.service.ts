import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepo: Repository<PurchaseOrder>,
  ) {}

  async create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    console.log('fe payload', createPurchaseOrderDto);
    console.log('fe itemRows', createPurchaseOrderDto?.['itemRows']);

    let getItemRows = createPurchaseOrderDto?.['itemRows'];

    return getItemRows.forEach(async (payload, index) => {
      const purchaseOrder = new PurchaseOrder();

      purchaseOrder.issueDate = createPurchaseOrderDto.issueDate;
      purchaseOrder.invoiceDescription =
        createPurchaseOrderDto.invoiceDescription;
      purchaseOrder.billingAddress = createPurchaseOrderDto.billingAddress;
      purchaseOrder.vat = createPurchaseOrderDto.vat;
      purchaseOrder.supplier = createPurchaseOrderDto.supplierId;
      purchaseOrder.project = createPurchaseOrderDto.projectId;

      purchaseOrder.item = payload['item'];

      console.log('inner payload', payload['item']);
      purchaseOrder.itemDescription = payload['itemDescription'];
      purchaseOrder.quantity = payload['quantity'];
      purchaseOrder.unitPrice = payload['unitPrice'];
      purchaseOrder.total = payload['total'];

      purchaseOrder.dmlStatus = 1;
      purchaseOrder.insertionTimeStamp = Date();
      await this.purchaseOrderRepo.save(purchaseOrder);
    });
  }

  update(updatepurchaseOrderDto: UpdatePurchaseOrderDto) {
    const purchaseOrder = new PurchaseOrder();

    purchaseOrder.issueDate = updatepurchaseOrderDto.issueDate;
    purchaseOrder.invoiceDescription =
      updatepurchaseOrderDto.invoiceDescription;
    purchaseOrder.billingAddress = updatepurchaseOrderDto.billingAddress;
    purchaseOrder.vat = updatepurchaseOrderDto.vat;
    purchaseOrder.supplier = updatepurchaseOrderDto.supplierId;
    purchaseOrder.project = updatepurchaseOrderDto.projectId;

    purchaseOrder.item = updatepurchaseOrderDto.item;
    purchaseOrder.itemDescription = updatepurchaseOrderDto.itemDescription;
    purchaseOrder.quantity = updatepurchaseOrderDto.quantity;
    purchaseOrder.unitPrice = updatepurchaseOrderDto.unitPrice;
    purchaseOrder.total = updatepurchaseOrderDto.total;

    purchaseOrder.dmlStatus = 2;
    purchaseOrder.lastUpdateTimeStamp = Date();
    return this.purchaseOrderRepo.save(purchaseOrder);
  }

  async findOne(id: number) {
    const purchaseOrder = await this.purchaseOrderRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return purchaseOrder;
  }

  async delSoft(updatepurchaseOrderDto: UpdatePurchaseOrderDto) {
    let purchaseOrder = new PurchaseOrder();
    purchaseOrder = await this.findOne(updatepurchaseOrderDto.id);
    purchaseOrder.dmlStatus = 3;
    purchaseOrder.closeTimeStamp = Date();
    return this.purchaseOrderRepo.save(purchaseOrder);
  }

  async findAllPurchaseOrder(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.issueDate) {
      sql += ` purchaseOrder.issueDate like '%${searchParams?.issueDate}%' and `;
    }
    if (searchParams?.projectId) {
      sql += ` purchaseOrder.project = ${searchParams?.projectId} and `;
    }
    if (searchParams?.projectId) {
      sql += ` purchaseOrder.supplier = ${searchParams?.supplierId} and `;
    }
    sql += ` purchaseOrder.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.purchaseOrderRepo
      .createQueryBuilder('purchaseOrder')
      .leftJoinAndSelect('purchaseOrder.supplier', 'supplier')
      .leftJoinAndSelect('purchaseOrder.project', 'project')
      .where(sql)
      .getCount();

    sql += ` order by purchaseOrder.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.purchaseOrderRepo
      .createQueryBuilder('purchaseOrder')
      .leftJoinAndSelect('purchaseOrder.supplier', 'supplier')
      .leftJoinAndSelect('purchaseOrder.project', 'project')
      .where(sql)
      .getMany();
    return [query, count];
  }

  async findAll() {
    const findByStudent = await this.purchaseOrderRepo.find({
      relations: ['customer'],
    });
    return findByStudent;
  }

  async generateInvoice(invoicePayload) {
    console.log('invoicePayload', invoicePayload);

    const query = await this.purchaseOrderRepo
      .createQueryBuilder('purchaseOrder')
      .leftJoinAndSelect('purchaseOrder.supplier', 'supplier')
      .leftJoinAndSelect('purchaseOrder.project', 'project')
      .where(
        'purchaseOrder.issueDate =:issueDate AND purchaseOrder.supplierId =:supplierId',
        {
          issueDate: invoicePayload.issueDate,
          supplierId: invoicePayload.supplierId,
        },
      )
      .getManyAndCount();
    return query;
  }
}
