import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) { }

  // 🔹 Obtener todas las citas con filtros opcionales
  @Get()
  async getAllAppointments(
    @Query('date') date?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: string,
    @Query('paymentMethod') paymentMethod?: string
  ): Promise<Appointment[]> {
    return await this.appointmentsService.findFilteredAppointments(
      date, startDate, endDate, status, paymentMethod
    );
  }

  // 🔹 Obtener una cita por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Appointment> {
    return await this.appointmentsService.findOne(id);
  }

  // 🔹 Crear una nueva cita
  @Post()
  async create(@Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
    return await this.appointmentsService.create(appointmentData);
  }

  // 🔹 Actualizar una cita
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Appointment>,
  ): Promise<Appointment> {
    return await this.appointmentsService.update(id, updateData);
  }

  // 🔹 Eliminar una cita
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.appointmentsService.delete(id);
  }

  // 🔹 Obtener citas de un cliente con filtros opcionales
  @Get('client/:clientId')
  async getAppointmentsByClient(
    @Param('clientId') clientId: number,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ): Promise<Appointment[]> {
    return await this.appointmentsService.findByClient(clientId, status, startDate, endDate);
  }

  // 🔹 Obtener citas de una empresa con filtros opcionales
  @Get('company/:companyId')
  async getAppointmentsByCompany(
    @Param('companyId') companyId: number,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ): Promise<Appointment[]> {
    return await this.appointmentsService.findByCompany(companyId, status, startDate, endDate);
  }
}
