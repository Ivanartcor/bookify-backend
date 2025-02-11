import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteCompaniesService } from './user-favorite-companies.service';

describe('UserFavoriteCompaniesService', () => {
  let service: UserFavoriteCompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteCompaniesService],
    }).compile();

    service = module.get<UserFavoriteCompaniesService>(UserFavoriteCompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
