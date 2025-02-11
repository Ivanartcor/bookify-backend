import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewImagesService } from './review-images.service';
import { ReviewImage } from './review-image.entity';

@Controller('review-images')
export class ReviewImagesController {
  constructor(private reviewImagesService: ReviewImagesService) {}

  // GET /review-images
  @Get()
  async getAll(): Promise<ReviewImage[]> {
    return await this.reviewImagesService.findAll();
  }

  // GET /review-images/:id
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ReviewImage> {
    return await this.reviewImagesService.findOne(id);
  }

  // POST /review-images
  @Post()
  async create(@Body() imageData: Partial<ReviewImage>): Promise<ReviewImage> {
    return await this.reviewImagesService.create(imageData);
  }

  // PUT /review-images/:id
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<ReviewImage>,
  ): Promise<ReviewImage> {
    return await this.reviewImagesService.update(id, updateData);
  }

  // DELETE /review-images/:id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.reviewImagesService.remove(id);
  }
}
