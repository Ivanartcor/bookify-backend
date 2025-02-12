import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyStatisticsView } from './company-statistics-view.entity';
import { CompanyStatisticsViewService } from './company-statistics-view.service';
import { CompanyStatisticsViewController } from './company-statistics-view.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyStatisticsView])],
  providers: [CompanyStatisticsViewService],
  controllers: [CompanyStatisticsViewController],
  exports: [CompanyStatisticsViewService],
})
export class CompanyStatisticsViewModule {}
