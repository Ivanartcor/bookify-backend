import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserFavoriteCompaniesService } from './user-favorite-companies.service';
import { UserFavoriteCompanies } from './user-favorite-companies.entity';

@Controller('user-favorite-companies')
export class UserFavoriteCompaniesController {
  constructor(private favoriteCompaniesService: UserFavoriteCompaniesService) {}

  // GET /user-favorite-companies: Lista todas las asociaciones
  @Get()
  async getAll(): Promise<UserFavoriteCompanies[]> {
    return await this.favoriteCompaniesService.findAll();
  }

  // GET /user-favorite-companies/:userId/:companyId: Obtiene una asociación específica
  @Get(':userId/:companyId')
  async getOne(
    @Param('userId') userId: number,
    @Param('companyId') companyId: number,
  ): Promise<UserFavoriteCompanies | null> {
    return await this.favoriteCompaniesService.findOne(userId, companyId);
  }

  // POST /user-favorite-companies: Crea una nueva asociación
  @Post()
  async create(@Body() data: Partial<UserFavoriteCompanies>): Promise<UserFavoriteCompanies> {
    return await this.favoriteCompaniesService.create(data);
  }

  // DELETE /user-favorite-companies/:userId/:companyId: Elimina una asociación
  @Delete(':userId/:companyId')
  async remove(
    @Param('userId') userId: number,
    @Param('companyId') companyId: number,
  ): Promise<void> {
    return await this.favoriteCompaniesService.remove(userId, companyId);
  }
}
