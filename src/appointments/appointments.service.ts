import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentsRepository.find({
      relations: ['client', 'company', 'service'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    return await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['client', 'company', 'service'],
    });
  }

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const newAppointment = this.appointmentsRepository.create(appointmentData);
    return await this.appointmentsRepository.save(newAppointment);
  }

  async update(id: number, updateData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.appointmentsRepository.delete(id);
  }
}
