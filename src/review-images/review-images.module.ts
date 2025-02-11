import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewImage } from './review-image.entity';
import { ReviewImagesService } from './review-images.service';
import { ReviewImagesController } from './review-images.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ReviewImage])],
  providers: [ReviewImagesService],
  controllers: [ReviewImagesController],
  exports: [ReviewImagesService],
})
export class ReviewImagesModule {}
