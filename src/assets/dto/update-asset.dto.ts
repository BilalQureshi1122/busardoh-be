import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
   id:number; 
  itemCode: string;
  itemName: string;
  description: string;
  price: string;
  status: string;
  dmlStatus: number;
  insertionTimeStamp:string;
  lastUpdateTimeStamp:string;
  closeTimeStamp:string
}
