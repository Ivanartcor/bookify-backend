import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  // Devuelve todas las reseñas
  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: ['user', 'company', 'service'],
    });
  }

  // Devuelve una reseña por ID, lanzando excepción si no existe
  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'company', 'service'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  // Crea una nueva reseña
  async create(reviewData: Partial<Review>): Promise<Review> {
    // Aquí podrías agregar validación adicional para asegurar que
    // company o service al menos no sean ambos nulos
    const newReview = this.reviewsRepository.create(reviewData);
    return await this.reviewsRepository.save(newReview);
  }

  // Actualiza una reseña existente
  async update(id: number, updateData: Partial<Review>): Promise<Review> {
    await this.reviewsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una reseña
  async remove(id: number): Promise<void> {
    await this.reviewsRepository.delete(id);
  }
}
