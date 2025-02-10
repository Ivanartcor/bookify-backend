import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentEmployeesController } from './appointment-employees.controller';

describe('AppointmentEmployeesController', () => {
  let controller: AppointmentEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentEmployeesController],
    }).compile();

    controller = module.get<AppointmentEmployeesController>(AppointmentEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
