import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentEmployeesModule } from './appointment-employees/appointment-employees.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
