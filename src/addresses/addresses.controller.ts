import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  // GET /addresses: Lista todas las direcciones
  @Get()
  async getAll(): Promise<Address[]> {
    return await this.addressesService.findAll();
  }

  // GET /addresses/:id: Obtiene una dirección por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Address> {
    return await this.addressesService.findOne(id);
  }

  // POST /addresses: Crea una nueva dirección
  @Post()
  async create(@Body() addressData: Partial<Address>): Promise<Address> {
    return await this.addressesService.create(addressData);
  }

  // PUT /addresses/:id: Actualiza una dirección existente
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<Address>): Promise<Address> {
    return await this.addressesService.update(id, updateData);
  }

  // DELETE /addresses/:id: Elimina una dirección
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.addressesService.remove(id);
  }
}
