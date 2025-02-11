import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteCompaniesController } from './user-favorite-companies.controller';

describe('UserFavoriteCompaniesController', () => {
  let controller: UserFavoriteCompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoriteCompaniesController],
    }).compile();

    controller = module.get<UserFavoriteCompaniesController>(UserFavoriteCompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
