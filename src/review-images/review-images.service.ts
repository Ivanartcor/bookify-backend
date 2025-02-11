import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewImage } from './review-image.entity';

@Injectable()
export class ReviewImagesService {
  constructor(
    @InjectRepository(ReviewImage)
    private reviewImagesRepository: Repository<ReviewImage>,
  ) {}

  // Obtener todas las imágenes de reseñas
  async findAll(): Promise<ReviewImage[]> {
    return await this.reviewImagesRepository.find({ relations: ['review'] });
  }

  // Obtener una imagen por ID
  async findOne(id: number): Promise<ReviewImage> {
    const image = await this.reviewImagesRepository.findOne({
      where: { id },
      relations: ['review'],
    });
    if (!image) {
      throw new NotFoundException(`ReviewImage with ID ${id} not found`);
    }
    return image;
  }

  // Crear una nueva imagen para una reseña
  async create(imageData: Partial<ReviewImage>): Promise<ReviewImage> {
    const newImage = this.reviewImagesRepository.create(imageData);
    return await this.reviewImagesRepository.save(newImage);
  }

  // Actualizar una imagen existente
  async update(id: number, updateData: Partial<ReviewImage>): Promise<ReviewImage> {
    await this.reviewImagesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Eliminar una imagen por ID
  async remove(id: number): Promise<void> {
    await this.reviewImagesRepository.delete(id);
  }
}
