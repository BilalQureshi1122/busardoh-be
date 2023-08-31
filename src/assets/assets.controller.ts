import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('/addAssets')
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Post('updateAssets')
  update(@Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(updateAssetDto);
  }

  @Post('/getAllAssets')
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(+id);
  }
   
  @Post('/deleteAssets')
  removeSoft(@Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.delSoft(updateAssetDto);
    
  }

  @Post('getAllAssetsPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    
    try{
      return this.assetsService.findAllAssets(findAllCustomerDto,findAllCustomerDto.pagination) 
    }
    catch(e){
      throw e
    }

  }
}
