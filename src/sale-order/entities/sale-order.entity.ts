import { Customer } from 'src/customer/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueDate: string;

  @Column({ nullable: true })
  invoiceDescription: string;

  @Column({ nullable: true })
  billingAddress: string;

  @Column({ nullable: true })
  vat: number;

  @Column({ nullable: true })
  discount: number;

  @Column()
  item: string;

  @Column({ nullable: true })
  itemDescription: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  total: number;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @ManyToOne(() => Customer, (cus) => cus.saleInvoice)
  customer: Customer[];
}
