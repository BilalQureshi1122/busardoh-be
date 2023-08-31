import { Employee } from "src/employee/entities/employee.entity";
import { Project } from "src/projects/entities/project.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true, type:'date'})
  attendanceDate: Date;

  @Column({nullable:true})
  workLocation: string;

  @Column({nullable:true})
  checkIn: string;

  @Column({nullable:true})
  checkOut: string;

  @Column({nullable:true})
  late: string;

  @Column({nullable:true})
  halfDay: string;

  @Column({nullable:true})
  dmlStatus: number;

  @Column({nullable:true})
  insertionTimeStamp:string

  @Column({nullable:true})
  lastUpdateTimeStamp:string

  @Column({nullable:true})
  closeTimeStamp:string

  @ManyToOne(() => Employee, (employee) => employee.attendance)
  employee: Employee[]

  @ManyToOne(() => Project, (project) => project.attendance)
  project: Project[]

  

}