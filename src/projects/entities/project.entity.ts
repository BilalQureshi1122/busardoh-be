import { Attendance } from 'src/attendance/entities/attendance.entity';
import { PurchaseOrder } from 'src/purchase-order/entities/purchase-order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column({ nullable: true })
  income: string;

  @Column({ nullable: true })
  directCost: string;

  @Column({ nullable: true })
  profit: string;

  @Column({ nullable: true })
  status: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.project)
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => Attendance, (attendance) => attendance.project)
  attendance: Attendance;
}
