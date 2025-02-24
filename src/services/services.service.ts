import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return await this.servicesRepository.find({ relations: ['company'] });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { id }, relations: ['company'] });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }
  async create(serviceData: Partial<Service>): Promise<Service> {
    const newService = this.servicesRepository.create(serviceData);
    return await this.servicesRepository.save(newService);
  }

  async update(id: number, updateData: Partial<Service>): Promise<Service> {
    await this.servicesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }

  // Obtener todos los servicios de una empresa específica
async findByCompany(companyId: number): Promise<Service[]> {
  return await this.servicesRepository.find({
    where: { company: { id: companyId } },
    relations: ['company'],
  });
}

}
