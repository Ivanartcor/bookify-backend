import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteServicesService } from './user-favorite-services.service';

describe('UserFavoriteServicesService', () => {
  let service: UserFavoriteServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteServicesService],
    }).compile();

    service = module.get<UserFavoriteServicesService>(UserFavoriteServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
