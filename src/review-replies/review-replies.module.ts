import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReply } from './review-reply.entity';
import { ReviewRepliesService } from './review-replies.service';
import { ReviewRepliesController } from './review-replies.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ReviewReply])],
  providers: [ReviewRepliesService],
  controllers: [ReviewRepliesController],
  exports: [ReviewRepliesService],
})
export class ReviewRepliesModule {}
