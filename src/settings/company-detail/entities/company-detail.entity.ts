import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Department } from 'src/department/entities/department.entity';
import { Designation } from 'src/designation/entities/designation.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  companyAddress: string;

  @Column({ nullable: true })
  phoneNumber1: string;

  @Column({ nullable: true })
  phoneNumber2: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  poBoxNumber: string;

  @Column({ nullable: true })
  trnNumber: string;

  @Column()
  currency: string;

  @Column({ nullable: true })
  managerName: string;

  @Column({ nullable: true })
  noteForInvoices: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;
}
