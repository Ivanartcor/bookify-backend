import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyCategory } from './company-categories.entity';

@Injectable()
export class CompanyCategoriesService {
  constructor(
    @InjectRepository(CompanyCategory)
    private companyCategoriesRepository: Repository<CompanyCategory>,
  ) {}

  // Obtener todas las asociaciones
  async findAll(): Promise<CompanyCategory[]> {
    return await this.companyCategoriesRepository.find({
      relations: ['company', 'category'],
    });
  }

  // Obtener una asociación específica (por companyId y categoryId)
  async findOne(companyId: number, categoryId: number): Promise<CompanyCategory | null> {
    return await this.companyCategoriesRepository.findOne({
      where: { companyId, categoryId },
      relations: ['company', 'category'],
    });
  }

  // Crear una nueva asociación
  async create(data: Partial<CompanyCategory>): Promise<CompanyCategory> {
    const newAssociation = this.companyCategoriesRepository.create(data);
    return await this.companyCategoriesRepository.save(newAssociation);
  }

  // Eliminar una asociación
  async remove(companyId: number, categoryId: number): Promise<void> {
    await this.companyCategoriesRepository.delete({ companyId, categoryId });
  }
}
