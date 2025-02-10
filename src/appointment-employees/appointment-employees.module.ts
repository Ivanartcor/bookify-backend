import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEmployee } from './appointment-employees.entity';
import { AppointmentEmployeesService } from './appointment-employees.service';
import { AppointmentEmployeesController } from './appointment-employees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEmployee])],
  providers: [AppointmentEmployeesService],
  controllers: [AppointmentEmployeesController],
  exports: [AppointmentEmployeesService],
})
export class AppointmentEmployeesModule {}
