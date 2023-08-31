import { Module } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import{Designation} from './entities/designation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([(Designation)])
  ],
  controllers: [DesignationController],
  providers: [DesignationService]
})
export class DesignationModule {}
