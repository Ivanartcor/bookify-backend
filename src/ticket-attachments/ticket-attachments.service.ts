import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketAttachment } from './ticket-attachment.entity';

@Injectable()
export class TicketAttachmentsService {
  constructor(
    @InjectRepository(TicketAttachment)
    private ticketAttachmentsRepository: Repository<TicketAttachment>,
  ) {}

  // Devuelve todos los adjuntos
  async findAll(): Promise<TicketAttachment[]> {
    return await this.ticketAttachmentsRepository.find({ relations: ['ticket'] });
  }

  // Devuelve un adjunto por ID
  async findOne(id: number): Promise<TicketAttachment> {
    const attachment = await this.ticketAttachmentsRepository.findOne({
      where: { id },
      relations: ['ticket'],
    });
    if (!attachment) {
      throw new NotFoundException(`TicketAttachment with ID ${id} not found`);
    }
    return attachment;
  }

  // Crea un nuevo adjunto
  async create(data: Partial<TicketAttachment>): Promise<TicketAttachment> {
    const newAttachment = this.ticketAttachmentsRepository.create(data);
    return await this.ticketAttachmentsRepository.save(newAttachment);
  }

  // Actualiza un adjunto existente
  async update(id: number, updateData: Partial<TicketAttachment>): Promise<TicketAttachment> {
    await this.ticketAttachmentsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina un adjunto
  async remove(id: number): Promise<void> {
    await this.ticketAttachmentsRepository.delete(id);
  }
}
