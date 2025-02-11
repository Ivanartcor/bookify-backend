import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  // GET /reviews: Obtener todas las reseñas
  @Get()
  async getAll(): Promise<Review[]> {
    return await this.reviewsService.findAll();
  }

  // GET /reviews/:id: Obtener una reseña por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Review> {
    return await this.reviewsService.findOne(id);
  }

  // POST /reviews: Crear una nueva reseña
  @Post()
  async create(@Body() reviewData: Partial<Review>): Promise<Review> {
    return await this.reviewsService.create(reviewData);
  }

  // PUT /reviews/:id: Actualizar una reseña existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Review>,
  ): Promise<Review> {
    return await this.reviewsService.update(id, updateData);
  }

  // DELETE /reviews/:id: Eliminar una reseña
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.reviewsService.remove(id);
  }
}
