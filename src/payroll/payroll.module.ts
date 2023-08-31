import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { Payroll } from './entities/payroll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from 'src/employee/employee.module';
import { AttendanceModule } from 'src/attendance/attendance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([(Payroll)],
    ),
    EmployeeModule,
    AttendanceModule,
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports:[PayrollService]
})
export class PayrollModule {}
