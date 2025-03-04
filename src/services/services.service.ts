import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { Company } from 'src/companies/company.entity';

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
    if (!serviceData.company || !serviceData.company.id) {
      throw new Error('El objeto company con su ID es requerido.');
    }
  
    // Cargar la entidad de la empresa usando su ID
    const company = await this.servicesRepository.manager
      .findOne(Company, { where: { id: serviceData.company.id } });
  
    if (!company) {
      throw new Error(`No se encontró la empresa con ID ${serviceData.company.id}`);
    }
  
    // Crear el servicio con la relación correctamente asignada
    const newService = this.servicesRepository.create({
      ...serviceData,
      company
    });
  
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
