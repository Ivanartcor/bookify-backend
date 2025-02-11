import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CompanyCategoriesService } from './company-categories.service';
import { CompanyCategory } from './company-categories.entity';

@Controller('company-categories')
export class CompanyCategoriesController {
  constructor(private companyCategoriesService: CompanyCategoriesService) {}

  // GET /company-categories - Lista todas las asociaciones
  @Get()
  async getAll(): Promise<CompanyCategory[]> {
    return await this.companyCategoriesService.findAll();
  }

  // GET /company-categories/:companyId/:categoryId - Obtener una asociación específica
  @Get(':companyId/:categoryId')
  async getOne(
    @Param('companyId') companyId: number,
    @Param('categoryId') categoryId: number,
  ): Promise<CompanyCategory | null> {
    return await this.companyCategoriesService.findOne(companyId, categoryId);
  }

  // POST /company-categories - Crear una nueva asociación
  @Post()
  async create(@Body() data: Partial<CompanyCategory>): Promise<CompanyCategory> {
    return await this.companyCategoriesService.create(data);
  }

  // DELETE /company-categories/:companyId/:categoryId - Eliminar una asociación
  @Delete(':companyId/:categoryId')
  async remove(
    @Param('companyId') companyId: number,
    @Param('categoryId') categoryId: number,
  ): Promise<void> {
    return await this.companyCategoriesService.remove(companyId, categoryId);
  }
}
