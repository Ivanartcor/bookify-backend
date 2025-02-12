import { Test, TestingModule } from '@nestjs/testing';
import { CompanyStatisticsViewController } from './company-statistics-view.controller';

describe('CompanyStatisticsViewController', () => {
  let controller: CompanyStatisticsViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyStatisticsViewController],
    }).compile();

    controller = module.get<CompanyStatisticsViewController>(CompanyStatisticsViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
