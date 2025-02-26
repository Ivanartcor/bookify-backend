import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEmployee } from './service-employee.entity';

@Injectable()
export class ServiceEmployeesService {
  constructor(
    @InjectRepository(ServiceEmployee)
    private readonly serviceEmployeesRepository: Repository<ServiceEmployee>,
  ) {}

  /** 🔹 Obtener todos los empleados asignados a un servicio */
  async getEmployeesByService(serviceId: number): Promise<ServiceEmployee[]> {
    return await this.serviceEmployeesRepository.find({
      where: { service_id: serviceId },
      relations: ['employee'],
    });
  }

  /** 🔹 Obtener todos los servicios en los que está asignado un empleado */
  async getServicesByEmployee(employeeId: number): Promise<ServiceEmployee[]> {
    return await this.serviceEmployeesRepository.find({
      where: { employee_id: employeeId },
      relations: ['service'],
    });
  }

  /** 🔹 Asignar un empleado a un servicio */
  async assignEmployeeToService(serviceId: number, employeeId: number): Promise<ServiceEmployee> {
    const newAssignment = this.serviceEmployeesRepository.create({
      service_id: serviceId,
      employee_id: employeeId,
    });
    return await this.serviceEmployeesRepository.save(newAssignment);
  }

  /** 🔹 Eliminar la asignación de un empleado a un servicio */
  async removeEmployeeFromService(serviceId: number, employeeId: number): Promise<void> {
    const result = await this.serviceEmployeesRepository.delete({ service_id: serviceId, employee_id: employeeId });
    if (result.affected === 0) {
      throw new NotFoundException(`No se encontró la asignación del empleado ${employeeId} al servicio ${serviceId}`);
    }
  }
}
