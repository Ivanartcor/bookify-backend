import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  // Devuelve todas las categorías
  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  // Devuelve una categoría por ID, lanzando excepción si no existe
  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Crea una nueva categoría
  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(categoryData);
    return await this.categoriesRepository.save(newCategory);
  }

  // Actualiza una categoría existente
  async update(id: number, updateData: Partial<Category>): Promise<Category> {
    await this.categoriesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una categoría
  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
