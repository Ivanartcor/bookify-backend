import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  // Devuelve todas las ciudades
  async findAll(): Promise<City[]> {
    return await this.citiesRepository.find();
  }

  // Devuelve una ciudad por ID
  async findOne(id: number): Promise<City> {
    const city = await this.citiesRepository.findOne({ where: { id } });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  // Crea una nueva ciudad
  async create(cityData: Partial<City>): Promise<City> {
    const newCity = this.citiesRepository.create(cityData);
    return await this.citiesRepository.save(newCity);
  }

  // Actualiza una ciudad existente
  async update(id: number, updateData: Partial<City>): Promise<City> {
    await this.citiesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una ciudad
  async remove(id: number): Promise<void> {
    await this.citiesRepository.delete(id);
  }
}
