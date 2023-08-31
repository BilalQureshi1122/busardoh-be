// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  dmlStatus: number;

  @Column({ nullable: true })
  insertionTimeStamp: string;

  @Column({ nullable: true })
  lastUpdateTimeStamp: string;

  @Column({ nullable: true })
  closeTimeStamp: string;

  @OneToMany(() => Employee, (emp) => emp.department)
  employee: Employee;
}
