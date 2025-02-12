import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyStatisticsView } from './company-statistics-view.entity';

@Injectable()
export class CompanyStatisticsViewService {
  constructor(
    @InjectRepository(CompanyStatisticsView)
    private companyStatisticsRepository: Repository<CompanyStatisticsView>,
  ) {}

  async findAll(): Promise<CompanyStatisticsView[]> {
    return await this.companyStatisticsRepository.find();
  }

  async findOne(companyId: number): Promise<CompanyStatisticsView> {
    const view = await this.companyStatisticsRepository.findOne({ where: { company_id: companyId } });
    if (!view) {
      throw new NotFoundException(`CompanyStatisticsView with company_id ${companyId} not found`);
    }
    return view;
  }
}
