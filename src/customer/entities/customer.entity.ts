import { Receipt } from 'src/receipt/entities/receipt.entity';
import { ReceiptController } from 'src/receipt/receipt.controller';
import { SaleInvoice } from 'src/sale-invoice/entities/sale-invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @OneToMany(() => SaleInvoice, (sale) => sale.customer)
  saleInvoice: SaleInvoice;

  @OneToMany(() => Receipt, (rec) => rec.customer)
  receipt: Receipt;
}
