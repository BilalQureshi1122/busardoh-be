import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset) private readonly assetRepo: Repository<Asset>,
  ) {}

  create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const asset = new Asset();
    asset.itemName = createAssetDto.itemName;
    asset.itemCode = createAssetDto.itemCode;
    asset.description = createAssetDto.description;
    asset.price = createAssetDto.price;
    asset.status = createAssetDto.status;
    asset.dmlStatus = 1;
    asset.insertionTimeStamp = Date();
    return this.assetRepo.save(asset);
  }

  findAll(): Promise<Asset[]> {
    return this.assetRepo.find();
  }

  update(updateassetDto: UpdateAssetDto) {
    const asset = new Asset();
    asset.itemName = updateassetDto.itemName;
    asset.itemCode = updateassetDto.itemCode;
    asset.description = updateassetDto.description;
    asset.price = updateassetDto.price;
    asset.status = updateassetDto.status;
    (asset.id = updateassetDto.id), (asset.dmlStatus = 2);
    asset.lastUpdateTimeStamp = Date();
    return this.assetRepo.save(asset);
  }

  async findOne(id: number) {
    const asset = await this.assetRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return asset;
  }

  async delSoft(updateassetDto: UpdateAssetDto) {
    let asset = new Asset();
    asset = await this.findOne(updateassetDto.id);
    asset.dmlStatus = 3;
    asset.closeTimeStamp = Date();
    return this.assetRepo.save(asset);
  }

  async findAllAssets(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.itemName) {
      sql += ` itemName.name ilike '%${searchParams?.itemName}%' and `;
    }
    if (searchParams?.itemCode) {
      sql += ` asset.itemCode ilike '%${searchParams?.itemCode}%' and `;
    }
    if (searchParams?.price) {
      sql += ` asset.price ilike '%${searchParams?.price}%' and `;
    }

    if (searchParams?.status) {
      sql += ` asset.status ilike '%${searchParams?.status}%' and `;
    }

    sql += ` asset.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.assetRepo
      .createQueryBuilder('asset')
      .where(sql)
      .getCount();

    sql += ` group by asset.id order by asset.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.assetRepo
      .createQueryBuilder('asset')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
