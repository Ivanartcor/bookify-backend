import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  // Devuelve todas las notificaciones
  async findAll(): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      relations: ['user', 'appointment', 'service', 'company'],
    });
  }

  // Devuelve una notificación por ID
  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
      relations: ['user', 'appointment', 'service', 'company'],
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  // Crea una nueva notificación
  async create(notificationData: Partial<Notification>): Promise<Notification> {
    const newNotification = this.notificationsRepository.create(notificationData);
    return await this.notificationsRepository.save(newNotification);
  }

  // Actualiza una notificación existente
  async update(id: number, updateData: Partial<Notification>): Promise<Notification> {
    await this.notificationsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una notificación
  async remove(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}
