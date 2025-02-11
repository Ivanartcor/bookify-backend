import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  // Devuelve todas las direcciones
  async findAll(): Promise<Address[]> {
    return await this.addressesRepository.find({ relations: ['city', 'user', 'company'] });
  }

  // Devuelve una dirección por ID
  async findOne(id: number): Promise<Address> {
    const address = await this.addressesRepository.findOne({
      where: { id },
      relations: ['city', 'user', 'company'],
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  // Crea una nueva dirección
  async create(addressData: Partial<Address>): Promise<Address> {
    const newAddress = this.addressesRepository.create(addressData);
    return await this.addressesRepository.save(newAddress);
  }

  // Actualiza una dirección existente
  async update(id: number, updateData: Partial<Address>): Promise<Address> {
    await this.addressesRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina una dirección
  async remove(id: number): Promise<void> {
    await this.addressesRepository.delete(id);
  }
}
