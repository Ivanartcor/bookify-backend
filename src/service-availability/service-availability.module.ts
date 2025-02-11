import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAvailability } from './service-availability.entity';
import { ServiceAvailabilityService } from './service-availability.service';
import { ServiceAvailabilityController } from './service-availability.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceAvailability])],
  providers: [ServiceAvailabilityService],
  controllers: [ServiceAvailabilityController],
  exports: [ServiceAvailabilityService],
})
export class ServiceAvailabilityModule {}
