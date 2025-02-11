import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteServicesController } from './user-favorite-services.controller';

describe('UserFavoriteServicesController', () => {
  let controller: UserFavoriteServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoriteServicesController],
    }).compile();

    controller = module.get<UserFavoriteServicesController>(UserFavoriteServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
