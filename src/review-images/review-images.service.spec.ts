import { Test, TestingModule } from '@nestjs/testing';
import { ReviewImagesService } from './review-images.service';

describe('ReviewImagesService', () => {
  let service: ReviewImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewImagesService],
    }).compile();

    service = module.get<ReviewImagesService>(ReviewImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
