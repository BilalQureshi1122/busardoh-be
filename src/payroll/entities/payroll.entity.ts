import { Designation } from "src/designation/entities/designation.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payroll {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueDate: string;

  @Column()
  currentMonthSalary: number;

  @Column()
  days: number;

  @Column()
  dmlStatus: number;

  @Column({nullable:true})
  insertionTimeStamp:string

  @Column({nullable:true})
  lastUpdateTimeStamp:string

  @Column({nullable:true})
  closeTimeStamp:string

  @ManyToOne(() => Employee, (employee) => employee.id)
  employee: Employee[]

  @ManyToOne(() => Designation, (designation) => designation.id)
  designation: Designation[]
}