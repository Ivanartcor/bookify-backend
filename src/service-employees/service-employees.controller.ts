import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ServiceEmployeesService } from './service-employees.service';
import { ServiceEmployee } from './service-employee.entity';

@Controller('service-employees')
export class ServiceEmployeesController {
  constructor(private readonly serviceEmployeesService: ServiceEmployeesService) {}

  /** 🔹 Obtener todos los empleados asignados a un servicio */
  @Get('service/:serviceId')
  async getEmployeesByService(@Param('serviceId') serviceId: number): Promise<ServiceEmployee[]> {
    return await this.serviceEmployeesService.getEmployeesByService(serviceId);
  }

  /** 🔹 Obtener todos los servicios en los que está un empleado */
  @Get('employee/:employeeId')
  async getServicesByEmployee(@Param('employeeId') employeeId: number): Promise<ServiceEmployee[]> {
    return await this.serviceEmployeesService.getServicesByEmployee(employeeId);
  }

  /** 🔹 Asignar un empleado a un servicio */
  @Post()
  async assignEmployeeToService(
    @Body() assignData: { serviceId: number; employeeId: number }
  ): Promise<ServiceEmployee> {
    return await this.serviceEmployeesService.assignEmployeeToService(assignData.serviceId, assignData.employeeId);
  }

  /** 🔹 Eliminar la asignación de un empleado a un servicio */
  @Delete(':serviceId/:employeeId')
  async removeEmployeeFromService(
    @Param('serviceId') serviceId: number,
    @Param('employeeId') employeeId: number,
  ): Promise<void> {
    return await this.serviceEmployeesService.removeEmployeeFromService(serviceId, employeeId);
  }
}
