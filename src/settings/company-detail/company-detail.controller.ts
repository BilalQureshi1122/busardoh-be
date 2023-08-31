import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CompanyDetailService } from './company-detail.service';
import { UpdateCompanyDetailDto } from './dto/update-company-detail.dto';



@Controller('companyDetail')
export class CompanyDetailController {
  constructor(private readonly companyDetailService: CompanyDetailService) {}

  @Post('/addCompanyDetail')
  create(@Body() createSupplierDto) {
    return this.companyDetailService.create(createSupplierDto);
  }

  @Post('updateCompanyDetail')
  update(@Body() updateCompanyDetailDto: UpdateCompanyDetailDto) {
    return this.companyDetailService.update(updateCompanyDetailDto);
  }

  @Post('/getAllCompanyDetail')
  findAll() {
    return this.companyDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyDetailService.findOne(+id);
  }

   
  @Post('/deleteCompanyDetail')
  removeSoft(@Body() updateCompanyDetailDto: UpdateCompanyDetailDto) {
    return this.companyDetailService.delSoft(updateCompanyDetailDto);
    
  }

  @Post('getAllCompanyDetailPagination')
  async findAllCompanyDetail(@Body() findAllCustomerDto) {
    
    try{
      return this.companyDetailService.findAllCompanyDetail(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }
}
