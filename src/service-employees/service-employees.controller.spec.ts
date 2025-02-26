import { Test, TestingModule } from '@nestjs/testing';
import { ServiceEmployeesController } from './service-employees.controller';

describe('ServiceEmployeesController', () => {
  let controller: ServiceEmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceEmployeesController],
    }).compile();

    controller = module.get<ServiceEmployeesController>(ServiceEmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
