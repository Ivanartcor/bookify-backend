import { Controller, Get, Param } from '@nestjs/common';
import { CompanyStatisticsViewService } from './company-statistics-view.service';
import { CompanyStatisticsView } from './company-statistics-view.entity';

@Controller('company-statistics')
export class CompanyStatisticsViewController {
  constructor(private companyStatisticsViewService: CompanyStatisticsViewService) {}

  // GET /company-statistics
  @Get()
  async getAll(): Promise<CompanyStatisticsView[]> {
    return await this.companyStatisticsViewService.findAll();
  }

  // GET /company-statistics/:id
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CompanyStatisticsView> {
    return await this.companyStatisticsViewService.findOne(id);
  }
}
