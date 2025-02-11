import { Test, TestingModule } from '@nestjs/testing';
import { ReviewImagesController } from './review-images.controller';

describe('ReviewImagesController', () => {
  let controller: ReviewImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewImagesController],
    }).compile();

    controller = module.get<ReviewImagesController>(ReviewImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
