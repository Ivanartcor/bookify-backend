import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewReply } from './review-reply.entity';

@Injectable()
export class ReviewRepliesService {
  constructor(
    @InjectRepository(ReviewReply)
    private reviewRepliesRepository: Repository<ReviewReply>,
  ) {}

  // Devuelve todas las respuestas a reseñas
  async findAll(): Promise<ReviewReply[]> {
    return await this.reviewRepliesRepository.find({ relations: ['review', 'user'] });
  }

  // Devuelve una respuesta por ID
  async findOne(id: number): Promise<ReviewReply> {
    const reply = await this.reviewRepliesRepository.findOne({
      where: { id },
      relations: ['review', 'user'],
    });
    if (!reply) {
      throw new NotFoundException(`ReviewReply with ID ${id} not found`);
    }
    return reply;
  }

  // Crea una nueva respuesta a una reseña
  async create(replyData: Partial<ReviewReply>): Promise<ReviewReply> {
    const newReply = this.reviewRepliesRepository.create(replyData);
    return await this.reviewRepliesRepository.save(newReply);
  }

  // Actualiza una respuesta existente
  async update(id: number, updateData: Partial<ReviewReply>): Promise<ReviewReply> {
    await this.reviewRepliesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una respuesta
  async remove(id: number): Promise<void> {
    await this.reviewRepliesRepository.delete(id);
  }
}
