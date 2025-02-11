import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './support-ticket.entity';

@Injectable()
export class SupportTicketsService {
  constructor(
    @InjectRepository(SupportTicket)
    private supportTicketsRepository: Repository<SupportTicket>,
  ) {}

  // Listar todos los tickets de soporte
  async findAll(): Promise<SupportTicket[]> {
    return await this.supportTicketsRepository.find({
      relations: ['user', 'company', 'assigned_to'],
    });
  }

  // Obtener un ticket por ID
  async findOne(id: number): Promise<SupportTicket> {
    const ticket = await this.supportTicketsRepository.findOne({
      where: { id },
      relations: ['user', 'company', 'assigned_to'],
    });
    if (!ticket) {
      throw new NotFoundException(`SupportTicket with ID ${id} not found`);
    }
    return ticket;
  }

  // Crear un nuevo ticket
  async create(ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    const newTicket = this.supportTicketsRepository.create(ticketData);
    return await this.supportTicketsRepository.save(newTicket);
  }

  // Actualizar un ticket existente
  async update(id: number, updateData: Partial<SupportTicket>): Promise<SupportTicket> {
    await this.supportTicketsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Eliminar un ticket
  async remove(id: number): Promise<void> {
    await this.supportTicketsRepository.delete(id);
  }
}
