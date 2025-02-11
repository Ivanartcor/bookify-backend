import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteServices } from './user-favorite-services.entity';
import { UserFavoriteServicesService } from './user-favorite-services.service';
import { UserFavoriteServicesController } from './user-favorite-services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteServices])],
  providers: [UserFavoriteServicesService],
  controllers: [UserFavoriteServicesController],
  exports: [UserFavoriteServicesService],
})
export class UserFavoriteServicesModule {}
