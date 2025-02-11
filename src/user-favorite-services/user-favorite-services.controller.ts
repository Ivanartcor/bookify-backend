import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserFavoriteServicesService } from './user-favorite-services.service';
import { UserFavoriteServices } from './user-favorite-services.entity';

@Controller('user-favorite-services')
export class UserFavoriteServicesController {
  constructor(private favoriteServicesService: UserFavoriteServicesService) {}

  // GET /user-favorite-services: Lista todas las asociaciones
  @Get()
  async getAll(): Promise<UserFavoriteServices[]> {
    return await this.favoriteServicesService.findAll();
  }

  // GET /user-favorite-services/:userId/:serviceId: Obtiene una asociación específica
  @Get(':userId/:serviceId')
  async getOne(
    @Param('userId') userId: number,
    @Param('serviceId') serviceId: number,
  ): Promise<UserFavoriteServices | null> {
    return await this.favoriteServicesService.findOne(userId, serviceId);
  }

  // POST /user-favorite-services: Crea una nueva asociación
  @Post()
  async create(@Body() data: Partial<UserFavoriteServices>): Promise<UserFavoriteServices> {
    return await this.favoriteServicesService.create(data);
  }

  // DELETE /user-favorite-services/:userId/:serviceId: Elimina una asociación
  @Delete(':userId/:serviceId')
  async remove(
    @Param('userId') userId: number,
    @Param('serviceId') serviceId: number,
  ): Promise<void> {
    return await this.favoriteServicesService.remove(userId, serviceId);
  }
}
