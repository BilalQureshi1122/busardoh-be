import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';
import { UserManagement } from './entities/user-management.entity';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManagement)
    private readonly userRepo: Repository<UserManagement>,
    private jwtService: JwtService,
  ) {}

  create(
    createUserManagementDto: CreateUserManagementDto,
  ): Promise<UserManagement> {
    const user = new UserManagement();
    user.name = createUserManagementDto.name;
    user.email = createUserManagementDto.email;
    user.mobileNumber = createUserManagementDto.mobileNumber;
    user.userName = createUserManagementDto.userName;
    user.password = createUserManagementDto.password;
    user.dmlStatus = 1;
    user.insertionTimeStamp = Date();
    return this.userRepo.save(user);
  }

  async login(loginDto: any) {
    if (loginDto.password && loginDto.userName) {
      const user = await this.userRepo.findOne({
        where: {
          userName: loginDto.userName,
          dmlStatus: Not(3),
        },
      });
      if (
        user?.password === loginDto.password &&
        user?.userName === loginDto.userName
      ) {
        const payload = { sub: user, username: user.userName };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        let message = { message: 'Invalid' };
        return message;
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  findAll(): Promise<UserManagement[]> {
    return this.userRepo.find();
  }

  update(updateuserDto: UpdateUserManagementDto) {
    const user = new UserManagement();
    user.name = updateuserDto.name;
    user.email = updateuserDto.email;
    user.mobileNumber = updateuserDto.mobileNumber;
    user.userName = updateuserDto.userName;
    user.password = updateuserDto.password;
    (user.id = updateuserDto.id), (user.dmlStatus = 2);
    user.lastUpdateTimeStamp = Date();
    return this.userRepo.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return user;
  }

  async delSoft(updateuserDto: UpdateUserManagementDto) {
    let user = new UserManagement();
    user = await this.findOne(updateuserDto.id);
    user.dmlStatus = 3;
    user.closeTimeStamp = Date();
    return this.userRepo.save(user);
  }

  async findAllUsers(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.itemName) {
      sql += ` name.name ilike '%${searchParams?.name}%' and `;
    }
    if (searchParams?.itemCode) {
      sql += ` username.itemCode ilike '%${searchParams?.userName}%' and `;
    }

    sql += ` user.dmlStatus != 3`;

    console.log('query', sql);
    const count = await this.userRepo
      .createQueryBuilder('user')
      .where(sql)
      .getCount();
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.userRepo
      .createQueryBuilder('user')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
