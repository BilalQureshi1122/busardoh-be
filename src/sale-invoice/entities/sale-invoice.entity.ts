import { Customer } from 'src/customer/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleInvoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  issueDate: string;

  @Column({ nullable: true })
  invoiceDescription: string;

  @Column({ nullable: true })
  billingAddress: string;

  @Column({ nullable: true })
  vat: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  item: string;

  @Column({ nullable: true })
  itemDescription: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unitPrice: number;

  @Column({ nullable: true })
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
