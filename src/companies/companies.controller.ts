import {
    Controller, Get, Post, Put, Delete, Param, Body,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

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


    // Obtener empresas por ID de ciudad**
  @Get('by-city/:cityId')
  async getCompaniesByCity(@Param('cityId') cityId: number): Promise<Company[]> {
    return await this.companiesService.findByCity(cityId);
  }



   /** ✅ Subir o actualizar el logo de la empresa */
   @Put(':id/logo')
   @UseInterceptors(FileInterceptor('file', {
       storage: diskStorage({
           destination: './uploads',
           filename: (req, file, callback) => {
               const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
               const fileExtName = extname(file.originalname);
               callback(null, `logo-${uniqueSuffix}${fileExtName}`);
           },
       }),
   }))
   async uploadLogo(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
       const filePath = `http://localhost:3000/uploads/${file.filename}`;
       return await this.companiesService.update(id, { logo: filePath });
   }

   /** ✅ Subir o actualizar el banner de la empresa */
   @Put(':id/banner')
   @UseInterceptors(FileInterceptor('file', {
       storage: diskStorage({
           destination: './uploads',
           filename: (req, file, callback) => {
               const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
               const fileExtName = extname(file.originalname);
               callback(null, `banner-${uniqueSuffix}${fileExtName}`);
           },
       }),
   }))
   async uploadBanner(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
       const filePath = `http://localhost:3000/uploads/${file.filename}`;
       return await this.companiesService.update(id, { banner_image: filePath });
   }
}
