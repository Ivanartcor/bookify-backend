import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) { }

  // 🔹 Obtener citas con filtros avanzados
  async findFilteredAppointments(
    date?: string,
    startDate?: string,
    endDate?: string,
    status?: string,
    paymentMethod?: string
  ): Promise<Appointment[]> {
    const filters: any = {};

    if (date) {
      filters.appointment_date = Like(`${date}%`); // Busca citas en una fecha específica
    }
    if (startDate && endDate) {
      filters.appointment_date = Between(new Date(startDate), new Date(endDate));
    }
    if (status) {
      filters.status = status;
    }
    if (paymentMethod) {
      filters.payment_method = paymentMethod;
    }

    return await this.appointmentsRepository.find({
      where: filters,
      relations: ['client', 'company', 'service'],
    });
  }

  // 🔹 Obtener una cita por ID
  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client', 'company', 'service'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  // 🔹 Crear una nueva cita
  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const newAppointment = this.appointmentsRepository.create(appointmentData);
    return await this.appointmentsRepository.save(newAppointment);
  }

  // 🔹 Actualizar una cita
  async update(id: number, updateData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // 🔹 Eliminar una cita
  async delete(id: number): Promise<void> {
    await this.appointmentsRepository.delete(id);
  }

  // 🔹 Obtener citas de un cliente con filtros opcionales
  async findByClient(clientId: number, status?: string, startDate?: string, endDate?: string): Promise<Appointment[]> {
    const filters: any = { client: { id: clientId } };

    if (status) filters.status = status;
    if (startDate && endDate) {
      filters.appointment_date = Between(new Date(startDate), new Date(endDate));
    }

    return await this.appointmentsRepository.find({
      where: filters,
      relations: ['client', 'company', 'service'],
    });
  }

  // 🔹 Obtener citas de una empresa con filtros opcionales
  async findByCompany(companyId: number, status?: string, startDate?: string, endDate?: string): Promise<Appointment[]> {
    const filters: any = { company: { id: companyId } };

    if (status) filters.status = status;
    if (startDate && endDate) {
      filters.appointment_date = Between(new Date(startDate), new Date(endDate));
    }

    return await this.appointmentsRepository.find({
      where: filters,
      relations: ['client', 'company', 'service'],
    });
  }
}
