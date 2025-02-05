import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  async getAll(): Promise<Appointment[]> {
    return await this.appointmentsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Appointment> {
    return await this.appointmentsService.findOne(id);
  }

  @Post()
  async create(@Body() appointmentData: Partial<Appointment>): Promise<Appointment> {
    return await this.appointmentsService.create(appointmentData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Appointment>,
  ): Promise<Appointment> {
    return await this.appointmentsService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.appointmentsService.delete(id);
  }
}
