import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentEmployeesService } from './appointment-employees.service';

describe('AppointmentEmployeesService', () => {
  let service: AppointmentEmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentEmployeesService],
    }).compile();

    service = module.get<AppointmentEmployeesService>(AppointmentEmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
