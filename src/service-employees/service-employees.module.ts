import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEmployee } from './service-employee.entity';
import { ServiceEmployeesService } from './service-employees.service';
import { ServiceEmployeesController } from './service-employees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEmployee])],
  providers: [ServiceEmployeesService],
  controllers: [ServiceEmployeesController],
  exports: [ServiceEmployeesService],
})
export class ServiceEmployeesModule {}
