import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceAvailability } from './service-availability.entity';

@Injectable()
export class ServiceAvailabilityService {
  constructor(
    @InjectRepository(ServiceAvailability)
    private serviceAvailabilityRepository: Repository<ServiceAvailability>,
  ) {}

  // Devuelve todas las disponibilidades
  async findAll(): Promise<ServiceAvailability[]> {
    return await this.serviceAvailabilityRepository.find({ relations: ['service'] });
  }

  // Devuelve una disponibilidad por ID
  async findOne(id: number): Promise<ServiceAvailability> {
    const availability = await this.serviceAvailabilityRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!availability) {
      throw new NotFoundException(`ServiceAvailability with ID ${id} not found`);
    }
    return availability;
  }

  // Crea una nueva disponibilidad
  async create(availabilityData: Partial<ServiceAvailability>): Promise<ServiceAvailability> {
    const newAvailability = this.serviceAvailabilityRepository.create(availabilityData);
    return await this.serviceAvailabilityRepository.save(newAvailability);
  }

  // Actualiza una disponibilidad existente
  async update(id: number, updateData: Partial<ServiceAvailability>): Promise<ServiceAvailability> {
    await this.serviceAvailabilityRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una disponibilidad
  async remove(id: number): Promise<void> {
    await this.serviceAvailabilityRepository.delete(id);
  }

  async findByService(serviceId: number): Promise<ServiceAvailability[]> {
    return await this.serviceAvailabilityRepository.find({
      where: { service: { id: serviceId } },  // 🔥 Filtrar por el ID del servicio
      relations: ['service'],
    });
  }
  
}
