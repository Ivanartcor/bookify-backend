import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServiceAvailabilityService } from './service-availability.service';
import { ServiceAvailability } from './service-availability.entity';

@Controller('service-availability')
export class ServiceAvailabilityController {
  constructor(private serviceAvailabilityService: ServiceAvailabilityService) {}

  // GET /service-availability: Listar todas las disponibilidades
  @Get()
  async getAll(): Promise<ServiceAvailability[]> {
    return await this.serviceAvailabilityService.findAll();
  }

  // GET /service-availability/:id: Obtener una disponibilidad por ID
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ServiceAvailability> {
    return await this.serviceAvailabilityService.findOne(id);
  }

  // POST /service-availability: Crear una nueva disponibilidad
  @Post()
  async create(@Body() availabilityData: Partial<ServiceAvailability>): Promise<ServiceAvailability> {
    return await this.serviceAvailabilityService.create(availabilityData);
  }

  // PUT /service-availability/:id: Actualizar una disponibilidad existente
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<ServiceAvailability>,
  ): Promise<ServiceAvailability> {
    return await this.serviceAvailabilityService.update(id, updateData);
  }

  // DELETE /service-availability/:id: Eliminar una disponibilidad
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.serviceAvailabilityService.remove(id);
  }

  // GET /service-availability/service/:serviceId → Obtiene solo las disponibilidades del servicio específico
@Get('service/:serviceId')
async getByService(@Param('serviceId') serviceId: number): Promise<ServiceAvailability[]> {
  return await this.serviceAvailabilityService.findByService(serviceId);
}

}
