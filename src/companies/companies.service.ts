import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  // Obtener todas las compañías
  async findAll(): Promise<Company[]> {
    return await this.companiesRepository.find();
  }

  // Obtener una compañía por ID
  async findOne(id: number): Promise<Company> {
    return await this.companiesRepository.findOne({ where: { id } });
  }

  // Crear una nueva compañía
  async create(companyData: Partial<Company>): Promise<Company> {
    const newCompany = this.companiesRepository.create(companyData);
    return await this.companiesRepository.save(newCompany);
  }

  // Actualizar una compañía existente
  async update(id: number, updateData: Partial<Company>): Promise<Company> {
    await this.companiesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Eliminar una compañía
  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}
