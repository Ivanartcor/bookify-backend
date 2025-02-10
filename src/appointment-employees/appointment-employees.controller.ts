import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppointmentEmployeesService } from './appointment-employees.service';
import { AppointmentEmployee } from './appointment-employees.entity';

@Controller('appointment-employees')
export class AppointmentEmployeesController {
  constructor(private appointmentEmployeesService: AppointmentEmployeesService) {}

  // GET: Listar todas las asignaciones
  @Get()
  async getAll(): Promise<AppointmentEmployee[]> {
    return await this.appointmentEmployeesService.findAll();
  }

  // GET: Obtener una asignación específica por appointmentId y employeeId
  @Get(':appointmentId/:employeeId')
  async getOne(
    @Param('appointmentId') appointmentId: number,
    @Param('employeeId') employeeId: number,
  ): Promise<AppointmentEmployee | null> {
    return await this.appointmentEmployeesService.findOne(appointmentId, employeeId);
  }

  // POST: Crear una nueva asignación
  @Post()
  async create(@Body() assignmentData: Partial<AppointmentEmployee>): Promise<AppointmentEmployee> {
    return await this.appointmentEmployeesService.create(assignmentData);
  }

  // DELETE: Eliminar una asignación específica
  @Delete(':appointmentId/:employeeId')
  async remove(
    @Param('appointmentId') appointmentId: number,
    @Param('employeeId') employeeId: number,
  ): Promise<void> {
    return await this.appointmentEmployeesService.remove(appointmentId, employeeId);
  }
}
