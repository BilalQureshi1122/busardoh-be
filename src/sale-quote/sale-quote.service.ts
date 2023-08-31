import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { SaleQuote } from './entities/sale-quote.entity';
import { CreateSaleQuoteDto } from './dto/create-sale-quote.dto';
import { UpdateSaleQuoteDto } from './dto/update-sale-quote.dto';

@Injectable()
export class SaleQuoteService {
  constructor(
    @InjectRepository(SaleQuote)
    private readonly saleQuoteRepo: Repository<SaleQuote>,
  ) {}

  async create(createSaleQuoteDto: CreateSaleQuoteDto): Promise<SaleQuote> {
    console.log('fe payload', createSaleQuoteDto);
    console.log('fe itemRows', createSaleQuoteDto?.['itemRows']);

    let getItemRows = createSaleQuoteDto?.['itemRows'];

    return getItemRows.forEach(async (payload, index) => {
      const saleQuote = new SaleQuote();

      saleQuote.issueDate = createSaleQuoteDto.issueDate;
      saleQuote.invoiceDescription = createSaleQuoteDto.invoiceDescription;
      saleQuote.billingAddress = createSaleQuoteDto.billingAddress;
      saleQuote.vat = createSaleQuoteDto.vat;
      saleQuote.discount = createSaleQuoteDto.discount;
      saleQuote.customer = createSaleQuoteDto.customerId;

      saleQuote.item = payload['item'];

      console.log('inner payload', payload['item']);
      saleQuote.itemDescription = payload['itemDescription'];
      saleQuote.quantity = payload['quantity'];
      saleQuote.unitPrice = payload['unitPrice'];
      saleQuote.total = payload['total'];

      saleQuote.dmlStatus = 1;
      saleQuote.insertionTimeStamp = Date();
      await this.saleQuoteRepo.save(saleQuote);
    });
  }

  update(updatesaleQuoteDto: UpdateSaleQuoteDto) {
    const saleQuote = new SaleQuote();

    saleQuote.issueDate = updatesaleQuoteDto.issueDate;
    saleQuote.invoiceDescription = updatesaleQuoteDto.invoiceDescription;
    saleQuote.billingAddress = updatesaleQuoteDto.billingAddress;
    saleQuote.vat = updatesaleQuoteDto.vat;
    saleQuote.discount = updatesaleQuoteDto.discount;
    saleQuote.customer = updatesaleQuoteDto.customerId;

    saleQuote.item = updatesaleQuoteDto.item;
    saleQuote.itemDescription = updatesaleQuoteDto.itemDescription;
    saleQuote.quantity = updatesaleQuoteDto.quantity;
    saleQuote.unitPrice = updatesaleQuoteDto.unitPrice;
    saleQuote.total = updatesaleQuoteDto.total;

    saleQuote.dmlStatus = 2;
    saleQuote.lastUpdateTimeStamp = Date();
    return this.saleQuoteRepo.save(saleQuote);
  }

  async findOne(id: number) {
    const saleQuote = await this.saleQuoteRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return saleQuote;
  }

  async delSoft(updatesaleQuoteDto: UpdateSaleQuoteDto) {
    let saleQuote = new SaleQuote();
    saleQuote = await this.findOne(updatesaleQuoteDto.id);
    saleQuote.dmlStatus = 3;
    saleQuote.closeTimeStamp = Date();
    return this.saleQuoteRepo.save(saleQuote);
  }

  async findAllSaleQuote(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    let sql = '';
    if (searchParams?.issueDate) {
      sql += ` saleQuote.issueDate ilike '%${searchParams?.issueDate}%' and `;
    }
    if (searchParams?.customerId) {
      sql += ` attendance.customer = ${searchParams?.customerId} and `;
    }

    sql += ` saleQuote.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.saleQuoteRepo
      .createQueryBuilder('saleQuote')
      .leftJoinAndSelect('saleQuote.customer', 'customer')
      .where(sql)
      .getCount();

    sql += ` order by saleQuote.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.saleQuoteRepo
      .createQueryBuilder('saleQuote')
      .leftJoinAndSelect('saleQuote.customer', 'customer')
      .where(sql)
      .getMany();
    return [query, count];
  }

  async findAll() {
    const findByStudent = await this.saleQuoteRepo.find({
      relations: ['customer'],
    });
    return findByStudent;
  }

  async generateInvoice(invoicePayload) {
    console.log('invoicePayload', invoicePayload);

    const query = await this.saleQuoteRepo
      .createQueryBuilder('saleQuote')
      .leftJoinAndSelect('saleQuote.customer', 'customer')
      .where(
        'saleQuote.issueDate =:issueDate AND saleQuote.customerId =:customerId',
        {
          issueDate: invoicePayload.issueDate,
          customerId: invoicePayload.customerId,
        },
      )
      .getManyAndCount();
    return query;
  }
}
