import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteCompanies } from './user-favorite-companies.entity';
import { UserFavoriteCompaniesService } from './user-favorite-companies.service';
import { UserFavoriteCompaniesController } from './user-favorite-companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteCompanies])],
  providers: [UserFavoriteCompaniesService],
  controllers: [UserFavoriteCompaniesController],
  exports: [UserFavoriteCompaniesService],
})
export class UserFavoriteCompaniesModule {}
