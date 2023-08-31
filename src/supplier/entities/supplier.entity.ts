import { PurchaseOrder } from 'src/purchase-order/entities/purchase-order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  creditLimit: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobileNumber: string;

  @Column({ nullable: true })
  startingBalance: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.supplier)
  purchaseOrder: PurchaseOrder;
}
