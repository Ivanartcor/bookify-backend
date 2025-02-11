import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from './city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  // GET /cities - Listar todas las ciudades
  @Get()
  async getAll(): Promise<City[]> {
    return await this.citiesService.findAll();
  }

  // GET /cities/:id - Obtener una ciudad por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<City> {
    return await this.citiesService.findOne(id);
  }

  // POST /cities - Crear una nueva ciudad
  @Post()
  async create(@Body() cityData: Partial<City>): Promise<City> {
    return await this.citiesService.create(cityData);
  }

  // PUT /cities/:id - Actualizar una ciudad existente
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<City>): Promise<City> {
    return await this.citiesService.update(id, updateData);
  }

  // DELETE /cities/:id - Eliminar una ciudad
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.citiesService.remove(id);
  }
}
