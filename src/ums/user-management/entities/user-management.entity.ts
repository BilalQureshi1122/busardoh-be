import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  dmlStatus: number;

  @Column({nullable:true})
  insertionTimeStamp:string

  @Column({nullable:true})
  lastUpdateTimeStamp:string

  @Column({nullable:true})
  closeTimeStamp:string
 
}