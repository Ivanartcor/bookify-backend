import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentEmployeesModule } from './appointment-employees/appointment-employees.module';
import { CategoriesModule } from './categories/categories.module';
import { CompanyCategoriesModule } from './company-categories/company-categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewImagesModule } from './review-images/review-images.module';
import { ReviewRepliesModule } from './review-replies/review-replies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SupportTicketsModule } from './support-tickets/support-tickets.module';
import { TicketAttachmentsModule } from './ticket-attachments/ticket-attachments.module';
import { AddressesModule } from './addresses/addresses.module';
import { CitiesModule } from './cities/cities.module';
import { ServiceAvailabilityModule } from './service-availability/service-availability.module';
import { UserFavoriteCompaniesModule } from './user-favorite-companies/user-favorite-companies.module';
import { UserFavoriteServicesModule } from './user-favorite-services/user-favorite-services.module';
import { CompanyStatisticsViewModule } from './company-statistics-view/company-statistics-view.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en todo el proyecto
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Útil en desarrollo, para sincronizar las entidades con la BD
    }),
    // Aquí importamos los módulos de funcionalidades (por ejemplo, UsersModule, AppointmentsModule, etc.)
    UsersModule,
    CompaniesModule,
    ServicesModule,
    AppointmentsModule,
    AppointmentEmployeesModule,
    CategoriesModule,
    CompanyCategoriesModule,
    ReviewsModule,
    ReviewImagesModule,
    ReviewRepliesModule,
    NotificationsModule,
    SupportTicketsModule,
    TicketAttachmentsModule,
    AddressesModule,
    CitiesModule,
    ServiceAvailabilityModule,
    UserFavoriteCompaniesModule,
    UserFavoriteServicesModule,
    CompanyStatisticsViewModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
