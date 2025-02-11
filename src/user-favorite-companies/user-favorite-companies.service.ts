import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteCompanies } from './user-favorite-companies.entity';

@Injectable()
export class UserFavoriteCompaniesService {
  constructor(
    @InjectRepository(UserFavoriteCompanies)
    private favoriteCompaniesRepository: Repository<UserFavoriteCompanies>,
  ) {}

  // Obtiene todas las asociaciones de empresas favoritas
  async findAll(): Promise<UserFavoriteCompanies[]> {
    return await this.favoriteCompaniesRepository.find({
      relations: ['user', 'company'],
    });
  }

  // Obtiene una asociación específica por userId y companyId
  async findOne(userId: number, companyId: number): Promise<UserFavoriteCompanies | null> {
    return await this.favoriteCompaniesRepository.findOne({
      where: { userId, companyId },
      relations: ['user', 'company'],
    });
  }

  // Crea una nueva asociación
  async create(data: Partial<UserFavoriteCompanies>): Promise<UserFavoriteCompanies> {
    const newFavorite = this.favoriteCompaniesRepository.create(data);
    return await this.favoriteCompaniesRepository.save(newFavorite);
  }

  // Elimina una asociación
  async remove(userId: number, companyId: number): Promise<void> {
    await this.favoriteCompaniesRepository.delete({ userId, companyId });
  }
}
