import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';

@Controller('user')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('addUser')
  create(@Body() createUserDto: CreateUserManagementDto) {
    return this.userManagementService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: any) {
    return this.userManagementService.login(loginDto);
  }

  @Post('updateUser')
  update(@Body() updateUserDto: UpdateUserManagementDto) {
    return this.userManagementService.update(updateUserDto);
  }

  @Post('/getAllUser')
  findAll() {
    return this.userManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManagementService.findOne(+id);
  }

  @Post('/deleteUser')
  removeSoft(@Body() updateUserDto: UpdateUserManagementDto) {
    return this.userManagementService.delSoft(updateUserDto);
  }

  @Post('getAllUserPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    try {
      return this.userManagementService.findAllUsers(
        findAllCustomerDto,
        findAllCustomerDto.pagination,
      );
    } catch (e) {
      throw e;
    }
  }
}
