import { Test, TestingModule } from '@nestjs/testing';
import { CompanyStatisticsViewService } from './company-statistics-view.service';

describe('CompanyStatisticsViewService', () => {
  let service: CompanyStatisticsViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyStatisticsViewService],
    }).compile();

    service = module.get<CompanyStatisticsViewService>(CompanyStatisticsViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
