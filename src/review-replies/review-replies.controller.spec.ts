import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRepliesController } from './review-replies.controller';

describe('ReviewRepliesController', () => {
  let controller: ReviewRepliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewRepliesController],
    }).compile();

    controller = module.get<ReviewRepliesController>(ReviewRepliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
