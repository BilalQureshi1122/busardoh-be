import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { UserManagement } from './entities/user-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserManagement]),
    JwtModule.register({
      global: true,
      secret:
        'wergdfhj56789jk2m31eio23u9823njkndqweygd562q3ikwdnweiod9837e87ui',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
