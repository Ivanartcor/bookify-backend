import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewRepliesService } from './review-replies.service';
import { ReviewReply } from './review-reply.entity';

@Controller('review-replies')
export class ReviewRepliesController {
  constructor(private reviewRepliesService: ReviewRepliesService) {}

  // GET /review-replies: Lista todas las respuestas
  @Get()
  async getAll(): Promise<ReviewReply[]> {
    return await this.reviewRepliesService.findAll();
  }

  // GET /review-replies/:id: Obtiene una respuesta por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ReviewReply> {
    return await this.reviewRepliesService.findOne(id);
  }

  // POST /review-replies: Crea una nueva respuesta
  @Post()
  async create(@Body() replyData: Partial<ReviewReply>): Promise<ReviewReply> {
    return await this.reviewRepliesService.create(replyData);
  }

  // PUT /review-replies/:id: Actualiza una respuesta existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<ReviewReply>,
  ): Promise<ReviewReply> {
    return await this.reviewRepliesService.update(id, updateData);
  }

  // DELETE /review-replies/:id: Elimina una respuesta
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.reviewRepliesService.remove(id);
  }
}
