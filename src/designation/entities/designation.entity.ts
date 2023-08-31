import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
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
