import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  id: any;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dmlStatus: number;
  insertionTimeStamp:string;
  lastUpdateTimeStamp:string;
  closeTimeStamp:string
}
