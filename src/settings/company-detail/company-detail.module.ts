import { Module } from '@nestjs/common';
import { CompanyDetailService } from './company-detail.service';
import { CompanyDetailController } from './company-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDetail } from './entities/company-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyDetail])],
  controllers: [CompanyDetailController],
  providers: [CompanyDetailService]
})
export class CompanyDetailModule {}
