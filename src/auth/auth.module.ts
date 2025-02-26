import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from '../companies/companies.module';  // 👈 Importamos CompaniesModule


@Module({
  imports: [
    UsersModule, // Necesitamos acceder a los usuarios para validar credenciales.
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Usa una variable de entorno para la clave
      signOptions: { expiresIn: '1h' }, // Configura el tiempo de expiración del token
    }),
    CompaniesModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
