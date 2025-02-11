import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRepliesService } from './review-replies.service';

describe('ReviewRepliesService', () => {
  let service: ReviewRepliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewRepliesService],
    }).compile();

    service = module.get<ReviewRepliesService>(ReviewRepliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
