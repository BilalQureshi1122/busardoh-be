import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Department } from 'src/department/entities/department.entity';
import { Designation } from 'src/designation/entities/designation.entity';
import { Document } from 'src/document/entities/document.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
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

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  salary: string;

  @Column()
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @ManyToOne(() => Department, (dep) => dep.employee)
  department: Department[];

  @ManyToOne(() => Designation, (desig) => desig.id)
  designation: Designation[];

  @ManyToOne(() => Attendance, (attendance) => attendance.employee)
  attendance: Attendance;

  @ManyToOne(() => Document, (doc) => doc.employee)
  documents: Document[];
}
