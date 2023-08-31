import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  employeeImage: string;

  @Column({ nullable: true })
  matricCertificate: string;

  @Column({ nullable: true })
  passport: string;

  @Column({ nullable: true })
  visa: string;

  @Column({ nullable: true })
  cnicFrontSide: string;

  @Column({ nullable: true })
  cnicbackSide: string;

  @Column({ nullable: true })
  interCertificate: string;

  @Column({ nullable: true })
  degree: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @ManyToOne(() => Employee, (emp) => emp.documents)
  employee: Employee[];
}
