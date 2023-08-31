import { Project } from "src/projects/entities/project.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueDate: string;

  @Column()
  invoiceDescription: string;

  @Column()
  billingAddress: string;

  @Column({nullable:true})
  vat: number;

  @Column()
  item: string;

  @Column()
  itemDescription: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  total: number;

  @Column()
  dmlStatus: number;

  @Column({nullable:true})
  insertionTimeStamp:string

  @Column({nullable:true})
  lastUpdateTimeStamp:string

  @Column({nullable:true})
  closeTimeStamp:string


  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseOrder)
  supplier: Supplier[]

  @ManyToOne(() => Project, (pro) => pro.purchaseOrder)
  project: Project[]

  

}