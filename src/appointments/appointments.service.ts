import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Appointment } from './appointment.entity';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/user.entity';

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
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filters.appointment_date = Between(startOfDay, endOfDay);
    } else if (startDate && endDate) {
      filters.appointment_date = Between(new Date(startDate), new Date(endDate));
    }
  
    if (status) {
      filters.status = status;
    }
  
    if (paymentMethod) {
      filters.payment_method = paymentMethod;
    }

    const appointments = await this.appointmentsRepository.find({
      where: filters,
      relations: ['client', 'company', 'service'],
    });
  
    return appointments;
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

    // ✅ Transformamos el usuario antes de devolverlo
    appointment.client = plainToInstance(User, appointment.client);

    return appointment;
  }

  // 🔹 Crear una nueva cita
  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    
    // ✅ Validar si appointment_date existe
    if (!appointmentData.appointment_date) {
      throw new BadRequestException('La fecha de la cita es obligatoria.');
    }
  
    // ✅ Verificar si appointment_date es una cadena válida
    if (typeof appointmentData.appointment_date !== 'string') {
      throw new BadRequestException('La fecha de la cita debe ser una cadena en formato ISO.');
    }
  
    // ✅ Intentar convertir appointment_date a un objeto Date
    const appointmentDate = new Date(appointmentData.appointment_date);
    if (isNaN(appointmentDate.getTime())) {
      throw new BadRequestException('La fecha de la cita no es válida.');
    }
  
    // ✅ Formatear la fecha al formato correcto para MySQL (YYYY-MM-DD HH:MM:SS)
    const formattedDate = appointmentDate.toISOString().slice(0, 19).replace('T', ' ');
  
    // ✅ Crear la cita asegurando que appointment_date esté correctamente formateado
    const newAppointment = this.appointmentsRepository.create({
      ...appointmentData,
      appointment_date: formattedDate, // 📌 Usar la fecha validada y formateada
    });
  
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
      order: { appointment_date: 'ASC' } // Ordenar por fecha ascendente
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
      order: { appointment_date: 'ASC' }
    });
  }
}
