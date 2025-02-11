import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // GET /notifications: Listar todas las notificaciones
  @Get()
  async getAll(): Promise<Notification[]> {
    return await this.notificationsService.findAll();
  }

  // GET /notifications/:id: Obtener una notificación por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Notification> {
    return await this.notificationsService.findOne(id);
  }

  // POST /notifications: Crear una nueva notificación
  @Post()
  async create(@Body() notificationData: Partial<Notification>): Promise<Notification> {
    return await this.notificationsService.create(notificationData);
  }

  // PUT /notifications/:id: Actualizar una notificación existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Notification>,
  ): Promise<Notification> {
    return await this.notificationsService.update(id, updateData);
  }

  // DELETE /notifications/:id: Eliminar una notificación
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.notificationsService.remove(id);
  }
}
