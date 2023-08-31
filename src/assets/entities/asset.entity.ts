import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  itemCode: string;

  @Column({ nullable: true })
  itemName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: string;

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
}
