import {
    Controller, Get, Post, Put, Delete, Param, Body,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) { }

    // Endpoint para obtener todas las compañías
    @Get()
    async getAllCompanies(): Promise<Company[]> {
        return await this.companiesService.findAll();
    }

    // Endpoint para obtener una compañía por ID
    @Get(':id')
    async getCompany(@Param('id') id: number): Promise<Company> {
        return await this.companiesService.findOne(id);
    }

    // Endpoint para crear una nueva compañía
    @Post()
    async createCompany(@Body() companyData: Partial<Company>): Promise<Company> {
        return await this.companiesService.create(companyData);
    }

    // Endpoint para actualizar una compañía
    @Put(':id')
    async updateCompany(
        @Param('id') id: number,
        @Body() updateData: Partial<Company>,
    ): Promise<Company> {
        return await this.companiesService.update(id, updateData);
    }

    // Endpoint para eliminar una compañía
    @Delete(':id')
    async deleteCompany(@Param('id') id: number): Promise<void> {
        return await this.companiesService.remove(id);
    }
}
