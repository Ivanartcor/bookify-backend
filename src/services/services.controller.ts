import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  async getAll(): Promise<Service[]> {
    return await this.servicesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Service> {
    return await this.servicesService.findOne(id);
  }

  @Post()
  async create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return await this.servicesService.create(serviceData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Service>,
  ): Promise<Service> {
    return await this.servicesService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.servicesService.delete(id);
  }
}
