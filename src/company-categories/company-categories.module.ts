import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyCategory } from './company-categories.entity';
import { CompanyCategoriesService } from './company-categories.service';
import { CompanyCategoriesController } from './company-categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyCategory])],
  providers: [CompanyCategoriesService],
  controllers: [CompanyCategoriesController],
  exports: [CompanyCategoriesService],
})
export class CompanyCategoriesModule {}