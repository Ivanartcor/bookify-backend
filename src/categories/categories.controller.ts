import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // Endpoint: GET /categories
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  // Endpoint: GET /categories/:id
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.findOne(id);
  }

  // Endpoint: POST /categories
  @Post()
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return await this.categoriesService.create(categoryData);
  }

  // Endpoint: PUT /categories/:id
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Category>,
  ): Promise<Category> {
    return await this.categoriesService.update(id, updateData);
  }

  // Endpoint: DELETE /categories/:id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.categoriesService.remove(id);
  }
}
