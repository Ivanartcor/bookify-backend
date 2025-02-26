import { Test, TestingModule } from '@nestjs/testing';
import { ServiceEmployeesService } from './service-employees.service';

describe('ServiceEmployeesService', () => {
  let service: ServiceEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceEmployeesService],
    }).compile();

    service = module.get<ServiceEmployeesService>(ServiceEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
