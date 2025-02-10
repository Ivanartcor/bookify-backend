import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEmployee } from './appointment-employees.entity';

@Injectable()
export class AppointmentEmployeesService {
  constructor(
    @InjectRepository(AppointmentEmployee)
    private appointmentEmployeesRepository: Repository<AppointmentEmployee>,
  ) {}

  // Obtiene todas las asignaciones de empleados a citas
  async findAll(): Promise<AppointmentEmployee[]> {
    return await this.appointmentEmployeesRepository.find({
      relations: ['appointment', 'employee'],
    });
  }

  // Obtiene una asignación por appointmentId y employeeId
  async findOne(appointmentId: number, employeeId: number): Promise<AppointmentEmployee | null> {
    return await this.appointmentEmployeesRepository.findOne({
      where: { appointmentId, employeeId },
      relations: ['appointment', 'employee'],
    });
  }

  // Crea una nueva asignación
  async create(assignmentData: Partial<AppointmentEmployee>): Promise<AppointmentEmployee> {
    const newAssignment = this.appointmentEmployeesRepository.create(assignmentData);
    return await this.appointmentEmployeesRepository.save(newAssignment);
  }

  // Elimina una asignación (por clave compuesta)
  async remove(appointmentId: number, employeeId: number): Promise<void> {
    await this.appointmentEmployeesRepository.delete({ appointmentId, employeeId });
  }
}
