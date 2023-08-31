import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { ProjectsModule } from './projects/projects.module';
import { SupplierModule } from './supplier/supplier.module';
import { EmployeeModule } from './employee/employee.module';
import { AssetsModule } from './assets/assets.module';
import { SaleInvoiceModule } from './sale-invoice/sale-invoice.module';
import { SaleQuoteModule } from './sale-quote/sale-quote.module';
import { SaleOrderModule } from './sale-order/sale-order.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PayrollModule } from './payroll/payroll.module';
import { ReceiptModule } from './receipt/receipt.module';
import { UserManagementModule } from './ums/user-management/user-management.module';
import { CompanyDetailModule } from './settings/company-detail/company-detail.module';
import { DocumentModule } from './document/document.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-old-band-27934938-pooler.ap-southeast-1.postgres.vercel-storage.com',
      port: 5432,
      username: 'default',
      password: 'V5PnlkvAr3yO',
      database: 'verceldb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '123456',
    //   database: 'hrm_db',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   logging: true,
    // }),

    CustomerModule,

    DepartmentModule,

    DesignationModule,

    ProjectsModule,

    SupplierModule,

    EmployeeModule,

    AssetsModule,

    SaleInvoiceModule,

    SaleQuoteModule,

    SaleOrderModule,

    PurchaseOrderModule,

    AttendanceModule,

    PayrollModule,

    ReceiptModule,

    UserManagementModule,

    CompanyDetailModule,

    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
