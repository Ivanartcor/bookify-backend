import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteServices } from './user-favorite-services.entity';

@Injectable()
export class UserFavoriteServicesService {
  constructor(
    @InjectRepository(UserFavoriteServices)
    private favoriteServicesRepository: Repository<UserFavoriteServices>,
  ) {}

  // Lista todas las asociaciones de servicios favoritos
  async findAll(): Promise<UserFavoriteServices[]> {
    return await this.favoriteServicesRepository.find({
      relations: ['user', 'service'],
    });
  }

  // Obtiene una asociación específica por userId y serviceId
  async findOne(userId: number, serviceId: number): Promise<UserFavoriteServices | null> {
    return await this.favoriteServicesRepository.findOne({
      where: { userId, serviceId },
      relations: ['user', 'service'],
    });
  }

  // Crea una nueva asociación (favorito)
  async create(data: Partial<UserFavoriteServices>): Promise<UserFavoriteServices> {
    const newFavorite = this.favoriteServicesRepository.create(data);
    return await this.favoriteServicesRepository.save(newFavorite);
  }

  // Elimina una asociación
  async remove(userId: number, serviceId: number): Promise<void> {
    await this.favoriteServicesRepository.delete({ userId, serviceId });
  }


  // Obtener todos los servicios favoritos de un usuario específico
async findByUser(userId: number): Promise<UserFavoriteServices[]> {
  return await this.favoriteServicesRepository.find({
    where: { userId },
    relations: ['service'], // Incluye la información del servicio
  });
}

}
